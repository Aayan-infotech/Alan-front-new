// src/components/ManageProduct.js
import React, { useState } from 'react';
import {
  CForm,
  CFormLabel,
  CFormSelect,
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CInputGroup,
  CInputGroupText,
  CFormInput,
} from '@coreui/react';
import '../Categories_Management/CategoriesManagement.css';

const ManageProduct = () => {
  // Sample data (you can replace this with real data from an API)
  const productData = [
    { id: 1, name: 'iPhone 15', category: 'Electronics', subCategory: 'Mobile Phones', subSubCategory: 'Smartphones', status: 'Active', images: ['img1.jpg', 'img2.jpg'], dimensions: '6.1 x 2.8 x 0.3 inches' },
    { id: 2, name: 'MacBook Pro', category: 'Electronics', subCategory: 'Laptops', subSubCategory: 'Business', status: 'Active', images: ['img3.jpg'], dimensions: '14.1 x 9.7 x 0.6 inches' },
    { id: 3, name: 'Nike T-shirt', category: 'Clothing', subCategory: 'Men', subSubCategory: 'T-shirts', status: 'Active', images: ['img4.jpg', 'img5.jpg'], dimensions: 'L' },
  ];

  const categories = ['Electronics', 'Clothing', 'Food'];
  const subCategories = {
    Electronics: ['Mobile Phones', 'Laptops', 'TVs'],
    Clothing: ['Men', 'Women', 'Kids'],
    Food: ['Fruits', 'Vegetables', 'Snacks'],
  };
  const subSubCategories = {
    'Mobile Phones': ['Smartphones', 'Feature Phones'],
    Laptops: ['Gaming', 'Business', 'Ultrabooks'],
  };

  const [filters, setFilters] = useState({
    category: '',
    subCategory: '',
    subSubCategory: '',
    status: '',
    search: '',
  });

  const [data, setData] = useState(productData);

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Filter products based on selected filters
  const filteredData = data.filter((product) => {
    return (
      (filters.category ? product.category === filters.category : true) &&
      (filters.subCategory ? product.subCategory === filters.subCategory : true) &&
      (filters.subSubCategory ? product.subSubCategory === filters.subSubCategory : true) &&
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
                      <option key={category} value={category}>
                        {category}
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
                      subCategories[filters.category]?.map((subCategory) => (
                        <option key={subCategory} value={subCategory}>
                          {subCategory}
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
                        <option key={subSubCategory} value={subSubCategory}>
                          {subSubCategory}
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
                    <option value="Block">Block</option>
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
                  <CTableHeaderCell>Dimensions</CTableHeaderCell>
                  <CTableHeaderCell>Images</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {filteredData.map((product) => (
                  <CTableRow key={product.id}>
                    <CTableDataCell>{product.name}</CTableDataCell>
                    <CTableDataCell>{product.category}</CTableDataCell>
                    <CTableDataCell>{product.subCategory}</CTableDataCell>
                    <CTableDataCell>{product.subSubCategory}</CTableDataCell>
                    <CTableDataCell>{product.dimensions}</CTableDataCell>
                    <CTableDataCell>
                      {product.images.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`product-${index}`}
                          style={{ width: '50px', marginRight: '5px', borderRadius: '5px' }}
                        />
                      ))}
                    </CTableDataCell>
                    <CTableDataCell>{product.status}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color={product.status === 'Active' ? 'danger' : 'success'}
                        className="mr-2"
                        onClick={() => alert(`${product.status === 'Active' ? 'Block' : 'Activate'} product: ${product.name}`)}
                      >
                        {product.status === 'Active' ? 'Block' : 'Activate'}
                      </CButton>
                      <CButton
                        color="warning"
                        className="mr-2"
                        onClick={() => alert(`Edit product: ${product.name}`)}
                      >
                        Edit
                      </CButton>
                      <CButton
                        color="danger"
                        onClick={() => alert(`Delete product: ${product.name}`)}
                      >
                        Delete
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};


export default ManageProduct;
