import React, { useState, useEffect } from 'react';
import {
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol
} from '@coreui/react';

const AddProductForm = () => {
  // Initial state setup for the form
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [productData, setProductData] = useState({
    category: '',
    subCategory: '',
    subSubCategory: '',
    skuCode: '',
    // Add other fields here (e.g., name, price, etc.)
  });

  // Fetch categories, subcategories, and sub-subcategories from the server
  useEffect(() => {
    // Fetch categories
    // For demonstration, using mock data:
    setCategories(['Electronics', 'Clothing', 'Furniture']);
    setSubCategories(['Smartphones', 'Laptops', 'Tables']); // Example for electronics
    setSubSubCategories(['Android', 'iOS']); // Example for smartphones
  }, []);

  // Handle change in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
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
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
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
                onChange={handleChange}
              >
                <option value="">Select Subcategory</option>
                {subCategories.map((subCategory, index) => (
                  <option key={index} value={subCategory}>
                    {subCategory}
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
                  <option key={index} value={subSubCategory}>
                    {subSubCategory}
                  </option>
                ))}
              </CFormSelect>
            </CCol>

            <CCol md={6}>
              <CFormLabel htmlFor="skuCode">SKU Code</CFormLabel>
              <CFormInput
                type="text"
                id="skuCode"
                name="skuCode"
                value={productData.skuCode}
                onChange={handleChange}
                placeholder="Enter SKU Code"
              />
            </CCol>
          </CRow>

          {/* Add more fields based on the client's request */}
          {/* Example additional field */}
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
