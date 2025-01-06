import { useNavigate } from 'react-router-dom'; // Add this import at the top
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
                          onClick={() => alert(`Edit product: ${product.name}`)}
                        >
                          <FontAwesomeIcon icon={faEdit} /> {/* FontAwesome Edit Icon */}
                        </CButton>

                        {/* Delete Button with FontAwesome Icon */}
                        <CButton
                          color="danger"
                          onClick={() => alert(`Delete product: ${product.name}`)}
                        >
                          <FontAwesomeIcon icon={faTrash} /> {/* FontAwesome Trash Icon */}
                        </CButton>

                        {/* Add Images Button with FontAwesome Icon */}
                        <CButton
                          color="info"
                          className="mr-2"
                          onClick={() => handleAddImages(product._id)}
                        >
                          <FontAwesomeIcon icon={faImage} /> {/* FontAwesome Image Icon */}
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
          <CModalTitle>Add Image</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormLabel htmlFor="productImage">Upload Image</CFormLabel>
            <CFormInput type="file" id="productImage" onChange={e => setNewImage(e.target.files[0])} />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowImagesModal(false)}>Close</CButton>
          <CButton color="primary" onClick={() => { alert('Image added'); setShowImagesModal(false); }}>Add Image</CButton>
        </CModalFooter>
      </CModal>

      {/* Modal for Add Dimensions */}
      {/* <CModal visible={showDimensionsModal} onClose={() => setShowDimensionsModal(false)}>
        <CModalHeader>
          <CModalTitle>Add Dimensions</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormLabel htmlFor="productDimensions">Enter Dimensions</CFormLabel>
            <CFormInput
              id="productDimensions"
              type="text"
              value={newDimensions}
              onChange={(e) => setNewDimensions(e.target.value)}
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowDimensionsModal(false)}>Close</CButton>
          <CButton color="primary" onClick={() => { alert('Dimensions added'); setShowDimensionsModal(false); }}>Add Dimensions</CButton>
        </CModalFooter>
      </CModal> */}
    </CRow>
  );
};

export default ManageProduct;
