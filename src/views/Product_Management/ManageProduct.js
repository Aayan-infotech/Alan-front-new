import { useNavigate } from 'react-router-dom';
import { CListGroup, CListGroupItem } from '@coreui/react';// Add this import at the top
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CFormLabel,
  CFormSelect,
  CButton,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faEdit, faTrash, faImage } from '@fortawesome/free-solid-svg-icons'; // Import icons


const ManageProduct = () => {
  const navigate = useNavigate(); // Initialize navigation
  // Function to handle Add Dimensions button
  const handleAddDimensions = (productId) => {
    navigate('/DimensionsProduct', { state: { Product_id: productId } });
  };
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProductData, setEditProductData] = useState({
    _id: '',
    name: '',
    category_name: '',
    sub_category_name: '',
    sub_sub_category_name: '',
    status: '',
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState({});
  const [filters, setFilters] = useState({
    category: '',
    subCategory: '',
    subSubCategory: '',
    status: '',
    search: '',
  });
  const [data, setData] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const [showImagesModal, setShowImagesModal] = useState(false);
  // const [showDimensionsModal, setShowDimensionsModal] = useState(false);
  // const [currentProduct, setCurrentProduct] = useState(null);
  const [newImage, setNewImage] = useState(null);
  // const [newDimensions, setNewDimensions] = useState('');

  // Fetch Categories
  useEffect(() => {
    axios.get('http://44.196.64.110:7878/api/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  // Fetch Subcategories based on selected category
  useEffect(() => {
    if (filters.category) {
      axios.get(`http://44.196.64.110:7878/api/subcategory?category=${filters.category}`)
        .then((response) => {
          setSubCategories(response.data);
        })
        .catch((error) => {
          console.error('Error fetching subcategories:', error);
        });
    }
  }, [filters.category]);

  // Fetch Sub-Subcategories based on selected subcategory
  useEffect(() => {
    if (filters.subCategory) {
      axios.get(`http://44.196.64.110:7878/api/subsubcategory?subcategory=${filters.subCategory}`)
        .then((response) => {
          setSubSubCategories(response.data);
        })
        .catch((error) => {
          console.error('Error fetching sub-subcategories:', error);
        });
    }
  }, [filters.subCategory]);

  // Fetch product data
  useEffect(() => {
    axios.get('http://44.196.64.110:7878/api/products')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Filter products based on selected filters
  const filteredData = data.filter((product) => {
    return (
      (filters.category ? product.category_name === filters.category : true) &&
      (filters.subCategory ? product.sub_category_name === filters.subCategory : true) &&
      (filters.subSubCategory ? product.sub_sub_category_name === filters.subSubCategory : true) &&
      (filters.status ? product.status === filters.status : true) &&
      (filters.search ? product.name.toLowerCase().includes(filters.search.toLowerCase()) : true)
    );
  });

  // imge handle part
  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files) {
      setNewImages([...newImages, ...files]);
    }
  };


  // EDIT 
  const handleEditProduct = (product) => {
    setEditProductData(product);
    setShowEditModal(true);
  };
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditProductData({ ...editProductData, [name]: value });
  };
  const handleEditProductSubmit = () => {
    axios.put(`http://localhost:7878/api/products/${editProductData._id}`, editProductData)

      .then(() => {
        alert('Product updated successfully');
        setShowEditModal(false);
        // Refresh the product list
        axios.get('http://44.196.64.110:7878/api/products').then((response) => setData(response.data));
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };


  const handleDeleteProduct = (productId) => {
    axios.delete(`http://44.196.64.110:7878/api/products/DEL/${productId}`)
      .then(() => {
        alert('Product deleted successfully');
        setData(data.filter(product => product._id !== productId)); // Update the state to remove the deleted product
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };


  // const handleAddImages = (productId) => {
  //   setSelectedProductId(productId); // Store the selected product ID
  //   setShowImagesModal(true); // Show the modal for adding images
  // };
  const handleAddImages = (productId) => {
    setSelectedProductId(productId); // Store the selected product ID
    setShowImagesModal(true); // Show the modal for adding images
    fetchImages(productId); // Fetch images for the selected product
  };


  // Function to upload images
  const handleAddImageConfirm = () => {
    if (newImages.length > 0 && selectedProductId) {
      const formData = new FormData();
      formData.append('Product_id', selectedProductId);
      newImages.forEach((image) => {
        formData.append('images', image);
      });

      axios.post('http://44.196.64.110:7878/api/ProductImg/product-images', formData)
        .then(() => {
          alert('Images uploaded successfully');
          setShowImagesModal(false);
          setNewImages([]);
        })
        .catch((error) => {
          console.error('Error uploading images:', error);
        });
    }
  };

  // Function to fetch images by Product ID
  const fetchImages = (productId) => {
    axios.get(`http://44.196.64.110:7878/api/ProductImg/product-images/${productId}`)
      .then((response) => {
        if (response.data.productImages) {
          // Flatten the images array from the response and update the state
          const images = response.data.productImages.flatMap(item => item.images);
          setNewImages(images); // Update the state with the image URLs
        } else {
          console.error('No product images found');
        }
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      });
  };

  // Function to delete an image
  // const deleteImage = (_id) => {
  //   axios.delete(`http://localhost:7878/api/ProductImg/product-images/${_id}`)
  //         .then(() => {
  //           alert('Image deleted successfully');
  //       // Optionally refetch images to update the list
  //         })
  //         .catch((error) => {
  //           console.error('Error deleting image:', error);
  //         });
  // };

  return (
    <CRow>
      <CCol xs="12" md="8" lg="12">
        <CCard>
          <CCardHeader>
            <h4>Manage Products</h4>
          </CCardHeader>
          <CCardBody>
            {/* Search Filters */}
            <CForm className="mb-4">
              <CRow>
                <CCol xs="12" md="3">
                  <CFormLabel htmlFor="category">Category</CFormLabel>
                  <CFormSelect
                    id="category"
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>

                <CCol xs="12" md="3">
                  <CFormLabel htmlFor="subCategory">Subcategory</CFormLabel>
                  <CFormSelect
                    id="subCategory"
                    name="subCategory"
                    value={filters.subCategory}
                    onChange={handleFilterChange}
                  >
                    <option value="">Select Subcategory</option>
                    {filters.category &&
                      subCategories.map((subCategory) => (
                        <option key={subCategory.id} value={subCategory.name}>
                          {subCategory.name}
                        </option>
                      ))}
                  </CFormSelect>
                </CCol>

                <CCol xs="12" md="3">
                  <CFormLabel htmlFor="subSubCategory">Sub-subcategory</CFormLabel>
                  <CFormSelect
                    id="subSubCategory"
                    name="subSubCategory"
                    value={filters.subSubCategory}
                    onChange={handleFilterChange}
                  >
                    <option value="">Select Sub-subcategory</option>
                    {filters.subCategory &&
                      subSubCategories[filters.subCategory]?.map((subSubCategory) => (
                        <option key={subSubCategory.id} value={subSubCategory.name}>
                          {subSubCategory.name}
                        </option>
                      ))}
                  </CFormSelect>
                </CCol>

                <CCol xs="12" md="2">
                  <CFormLabel htmlFor="status">Status</CFormLabel>
                  <CFormSelect
                    id="status"
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                  >
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Blocked">Blocked</option>
                  </CFormSelect>
                </CCol>

                <CCol xs="12" md="1" className="d-flex align-items-end">
                  <CButton color="primary" onClick={() => setFilters({ category: '', subCategory: '', subSubCategory: '', status: '', search: '' })}>
                    Reset Filters
                  </CButton>
                </CCol>

                <CCol xs="12" md="12">
                  <CInputGroup className="mt-3">
                    <CInputGroupText>Search</CInputGroupText>
                    <CFormInput
                      value={filters.search}
                      onChange={handleFilterChange}
                      name="search"
                      placeholder="Search Product"
                    />
                  </CInputGroup>
                </CCol>
              </CRow>
            </CForm>

            {/* Data Table */}
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Product Name</CTableHeaderCell>
                  <CTableHeaderCell>Category</CTableHeaderCell>
                  <CTableHeaderCell>Subcategory</CTableHeaderCell>
                  <CTableHeaderCell>Sub-subcategory</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {filteredData.map((product) => (
                  <CTableRow key={product._id}>
                    <CTableDataCell>{product.name}</CTableDataCell>
                    <CTableDataCell>{product.category_name}</CTableDataCell>
                    <CTableDataCell>{product.sub_category_name}</CTableDataCell>
                    <CTableDataCell>{product.sub_sub_category_name}</CTableDataCell>
                    <CTableDataCell>{product.status}</CTableDataCell>
                    <CTableDataCell>
                      <CTableDataCell>
                        {/* Edit Button with FontAwesome Icon */}
                        <CButton
                          color="warning"
                          className="mr-2"
                          onClick={() => handleEditProduct(product)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </CButton>

                        {/* Delete Button with FontAwesome Icon */}
                        <CButton
                          color="danger"
                          onClick={() => handleDeleteProduct(product._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </CButton>
                        {/* Add Images Button with FontAwesome Icon */}
                        <CButton
                          color="info"
                          className="mr-2"
                          onClick={() => handleAddImages(product._id)}
                        >
                          <FontAwesomeIcon icon={faImage} />
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="secondary"
                          onClick={() => handleAddDimensions(product._id)}
                        >
                          Add Dimensions
                        </CButton>
                      </CTableDataCell>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      {/* Modal for Add Image */}
      <CModal visible={showImagesModal} onClose={() => setShowImagesModal(false)}>
        <CModalHeader>
          <CModalTitle>Manage Images</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormLabel htmlFor="productImages">Upload Images</CFormLabel>
            <CFormInput
              type="file"
              id="productImages"
              multiple
              onChange={handleImageUpload}
            />
            {/* Display fetched images */}
            <CListGroup className="mt-3">
              {newImages && newImages.length > 0 ? (
                newImages.map((image, index) => (
                  <CListGroupItem key={index} className="d-flex justify-content-between align-items-center">
                    <img src={image} alt={`Product Image ${index}`} width="50" height="50" />
                    <CButton
                      color="danger"
                      size="sm"
                      onClick={() => deleteImage(selectedProductId, image)} // Delete image by URL
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </CButton>
                  </CListGroupItem>
                ))
              ) : (
                <p>No images found for this product.</p>
              )}
            </CListGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowImagesModal(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleAddImageConfirm}>
            Add Images
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Edit  */}
      <CModal visible={showEditModal} onClose={() => setShowEditModal(false)}>
        <CModalHeader>
          <CModalTitle>Edit Product</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormLabel htmlFor="name">Product Name</CFormLabel>
            <CFormInput
              id="name"
              name="name"
              value={editProductData.name}
              onChange={handleEditFormChange}
            />
            <CFormLabel htmlFor="category_name">Category</CFormLabel>
            <CFormInput
              id="category_name"
              name="category_name"
              value={editProductData.category_name}
              onChange={handleEditFormChange}
            />
            <CFormLabel htmlFor="sub_category_name">Subcategory</CFormLabel>
            <CFormInput
              id="sub_category_name"
              name="sub_category_name"
              value={editProductData.sub_category_name}
              onChange={handleEditFormChange}
            />
            <CFormLabel htmlFor="sub_sub_category_name">Sub-subcategory</CFormLabel>
            <CFormInput
              id="sub_sub_category_name"
              name="sub_sub_category_name"
              value={editProductData.sub_sub_category_name}
              onChange={handleEditFormChange}
            />
            <CFormLabel htmlFor="status">Status</CFormLabel>
            <CFormSelect
              id="status"
              name="status"
              value={editProductData.status}
              onChange={handleEditFormChange}
            >
              <option value="Active">Active</option>
              <option value="Blocked">Blocked</option>
            </CFormSelect>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleEditProductSubmit}>
            Save Changes
          </CButton>
        </CModalFooter>
      </CModal>

    </CRow>
  );
};

export default ManageProduct;
