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
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const ManageProduct = () => {
  const navigate = useNavigate()

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ align: [] }],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  }

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'color',
    'background',
    'list',
    'bullet',
    'indent',
    'align',
    'blockquote',
    'code-block',
    'link',
    'image',
    'video',
  ]

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
    description: '',
    productFormulaAdded: '',
    price: '',
    images: [],
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
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(20) // or allow user to select
  const [totalPages, setTotalPages] = useState(1)
  const [isSaving, setIsSaving] = useState(false)

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
        .get(
          `https://www.discountdoorandwindow.com/api/subSubCategories/subcategoryid/${filters.subCategory}`,
        )
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

  // Fetch products for current page from backend
  useEffect(() => {
    setLoading(true)
    axios
      .get(
        `https://www.discountdoorandwindow.com/api/products?page=${currentPage}&limit=${pageSize}`,
      )
      .then((response) => {
        setData(response.data.data)
        setTotalPages(response.data.totalPages)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching products:', error)
        setLoading(false)
      })
  }, [currentPage])

  // Pagination controls
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  useEffect(() => {
    setCurrentPage(1)
  }, [
    filters.category,
    filters.subCategory,
    filters.subSubCategory,
    filters.status,
    filters.search,
  ])
  useEffect(() => {
    setLoading(true)
    axios
      .get('https://www.discountdoorandwindow.com/api/products', {
        params: {
          page: currentPage,
          limit: pageSize,
          category_id: filters.category || '',
          sub_category_id: filters.subCategory || '',
          sub_sub_category_id: filters.subSubCategory || '',
          status: filters.status || '',
          search: filters.search || '',
        },
      })
      .then((response) => {
        setData(response.data.data)
        setTotalPages(response.data.totalPages)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [currentPage, filters, pageSize])

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

  const handleEditProduct = async (product) => {
    try {
      const res = await axios.get(
        `https://www.discountdoorandwindow.com/api/products/getProductsbyid/${product._id}`,
      )

      const freshProduct = res.data || product

      // Normalize images - convert string URLs to objects with 'url' property
      const imagesArr = Array.isArray(freshProduct.images)
        ? freshProduct.images.map((img) => (typeof img === 'string' ? { url: img } : img))
        : []

      setEditProductData({
        _id: freshProduct._id || '',
        name: freshProduct.name || '',
        description: freshProduct.Description || '',
        category_name: freshProduct.category_name || '',
        sub_category_name: freshProduct.sub_category_name || '',
        sub_sub_category_name: freshProduct.sub_sub_category_name || '',
        productFormulaAdded: freshProduct.productFormulaAdded || '',
        status: freshProduct.status || '',
        price: freshProduct.price || '',
        images: imagesArr,
      })
      setShowEditModal(true)
    } catch (error) {
      console.error('Failed to load product details:', error)
      alert('Failed to load product for editing.')
    }
  }

  const handleEditFormChange = (e) => {
    const { name, value } = e.target
    setEditProductData((prev) => ({ ...prev, [name]: value }))
  }

 const handleEditProductSubmit = () => {
  setIsSaving(true)
  const formData = new FormData()
  formData.append('name', editProductData.name)
  formData.append('Description', editProductData.description)
  formData.append('price', editProductData.price)
  formData.append('productFormulaAdded', editProductData.productFormulaAdded)
  formData.append('category_name', editProductData.category_name)
  formData.append('sub_category_name', editProductData.sub_category_name)
  formData.append('sub_sub_category_name', editProductData.sub_sub_category_name)
  formData.append('status', editProductData.status)

  if (editProductData.images && editProductData.images.length > 0) {
    for (let i = 0; i < editProductData.images.length; i++) {
      const img = editProductData.images[i]
      if (img instanceof File) {
        formData.append('images', img)
      }
    }
  }

  axios
    .put(`https://www.discountdoorandwindow.com/api/products/${editProductData._id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(() => {
      alert('Product updated successfully')
      setShowEditModal(false)
      // Refresh products after update with current filters and page
      axios
        .get('https://www.discountdoorandwindow.com/api/products', {
          params: {
            page: currentPage,
            limit: pageSize,
            category_id: filters.category || '',
            sub_category_id: filters.subCategory || '',
            sub_sub_category_id: filters.subSubCategory || '',
            status: filters.status || '',
            search: filters.search || '',
          },
        })
        .then((response) => {
          setData(response.data.data)
          setTotalPages(response.data.totalPages)
        })
        .catch((error) => console.error('Error refetching products:', error))
    })
    .catch((error) => {
      console.error('Error updating product:', error)
      alert('Failed to update product. Please check server error.')
    })
    .finally(() => {
      setIsSaving(false)
    })
}


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

      // Filter out images that are files (not already uploaded)
      newImages.forEach((img) => {
        if (img instanceof File || img.lastModified) {
          formData.append('images', img)
        }
      })

      axios
        .post('https://www.discountdoorandwindow.com/api/ProductImg/product-images', formData)
        .then(() => {
          alert('Images uploaded successfully')
          fetchImages(selectedProductId)
          setNewImages([])
          setShowImagesModal(false)
        })
        .catch((error) => console.error('Error uploading images:', error))
    }
  }
  const fetchImages = (productId) => {
    axios
      .get(`https://www.discountdoorandwindow.com/api/ProductImg/product-images/${productId}`)
      .then((response) => {
        if (response.data.productImages && response.data.productImages.length > 0) {
          const formatted = response.data.productImages.flatMap((doc) =>
            doc.images.map((img) => ({
              url: img.url,
              imageId: img._id,
              docId: doc._id,
            })),
          )

          setNewImages(formatted)
        } else {
          setNewImages([])
        }
      })
      .catch((error) => console.error('Error fetching images:', error))
  }
  const deleteImage = (docId, imageId) => {
    axios
      .delete(
        `https://www.discountdoorandwindow.com/api/ProductImg/product-images/${docId}/image/${imageId}`,
      )
      .then(() => {
        alert('Image deleted successfully')
        fetchImages(selectedProductId)
      })
      .catch((error) => {
        console.error('Error deleting image:', error)
        alert('Failed to delete image.')
      })
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
              <CTable className="table-hover" striped>
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
                        <CTableDataCell>
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
                              style={{ cursor: 'pointer' }}
                              title={`Add ${product.productType} Dimensions`}
                            />
                          ) : // </CButton>
                          null}
                        </CTableDataCell>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            )}
            {/* Add Pagination Buttons Below Table */}
            <div className="d-flex justify-content-center align-items-center mt-3">
              <CButton disabled={currentPage === 1} onClick={handlePrevPage}>
                Previous
              </CButton>
              <span className="mx-3">
                Page {currentPage} of {totalPages}
              </span>
              <CButton disabled={currentPage === totalPages} onClick={handleNextPage}>
                Next
              </CButton>
            </div>
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
              {newImages.length > 0 ? (
                newImages.map((image, index) => (
                  <CListGroupItem
                    key={image.imageId}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <img src={image.url} alt={`Product Image ${index}`} width="50" height="50" />
                    <CButton
                      color="danger"
                      size="sm"
                      onClick={() => deleteImage(image.docId, image.imageId)}
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
          {/* <CButton
          color="danger"
          onClick={() => deleteAllImages(selectedProductId)}
        >
          Delete All Images
        </CButton> */}
          <CButton color="secondary" onClick={() => setShowImagesModal(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleAddImageConfirm}>
            Add Images
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Edit Product Modal */}
      <CModal visible={showEditModal} onClose={() => setShowEditModal(false)} size="lg">
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

            <CFormLabel htmlFor="description">Description</CFormLabel>
            <ReactQuill
              theme="snow"
              value={editProductData.description}
              onChange={(value) => setEditProductData((prev) => ({ ...prev, description: value }))}
              modules={modules}
              formats={formats}
              style={{ height: '300px', marginBottom: '50px' }}
            />

            {/* <CFormLabel htmlFor="category_name">Category</CFormLabel>
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
            /> */}
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
            <label>Product Images</label>
            <input
              type="file"
              name="images"
              multiple
              onChange={(e) =>
                setEditProductData((prev) => ({
                  ...prev,
                  images: Array.from(e.target.files),
                }))
              }
            />
            {/* Safe preview of images */}
            {(editProductData.images || []).length > 0 && (
              <div className="mt-3 d-flex flex-wrap gap-2">
                {(editProductData.images || []).map((img, index) => {
                  const src = img.url
                    ? img.url
                    : img instanceof File
                      ? URL.createObjectURL(img)
                      : ''
                  return (
                    <img
                      key={index}
                      src={src}
                      alt={`Product Image ${index + 1}`}
                      width="50"
                      height="50"
                      style={{ objectFit: 'cover', borderRadius: '4px' }}
                    />
                  )
                })}
              </div>
            )}
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleEditProductSubmit} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}
      
export default ManageProduct
