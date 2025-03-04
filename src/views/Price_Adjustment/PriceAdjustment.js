import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CContainer,
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CForm,
  CRow,
  CCol,
  CAlert,
  CFormSelect,
  CFormLabel,
  CFormInput,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

const PriceAdjustment = () => {
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [subSubCategories, setSubSubCategories] = useState([])
  const [filters, setFilters] = useState({
    category: '',
    subCategory: '',
    subSubCategory: '',
    priceAdjustment: '',
  })

  useEffect(() => {
    axios
      .get('http://18.221.196.222:7878/api/categories')
      .then((response) => setCategories(response.data || []))
      .catch((error) => console.error('Error fetching categories:', error))
  }, [])

  useEffect(() => {
    if (filters.category) {
      axios
        .get(`http://18.221.196.222:7878/api/subcategory/categoryid/${filters.category}`)
        .then((response) => setSubCategories(response.data.data || []))
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
        .get(`http://18.221.196.222:7878/api/subSubCategories/subcategoryid/${filters.subCategory}`)
        .then((response) => setSubSubCategories(response.data.data || []))
        .catch((error) => console.error('Error fetching sub-subcategories:', error))
    } else {
      setSubSubCategories([])
    }
    setFilters((prev) => ({ ...prev, subSubCategory: '' }))
  }, [filters.subCategory])

  const handleFilterChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value })
  }

  const resetFilters = () => {
    setFilters({ category: '', subCategory: '', subSubCategory: '', priceAdjustment: '' })
  }

  return (
    <CContainer className="d-flex justify-content-center">
      <CCard className="shadow-lg w-100">
        <CCardHeader className="bg-primary text-white text-center fs-5">
          Mass Price Adjustment
        </CCardHeader>
        <CCardBody>
          <CAlert color="danger" className="d-flex align-items-center">
            <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />
            <div>
              <strong>BETA:</strong> This tool has been completely modified from how it used to
              work. Please use with care.
            </div>
          </CAlert>
          <p className="text-muted text-center">
            The mass price adjustment tool allows you to set or clear all prices based on the
            configuration you select for every product in your store.
          </p>
          <p className="text-danger text-center fw-bold">
            Be very careful when mass updating your prices and ensure the choices are correct before
            applying them. Once applied, changes cannot be reversed.
          </p>
          <CForm>
            <CRow className="mb-4">
              <CCol md={4}>
                <CFormLabel>Category</CFormLabel>
                <CFormSelect name="category" value={filters.category} onChange={handleFilterChange}>
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={4}>
                <CFormLabel>Subcategory</CFormLabel>
                <CFormSelect
                  name="subCategory"
                  value={filters.subCategory}
                  onChange={handleFilterChange}
                >
                  <option value="">Select Subcategory</option>
                  {subCategories.map((sub) => (
                    <option key={sub._id} value={sub._id}>
                      {sub.name}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={4}>
                <CFormLabel>Sub-subcategory</CFormLabel>
                <CFormSelect
                  name="subSubCategory"
                  value={filters.subSubCategory}
                  onChange={handleFilterChange}
                >
                  <option value="">Select Sub-subcategory</option>
                  {subSubCategories.map((subSub) => (
                    <option key={subSub._id} value={subSub._id}>
                      {subSub.name}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>
            <CRow className="mb-4 justify-content-center mx-auto align-items-end">
              <CCol md={3} className="text-center px-0">
                <CFormLabel>Price Adjustment</CFormLabel>
                <CFormInput
                  type="number"
                  name="priceAdjustment"
                  value={filters.priceAdjustment}
                  onChange={handleFilterChange}
                  placeholder="Enter price adjustment"
                  className="form-control border-primary text-center"
                  style={{ maxWidth: '200px', margin: '0 auto' }}
                />
              </CCol>
              <CCol md={3} className="text-center px-0">
              <CButton
                color="success"
                className="w-100 fw-bold shadow-lg"
              
              >
                APPLY PRICING
              </CButton>
                </CCol>
            </CRow>

           
            <div className="text-center mt-3">
              <CButton color="secondary" onClick={resetFilters}>
                Reset
              </CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default PriceAdjustment
