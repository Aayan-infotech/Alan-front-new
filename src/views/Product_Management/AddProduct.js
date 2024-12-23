import React, { useState, useEffect } from 'react';
import { CCard, CCardHeader, CCardBody, CForm, CFormLabel, CFormSelect, CFormInput, CButton, CRow, CCol } from '@coreui/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../Categories_Management/CategoriesManagement.css';


const AddProductForm = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [productData, setProductData] = useState({
    category: '',
    subCategory: '',
    subSubCategory: '',
    productName: '',
    productDescription: '',
  });

  // Fetch data for categories, subcategories, and subsubcategories
  useEffect(() => {
    // Fetch categories
    fetch('http://localhost:7878/api/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
    
    // Fetch subcategories 
    fetch('http://localhost:7878/api/subcategory')
      .then((response) => response.json())
      .then((data) => setSubCategories(data))
      .catch((error) => console.error('Error fetching subcategories:', error));

    // Fetch subsubcategories 
    fetch('http://localhost:7878/api/subSubCategories')
      .then((response) => response.json())
      .then((data) => setSubSubCategories(data))
      .catch((error) => console.error('Error fetching subsubcategories:', error));
  }, []);

  // Handle category change
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setProductData({ ...productData, category: selectedCategory, subCategory: '', subSubCategory: '' });

    // Fetch subcategories based on selected category
    fetch(`http://localhost:7878/api/subcategory?category=${selectedCategory}`)
      .then((response) => response.json())
      .then((data) => setSubCategories(data))
      .catch((error) => console.error('Error fetching subcategories for category:', error));
  };

  // Handle subcategory change
  const handleSubCategoryChange = (e) => {
    const selectedSubCategory = e.target.value;
    setProductData({ ...productData, subCategory: selectedSubCategory, subSubCategory: '' });

    // Fetch subsubcategories based on selected subcategory
    fetch(`http://localhost:7878/api/subSubCategories?subcategory=${selectedSubCategory}`)
      .then((response) => response.json())
      .then((data) => setSubSubCategories(data))
      .catch((error) => console.error('Error fetching subsubcategories for subcategory:', error));
  };

  // Handle change in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  // Handle description change (for ReactQuill)
  const handleDescriptionChange = (value) => {
    setProductData({ ...productData, productDescription: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product Data:', productData);
    // Here you can send the data to the server
  };

  return (
    <CCard>
      <CCardHeader>Add Product</CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <CRow>
            <CCol md={6}>
              <CFormLabel htmlFor="category">Category</CFormLabel>
              <CFormSelect
                id="category"
                name="category"
                value={productData.category}
                onChange={handleCategoryChange}
              >
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>

            <CCol md={6}>
              <CFormLabel htmlFor="subCategory">Sub Category</CFormLabel>
              <CFormSelect
                id="subCategory"
                name="subCategory"
                value={productData.subCategory}
                onChange={handleSubCategoryChange}
              >
                <option value="">Select Subcategory</option>
                {subCategories.map((subCategory, index) => (
                  <option key={index} value={subCategory.name}>
                    {subCategory.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>

          <CRow>
            <CCol md={6}>
              <CFormLabel htmlFor="subSubCategory">Sub Sub Category</CFormLabel>
              <CFormSelect
                id="subSubCategory"
                name="subSubCategory"
                value={productData.subSubCategory}
                onChange={handleChange}
              >
                <option value="">Select Sub-Subcategory</option>
                {subSubCategories.map((subSubCategory, index) => (
                  <option key={index} value={subSubCategory.name}>
                    {subSubCategory.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>

          {/* Product Name */}
          <CRow>
            <CCol md={12}>
              <CFormLabel htmlFor="productName">Product Name</CFormLabel>
              <CFormInput
                type="text"
                id="productName"
                name="productName"
                value={productData.productName}
                onChange={handleChange}
                placeholder="Enter product name"
              />
            </CCol>
          </CRow>

          {/* Product Description using ReactQuill */}
          <CRow>
            <CCol md={12}>
              <CFormLabel htmlFor="productDescription">Product Description</CFormLabel>
              <ReactQuill
                value={productData.productDescription}
                onChange={handleDescriptionChange}
                placeholder="Enter product description"
              />
            </CCol>
          </CRow>

          {/* Submit Button */}
          <CButton type="submit" color="primary" className="mt-3">
            Add Product
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default AddProductForm;
