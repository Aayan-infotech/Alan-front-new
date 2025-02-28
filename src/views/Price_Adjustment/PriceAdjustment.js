import React from 'react';
import { CContainer, CCard, CCardHeader, CCardBody, CButton, CForm, CRow, CCol, CAlert, CFormSelect, CFormCheck } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const PriceAdjustment = () => {
  return (
    <CContainer className=" d-flex justify-content-center">
      <CCard className="shadow-lg w-100">
        <CCardHeader className="bg-primary text-white text-center fs-5">Mass Price Adjustment</CCardHeader>
        <CCardBody>
          <CAlert color="danger" className="d-flex align-items-center">
            <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />
            <div>
              <strong>BETA:</strong> This tool has been completely modified from how it used to work. Please use with care.
            </div>
          </CAlert>
          <p className="text-muted text-center">
            The mass price adjustment tool allows you to set or clear all prices based on the configuration you select for every product in your store.
          </p>
          <p className="text-danger text-center fw-bold">
            Be very careful when mass updating your prices and ensure the choices are correct before applying them. Once applied, changes cannot be reversed.
          </p>
          <CForm>
            <CRow className="mb-4">
              <CCol md={4}>
                <CFormSelect className="shadow-sm">
                  <option>- Select Action -</option>
                  <option>Increase</option>
                  <option>Decrease</option>
                </CFormSelect>
              </CCol>
              <CCol md={4}>
                <CFormSelect className="shadow-sm">
                  <option>All Products</option>
                  <option>Category A</option>
                  <option>Category B</option>
                </CFormSelect>
              </CCol>
              <CCol md={4}>
                <CFormSelect className="shadow-sm">
                  <option>- Select Method -</option>
                  <option>Percentage</option>
                  <option>Fixed Amount</option>
                </CFormSelect>
              </CCol>
            </CRow>
            <CFormCheck label="Include Brand" className="mb-3" />
            <div className="text-center mt-5">
              <CButton color="success" className="w-50 fw-bold shadow-sm">APPLY PRICING</CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
    </CContainer>
  );
};

export default PriceAdjustment;