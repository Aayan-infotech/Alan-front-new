// import { useNavigate } from 'react-router-dom';
// import { CListGroup, CListGroupItem } from '@coreui/react';// Add this import at the top
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   CRow,
//   CCol,
//   CCard,
//   CCardHeader,
//   CCardBody,
//   CForm,
//   CFormLabel,
//   CFormSelect,
//   CButton,
//   CInputGroup,
//   CInputGroupText,
//   CFormInput,
//   CTable,
//   CTableHead,
//   CTableBody,
//   CTableRow,
//   CTableHeaderCell,
//   CTableDataCell,
//   CModal,
//   CModalHeader,
//   CModalTitle,
//   CModalBody,
//   CModalFooter
// } from '@coreui/react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrash, faImage, faObjectGroup } from '@fortawesome/free-solid-svg-icons'; // Import icons

// const ManageProduct = () => {
//   const navigate = useNavigate(); // Initialize navigation
//   // Function to handle Add Dimensions button
//   // const handleAddDimensions = (productId) => {
//   //   navigate('/DimensionsProduct', { state: { Product_id: productId } });
//   // };
//   const handleAddDimensions = (productId, categoryName) => {
//     if (categoryName === 'Windows') {
//       navigate('/DimensionsProduct', { state: { Product_id: productId } });
//     } else if (categoryName === 'Doors') {
//       // navigate(`/DimensionsProductDoors/${productId}/${categoryName}`);
//       navigate('/DimensionsProductDoors', { state: { productIdfordet: productId } });
//     }
//   };

//   const [selectedProductId, setSelectedProductId] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editProductData, setEditProductData] = useState({
//     _id: '',
//     name: '',
//     category_name: '',
//     sub_category_name: '',
//     sub_sub_category_name: '',
//     status: '',
//   });

//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [subSubCategories, setSubSubCategories] = useState({});
//   const [filters, setFilters] = useState({
//     category: '',
//     subCategory: '',
//     subSubCategory: '',
//     status: '',
//     search: '',
//   });
//   const [data, setData] = useState([]);
//   const [newImages, setNewImages] = useState([]);
//   const [showImagesModal, setShowImagesModal] = useState(false);
//   const [newImage, setNewImage] = useState(null);

//   // Fetch Categories
//   useEffect(() => {
//     axios.get('https://www.discountdoorandwindow.com/api/categories')
//       .then((response) => {
//         setCategories(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching categories:', error);
//       });
//   }, []);

//   // Fetch Subcategories based on selected category
//   useEffect(() => {
//     if (filters.category) {
//       axios.get(`https://www.discountdoorandwindow.com/api/subcategory?category=${filters.category}`)
//         .then((response) => {
//           setSubCategories(response.data);
//         })
//         .catch((error) => {
//           console.error('Error fetching subcategories:', error);
//         });
//     }
//   }, [filters.category]);

//   useEffect(() => {
//     if (filters.subCategory) {
//       axios.get(`https://www.discountdoorandwindow.com/api/subsubcategory?subcategory=${filters.subCategory}`)
//         .then((response) => {
//           setSubSubCategories(response.data);
//         })
//         .catch((error) => {
//           console.error('Error fetching sub-subcategories:', error);
//         });
//     }
//   }, [filters.subCategory]);

//   // Fetch product data
//   useEffect(() => {
//     axios.get('https://www.discountdoorandwindow.com/api/products')
//       .then((response) => {
//         setData(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching products:', error);
//       });
//   }, []);

//   // Handle filter change
//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters({ ...filters, [name]: value });
//   };

//   // Filter products based on selected filters
//   const filteredData = data.filter((product) => {
//     return (
//       (filters.category ? product.category_name === filters.category : true) &&
//       (filters.subCategory ? product.sub_category_name === filters.subCategory : true) &&
//       (filters.subSubCategory ? product.sub_sub_category_name === filters.subSubCategory : true) &&
//       (filters.status ? product.status === filters.status : true) &&
//       (filters.search ? product.name.toLowerCase().includes(filters.search.toLowerCase()) : true)
//     );
//   });

//   // imge handle part
//   const handleImageUpload = (e) => {
//     const files = e.target.files;
//     if (files) {
//       setNewImages([...newImages, ...files]);
//     }
//   };
//   // EDIT
//   const handleEditProduct = (product) => {
//     // setEditProductData(product);
//     setEditProductData({
//       _id: product._id || '',
//       name: product.name || '',
//       category_name: product.category_name || '',
//       sub_category_name: product.sub_category_name || '',
//       sub_sub_category_name: product.sub_sub_category_name || '',
//       productFormulaAdded: product.productFormulaAdded || '',
//       status: product.status || '',
//     });
//     setShowEditModal(true);
//   };
//   const handleEditFormChange = (e) => {
//     const { name, value } = e.target;
//     setEditProductData({ ...editProductData, [name]: value });
//   };
//   const handleEditProductSubmit = () => {
//     axios.put(`https://www.discountdoorandwindow.com/api/products/${editProductData._id}`, editProductData)

//       .then(() => {
//         alert('Product updated successfully');
//         setShowEditModal(false);
//         axios.get('https://www.discountdoorandwindow.com/api/products').then((response) => setData(response.data));
//       })
//       .catch((error) => {
//         console.error('Error updating product:', error);
//       });
//   };
//   const handleDeleteProduct = (productId) => {
//     axios.delete(`https://www.discountdoorandwindow.com/api/products/DEL/${productId}`)
//       .then(() => {
//         alert('Product deleted successfully');
//         setData(data.filter(product => product._id !== productId)); // Update the state to remove the deleted product
//       })
//       .catch((error) => {
//         console.error('Error deleting product:', error);
//       });
//   };
//   const handleAddImages = (productId) => {
//     setSelectedProductId(productId); // Store the selected product ID
//     setShowImagesModal(true); // Show the modal for adding images
//     fetchImages(productId); // Fetch images for the selected product
//   };
//   // Function to upload images
//   const handleAddImageConfirm = () => {
//     if (newImages.length > 0 && selectedProductId) {
//       const formData = new FormData();
//       formData.append('Product_id', selectedProductId);
//       newImages.forEach((image) => {
//         formData.append('images', image);
//       });

//       axios.post('https://www.discountdoorandwindow.com/api/ProductImg/product-images', formData)
//         .then(() => {
//           alert('Images uploaded successfully');
//           setShowImagesModal(false);
//           setNewImages([]);
//         })
//         .catch((error) => {
//           console.error('Error uploading images:', error);
//         });
//     }
//   };

//   // Function to fetch images by Product ID
//   const fetchImages = (productId) => {
//     axios.get(`https://www.discountdoorandwindow.com/api/ProductImg/product-images/${productId}`)
//       .then((response) => {
//         if (response.data.productImages) {
//           // Flatten the images array from the response and update the state
//           const images = response.data.productImages.flatMap(item => item.images);
//           setNewImages(images); // Update the state with the image URLs
//         } else {
//           console.error('No product images found');
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching images:', error);
//       });
//   };

//   return (
//     <CRow>
//       <CCol xs="12" md="8" lg="12">
//         <CCard>
//           <CCardHeader>
//             <h4>Manage Products</h4>
//           </CCardHeader>
//           <CCardBody>
//             {/* Search Filters */}
//             <CForm className="mb-4">
//               <CRow>
//                 <CCol xs="12" md="3">
//                   <CFormLabel htmlFor="category">Category</CFormLabel>
//                   <CFormSelect
//                     id="category"
//                     name="category"
//                     value={filters.category}
//                     onChange={handleFilterChange}
//                   >
//                     <option value="">Select Category</option>
//                     {categories.map((category) => (
//                       <option key={category.id} value={category.name}>
//                         {category.name}
//                       </option>
//                     ))}
//                   </CFormSelect>
//                 </CCol>

//                 <CCol xs="12" md="3">
//                   <CFormLabel htmlFor="subCategory">Subcategory</CFormLabel>
//                   <CFormSelect
//                     id="subCategory"
//                     name="subCategory"
//                     value={filters.subCategory}
//                     onChange={handleFilterChange}
//                   >
//                     <option value="">Select Subcategory</option>
//                     {filters.category &&
//                       subCategories.map((subCategory) => (
//                         <option key={subCategory.id} value={subCategory.name}>
//                           {subCategory.name}
//                         </option>
//                       ))}
//                   </CFormSelect>
//                 </CCol>

//                 <CCol xs="12" md="3">
//                   <CFormLabel htmlFor="subSubCategory">Sub-subcategory</CFormLabel>
//                   <CFormSelect
//                     id="subSubCategory"
//                     name="subSubCategory"
//                     value={filters.subSubCategory}
//                     onChange={handleFilterChange}
//                   >
//                     <option value="">Select Sub-subcategory</option>
//                     {filters.subCategory &&
//                       subSubCategories[filters.subCategory]?.map((subSubCategory) => (
//                         <option key={subSubCategory.id} value={subSubCategory.name}>
//                           {subSubCategory.name}
//                         </option>
//                       ))}
//                   </CFormSelect>
//                 </CCol>

//                 <CCol xs="12" md="2">
//                   <CFormLabel htmlFor="status">Status</CFormLabel>
//                   <CFormSelect
//                     id="status"
//                     name="status"
//                     value={filters.status}
//                     onChange={handleFilterChange}
//                   >
//                     <option value="">Select Status</option>
//                     <option value="Active">Active</option>
//                     <option value="Blocked">Blocked</option>
//                   </CFormSelect>
//                 </CCol>

//                 <CCol xs="12" md="1" className="d-flex align-items-end">
//                   <CButton color="primary" onClick={() => setFilters({ category: '', subCategory: '', subSubCategory: '', status: '', search: '' })}>
//                     Reset Filters
//                   </CButton>
//                 </CCol>

//                 <CCol xs="12" md="12">
//                   <CInputGroup className="mt-3">
//                     <CInputGroupText>Search</CInputGroupText>
//                     <CFormInput
//                       value={filters.search}
//                       onChange={handleFilterChange}
//                       name="search"
//                       placeholder="Search Product"
//                     />
//                   </CInputGroup>
//                 </CCol>
//               </CRow>
//             </CForm>

//             {/* Data Table */}
//             <CTable striped>
//               <CTableHead>
//                 <CTableRow>
//                   <CTableHeaderCell>Product Name</CTableHeaderCell>
//                   <CTableHeaderCell>Category</CTableHeaderCell>
//                   <CTableHeaderCell>Subcategory</CTableHeaderCell>
//                   <CTableHeaderCell>Sub-subcategory</CTableHeaderCell>
//                   <CTableHeaderCell>Status</CTableHeaderCell>
//                   <CTableHeaderCell>Actions</CTableHeaderCell>
//                 </CTableRow>
//               </CTableHead>
//               <CTableBody>
//                 {filteredData.map((product) => (
//                   <CTableRow key={product._id}>
//                     <CTableDataCell>{product.name}</CTableDataCell>
//                     <CTableDataCell>{product.category_name}</CTableDataCell>
//                     <CTableDataCell>{product.sub_category_name}</CTableDataCell>
//                     <CTableDataCell>{product.sub_sub_category_name}</CTableDataCell>
//                     <CTableDataCell>{product.status}</CTableDataCell>
//                     <CTableDataCell>
//                       <CTableDataCell>
//                         <span
//                           className="icon-clickable"
//                           onClick={() => handleEditProduct(product)}
//                           style={{ cursor: 'pointer', color: 'orange', marginRight: '8px' }}
//                           title="Edit"
//                         >
//                           <FontAwesomeIcon icon={faEdit} />
//                         </span>
//                         <FontAwesomeIcon
//                           icon={faTrash}
//                           color="red"
//                           onClick={() => handleDeleteProduct(product._id)}
//                           style={{ cursor: 'pointer', marginRight: '8px' }}
//                           title="Delete"
//                         />
//                         <FontAwesomeIcon
//                           icon={faImage}
//                           color="blue"
//                           onClick={() => handleAddImages(product._id)}
//                           style={{ cursor: 'pointer', marginRight: '8px' }}
//                           title="Add Images"
//                         />
//                       </CTableDataCell>
//                       {/* <CTableDataCell>
//                         <FontAwesomeIcon
//                           icon={faObjectGroup}
//                           color="blue"
//                           onClick={() => handleAddDimensions(product._id)}
//                           style={{ cursor: 'pointer' }}
//                           title="Add Dimensions"
//                         />
//                       </CTableDataCell> */}
//                       <CTableDataCell>
//                         <FontAwesomeIcon
//                           icon={faObjectGroup}
//                           color="blue"
//                           onClick={() => handleAddDimensions(product._id, product.category_name)}
//                           style={{ cursor: 'pointer' }}
//                           title="Add Dimensions"
//                         />
//                       </CTableDataCell>
//                     </CTableDataCell>
//                   </CTableRow>
//                 ))}
//               </CTableBody>
//             </CTable>
//           </CCardBody>
//         </CCard>
//       </CCol>

//       {/* Modal for Add Image */}
//       <CModal visible={showImagesModal} onClose={() => setShowImagesModal(false)}>
//         <CModalHeader>
//           <CModalTitle>Manage Images</CModalTitle>
//         </CModalHeader>
//         <CModalBody>
//           <CForm>
//             <CFormLabel htmlFor="productImages">Upload Images</CFormLabel>
//             <CFormInput
//               type="file"
//               id="productImages"
//               multiple
//               onChange={handleImageUpload}
//             />
//             {/* Display fetched images */}
//             <CListGroup className="mt-3">
//               {newImages && newImages.length > 0 ? (
//                 newImages.map((image, index) => (
//                   <CListGroupItem key={index} className="d-flex justify-content-between align-items-center">
//                     <img src={image} alt={`Product Image ${index}`} width="50" height="50" />
//                     <CButton
//                       color="danger"
//                       size="sm"
//                       onClick={() => deleteImage(selectedProductId, image)} // Delete image by URL
//                     >
//                       <FontAwesomeIcon icon={faTrash} />
//                     </CButton>
//                   </CListGroupItem>
//                 ))
//               ) : (
//                 <p>No images found for this product.</p>
//               )}
//             </CListGroup>
//           </CForm>
//         </CModalBody>
//         <CModalFooter>
//           <CButton color="secondary" onClick={() => setShowImagesModal(false)}>
//             Close
//           </CButton>
//           <CButton color="primary" onClick={handleAddImageConfirm}>
//             Add Images
//           </CButton>
//         </CModalFooter>
//       </CModal>

//       {/* Edit  */}
//       <CModal visible={showEditModal} onClose={() => setShowEditModal(false)}>
//         <CModalHeader>
//           <CModalTitle>Edit Product</CModalTitle>
//         </CModalHeader>
//         <CModalBody>
//           <CForm>
//             <CFormLabel htmlFor="name">Product Name</CFormLabel>
//             <CFormInput
//               id="name"
//               name="name"
//               value={editProductData.name}
//               onChange={handleEditFormChange}
//             />
//             <CFormLabel htmlFor="category_name">Category</CFormLabel>
//             <CFormInput
//               id="category_name"
//               name="category_name"
//               value={editProductData.category_name || ''}
//               onChange={handleEditFormChange}
//             />
//             <CFormLabel htmlFor="sub_category_name">Subcategory</CFormLabel>
//             <CFormInput
//               id="sub_category_name"
//               name="sub_category_name"
//               value={editProductData.sub_category_name || ''}
//               onChange={handleEditFormChange}
//             />
//             <CFormLabel htmlFor="sub_sub_category_name">Sub-subcategory</CFormLabel>
//             <CFormInput
//               id="sub_sub_category_name"
//               name="sub_sub_category_name"
//               value={editProductData.sub_sub_category_name || ''}
//               onChange={handleEditFormChange}
//             />
//             <CFormLabel htmlFor="productFormulaAdded">Product Formula Added</CFormLabel>
//             <CFormSelect
//               id="productFormulaAdded"
//               name="productFormulaAdded"
//               value={editProductData.productFormulaAdded}
//               onChange={handleEditFormChange}
//             >
//               <option value="Yes">Yes</option>
//               <option value="No">No</option>

//             </CFormSelect>
//             <CFormLabel htmlFor="status">Status</CFormLabel>
//             <CFormSelect
//               id="status"
//               name="status"
//               value={editProductData.status}
//               onChange={handleEditFormChange}
//             >
//               <option value="Active">Active</option>
//               <option value="Blocked">Blocked</option>
//             </CFormSelect>
//           </CForm>
//         </CModalBody>
//         <CModalFooter>
//           <CButton color="secondary" onClick={() => setShowEditModal(false)}>
//             Close
//           </CButton>
//           <CButton color="primary" onClick={handleEditProductSubmit}>
//             Save Changes
//           </CButton>
//         </CModalFooter>
//       </CModal>

//     </CRow>
//   );
// };

// export default ManageProduct;

import { useNavigate } from 'react-router-dom'
import { CListGroup, CListGroupItem, CSpinner } from '@coreui/react'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
  CModalFooter,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faImage, faObjectGroup } from '@fortawesome/free-solid-svg-icons'

const ManageProduct = () => {
  const navigate = useNavigate()

  // Handle "Add Dimensions" based on category name.
  // const handleAddDimensions = (productId, categoryName) => {
  //   if (categoryName === 'Windows') {
  //     navigate('/DimensionsProduct', { state: { Product_id: productId } });
  //   } else if (categoryName === 'Doors') {
  //     navigate('/DimensionsProductDoors', { state: { productIdfordet: productId } });
  //   }
  // };
  const handleAddDimensionsProduct = (productId) => {
    navigate('/DimensionsProduct', { state: { Product_id: productId } })
  }

  const handleAddDimensionsProductDoors = (productId) => {
    navigate('/DimensionsProductDoors', { state: { productIdfordet: productId } })
  }

  const [selectedProductId, setSelectedProductId] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editProductData, setEditProductData] = useState({
    _id: '',
    name: '',
    category_name: '',
    sub_category_name: '',
    sub_sub_category_name: '',
    status: '',
  })

  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [subSubCategories, setSubSubCategories] = useState([])
  // Use IDs as filter values
  const [filters, setFilters] = useState({
    category: '',
    subCategory: '',
    subSubCategory: '',
    status: '',
    search: '',
  })
  const [data, setData] = useState([])
  const [newImages, setNewImages] = useState([])
  const [showImagesModal, setShowImagesModal] = useState(false)
  const [newImage, setNewImage] = useState(null)
  const [loading, setLoading] = useState(false)

  // Fetch Categories on mount
  useEffect(() => {
    axios
      .get('https://www.discountdoorandwindow.com/api/categories')
      .then((response) => setCategories(response.data))
      .catch((error) => console.error('Error fetching categories:', error))
  }, [])

  useEffect(() => {
    if (filters.category) {
      axios
        .get(`https://www.discountdoorandwindow.com/api/subcategory/categoryid/${filters.category}`)
        .then((response) => {
          setSubCategories(
            response.data.data || (Array.isArray(response.data) ? response.data : []),
          )
        })
        .catch((error) => console.error('Error fetching subcategories:', error))
    } else {
      setSubCategories([])
    }

    setFilters((prev) => ({ ...prev, subCategory: '', subSubCategory: '' }))
    setSubSubCategories([])
  }, [filters.category])

  useEffect(() => {
    if (filters.subCategory) {
      axios
        .get(`https://www.discountdoorandwindow.com/api/subSubCategories/subcategoryid/${filters.subCategory}`)
        .then((response) => {
          setSubSubCategories(
            response.data.data || (Array.isArray(response.data) ? response.data : []),
          )
        })
        .catch((error) => console.error('Error fetching subsubcategories:', error))
    } else {
      setSubSubCategories([])
    }
    setFilters((prev) => ({ ...prev, subSubCategory: '' }))
  }, [filters.subCategory])

  useEffect(() => {
    setLoading(true)
    axios
      .get('https://www.discountdoorandwindow.com/api/products')
      .then((response) => {
        setData(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching products:', error)
        setLoading(false)
      })
  }, [])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const selectedCategoryName = filters.category
    ? categories.find((c) => c._id === filters.category)?.name
    : ''
  const selectedSubCategoryName = filters.subCategory
    ? subCategories.find((sc) => sc._id === filters.subCategory)?.name
    : ''
  const selectedSubSubCategoryName = filters.subSubCategory
    ? subSubCategories.find((ssc) => ssc._id === filters.subSubCategory)?.name
    : ''

  const filteredData = data.filter((product) => {
    const matchCategory = filters.category ? product.category_name === selectedCategoryName : true
    const matchSubCategory = filters.subCategory
      ? product.sub_category_name === selectedSubCategoryName
      : true
    const matchSubSubCategory = filters.subSubCategory
      ? product.sub_sub_category_name === selectedSubSubCategoryName
      : true
    const matchStatus = filters.status ? product.status === filters.status : true
    const matchSearch = filters.search
      ? product.name.toLowerCase().includes(filters.search.toLowerCase())
      : true
    return matchCategory && matchSubCategory && matchSubSubCategory && matchStatus && matchSearch
  })

  const handleImageUpload = (e) => {
    const files = e.target.files
    if (files) {
      setNewImages([...newImages, ...files])
    }
  }

  const handleEditProduct = (product) => {
    setEditProductData({
      _id: product._id || '',
      name: product.name || '',
      category_name: product.category_name || '',
      sub_category_name: product.sub_category_name || '',
      sub_sub_category_name: product.sub_sub_category_name || '',
      productFormulaAdded: product.productFormulaAdded || '',
      status: product.status || '',
      price: product.price || '',
    })
    setShowEditModal(true)
  }

  const handleEditFormChange = (e) => {
    const { name, value } = e.target
    setEditProductData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEditProductSubmit = () => {
    axios
      .put(`https://www.discountdoorandwindow.com/api/products/${editProductData._id}`, editProductData)
      .then(() => {
        alert('Product updated successfully')
        setShowEditModal(false)
        axios
          .get('https://www.discountdoorandwindow.com/api/products')
          .then((response) => setData(response.data))
          .catch((error) => console.error('Error refetching products:', error))
      })
      .catch((error) => console.error('Error updating product:', error))
  }

  // const handleDeleteProduct = (productId) => {
  //   axios
  //     .delete(`https://www.discountdoorandwindow.com/api/products/DEL/${productId}`)
  //     .then(() => {
  //       alert('Product deleted successfully')
  //       setData((prev) => prev.filter((product) => product._id !== productId))
  //     })
  //     .catch((error) => console.error('Error deleting product:', error))
  // }
  const handleDeleteProduct = (productId) => {
    axios
      .delete(`https://www.discountdoorandwindow.com/api/products/DEL/${productId}`)
      .then(() => {
        alert('Product deleted successfully')
        setData((prev) => prev.filter((product) => product._id !== productId))
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          // Show popup if the product cannot be deleted
          alert(error.response.data.message)
        } else if (error.response && error.response.status === 404) {
          alert('Product not found')
        } else {
          alert('Error deleting product. Please try again.')
        }
        console.error('Error deleting product:', error)
      })
  }

  const handleAddImages = (productId) => {
    setSelectedProductId(productId)
    setShowImagesModal(true)
    fetchImages(productId)
  }

  const handleAddImageConfirm = () => {
    if (newImages.length > 0 && selectedProductId) {
      const formData = new FormData()
      formData.append('Product_id', selectedProductId)
      newImages.forEach((image) => formData.append('images', image))

      axios
        .post('https://www.discountdoorandwindow.com/api/ProductImg/product-images', formData)
        .then(() => {
          alert('Images uploaded successfully')
          setShowImagesModal(false)
          setNewImages([])
        })
        .catch((error) => console.error('Error uploading images:', error))
    }
  }

  const fetchImages = (productId) => {
    axios
      .get(`https://www.discountdoorandwindow.com/api/ProductImg/product-images/${productId}`)
      .then((response) => {
        if (response.data.productImages) {
          const images = response.data.productImages.flatMap((item) => item.images)
          setNewImages(images)
        } else {
          console.error('No product images found')
        }
      })
      .catch((error) => console.error('Error fetching images:', error))
  }

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
                      <option key={category._id} value={category._id}>
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
                        <option key={subCategory._id} value={subCategory._id}>
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
                      subSubCategories.map((subSubCategory) => (
                        <option key={subSubCategory._id} value={subSubCategory._id}>
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
                  <CButton
                    color="primary"
                    onClick={() =>
                      setFilters({
                        category: '',
                        subCategory: '',
                        subSubCategory: '',
                        status: '',
                        search: '',
                      })
                    }
                  >
                    Reset
                  </CButton>
                </CCol>
                <CCol xs="12" md="12">
                  <CInputGroup className="mt-3">
                    <CInputGroupText>Search</CInputGroupText>
                    <CFormInput
                      name="search"
                      value={filters.search}
                      onChange={handleFilterChange}
                      placeholder="Search Product"
                    />
                  </CInputGroup>
                </CCol>
              </CRow>
            </CForm>
            {loading ? (
              <CRow className="justify-content-center">
                <CSpinner color="primary" />
              </CRow>
            ) : (
              <CTable className='table-hover' striped>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Product Name</CTableHeaderCell>
                    <CTableHeaderCell>Category</CTableHeaderCell>
                    <CTableHeaderCell>Subcategory</CTableHeaderCell>
                    <CTableHeaderCell>Sub-subcategory</CTableHeaderCell>
                    {/* <CTableHeaderCell>Status</CTableHeaderCell> */}
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
                      {/* <CTableDataCell>{product.status}</CTableDataCell> */}
                      <CTableDataCell className="d-flex flex-row gap-2">
                        <CTableDataCell className="d-flex flex-row align-items-center">
                          <FontAwesomeIcon
                            icon={faEdit}
                            onClick={() => handleEditProduct(product)}
                            style={{ cursor: 'pointer', color: 'orange', marginRight: '8px' }}
                            title="Edit"
                          />

                          <FontAwesomeIcon
                            icon={faTrash}
                            color="red"
                            onClick={() => handleDeleteProduct(product._id)}
                            style={{ cursor: 'pointer', marginRight: '8px' }}
                            title="Delete"
                          />
                          <FontAwesomeIcon
                            icon={faImage}
                            color="blue"
                            onClick={() => handleAddImages(product._id)}
                            style={{ cursor: 'pointer', marginRight: '8px' }}
                            title="Add Images"
                          />
                        </CTableDataCell>
                        {/* <CTableDataCell>
                          <FontAwesomeIcon
                            icon={faObjectGroup}
                            color="blue"
                            onClick={() => handleAddDimensions(product._id, product.category_name)}
                            style={{ cursor: 'pointer' }}
                            title="Add Dimensions"
                          />
                        </CTableDataCell> */}

                        <CTableDataCell>
                          {/* <CButton
                            color="info"
                            onClick={() => handleAddDimensionsProduct(product._id)}
                            className="px-2 text-light"
                            title="Add Window Dimensions"
                          >
                            Dimensions Windows
                          </CButton>
                          <CButton
                            color="success"
                            onClick={() => handleAddDimensionsProductDoors(product._id)}
                            className="px-2 text-light"
                            title="Add Door Dimensions"
                          >
                            Dimensions Doors
                          </CButton> */}
                          {product.productType === 'Doors' || product.productType === 'Windows' ? (
                            // <CButton color="info">
                              <FontAwesomeIcon
                                icon={faObjectGroup}
                                onClick={() =>
                                  product.productType === 'Doors'
                                    ? handleAddDimensionsProductDoors(product._id)
                                    : handleAddDimensionsProduct(product._id)
                                }
                                className="text-info"
                                style={{cursor:"pointer"}}
                                title={`Add ${product.productType} Dimensions`}
                              />
                            // </CButton>
                          ) : null}
                        </CTableDataCell>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            )}
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
            <CFormInput type="file" id="productImages" multiple onChange={handleImageUpload} />
            <CListGroup className="mt-3">
              {newImages && newImages.length > 0 ? (
                newImages.map((image, index) => (
                  <CListGroupItem
                    key={index}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <img src={image} alt={`Product Image ${index}`} width="50" height="50" />
                    <CButton
                      color="danger"
                      size="sm"
                      onClick={() => deleteImage(selectedProductId, image)}
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

      {/* Edit Product Modal */}
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
              value={editProductData.category_name || ''}
              onChange={handleEditFormChange}
            />
            <CFormLabel htmlFor="sub_category_name">Subcategory</CFormLabel>
            <CFormInput
              id="sub_category_name"
              name="sub_category_name"
              value={editProductData.sub_category_name || ''}
              onChange={handleEditFormChange}
            />
            <CFormLabel htmlFor="sub_sub_category_name">Sub-subcategory</CFormLabel>
            <CFormInput
              id="sub_sub_category_name"
              name="sub_sub_category_name"
              value={editProductData.sub_sub_category_name || ''}
              onChange={handleEditFormChange}
            />
            <CFormLabel htmlFor="productFormulaAdded">Product Formula Added</CFormLabel>
            <CFormSelect
              id="productFormulaAdded"
              name="productFormulaAdded"
              value={editProductData.productFormulaAdded}
              onChange={handleEditFormChange}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </CFormSelect>
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
            <CFormLabel htmlFor="price">Price</CFormLabel>
            <CFormInput
              id="price"
              name="price"
              value={editProductData.price}
              onChange={handleEditFormChange}
            />
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
  )
}

export default ManageProduct
