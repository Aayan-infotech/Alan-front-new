import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormLabel,
} from '@coreui/react';
import { cilPencil, cilInfo, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

const API_URL = 'http://44.196.64.110:7878/api/CustMng/customers';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [deleteCustomerId, setDeleteCustomerId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState({
    id: '',
    name: '',
    email: '',
    mobile: '',
    state: '',
    zipCode: '',
    address: '',
  });
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setCustomers(response.data.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentCustomer({ ...currentCustomer, [name]: value });
  };

  const handleViewCustomer = (customer) => {
    setCurrentCustomer(customer);
    setViewModalVisible(true);
  };

  const handleEditCustomer = (customer) => {
    setCurrentCustomer({ ...customer, id: customer._id });
    setIsEditing(true);
    setModalVisible(true);
  };

  const handleSaveCustomer = async () => {
    try {
      await axios.put(`http://44.196.64.110:7878/api/CustMng/customers/${currentCustomer.id}`, {
        name: currentCustomer.name,
        mobile: currentCustomer.mobile,
        state: currentCustomer.state,
        zipCode: currentCustomer.zipCode,
        address: currentCustomer.address,
      });

      fetchCustomers();
      setModalVisible(false);
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const confirmDeleteCustomer = async () => {
    try {
      await axios.delete(`http://44.196.64.110:7878/api/CustMng/delete/${deleteCustomerId}`);
      fetchCustomers();
      setDeleteCustomerId(null);
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <div className="container mt-4">
      <CCard>
        <CCardHeader>
          <h3>Customer Management</h3>
        </CCardHeader>
        <CCardBody>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <CTable hover responsive>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell>Name</CTableHeaderCell>
                  <CTableHeaderCell>Email</CTableHeaderCell>
                  <CTableHeaderCell>Mobile</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {customers.map((customer) => (
                  <CTableRow key={customer._id}>
                    <CTableDataCell>{customer._id}</CTableDataCell>
                    <CTableDataCell>{customer.name}</CTableDataCell>
                    <CTableDataCell>{customer.email}</CTableDataCell>
                    <CTableDataCell>{customer.mobile || 'N/A'}</CTableDataCell>
                    {/* <CTableDataCell>
                      <CButton color="info" size="sm" onClick={() => handleViewCustomer(customer)} className="me-2">
                        <CIcon icon={cilInfo} /> 
                      </CButton>
                      <CButton color="warning" size="sm" onClick={() => handleEditCustomer(customer)} className="me-2">
                        <CIcon icon={cilPencil } /> 
                      </CButton>
                      <CButton color="danger" size="sm" onClick={() => setDeleteCustomerId(customer._id)}>
                        <CIcon icon={cilTrash} /> 
                      </CButton>
                    </CTableDataCell> */}
                    <CTableDataCell>
                      <CIcon icon={cilInfo} size="lg" className="me-2" onClick={() => handleViewCustomer(customer)} />
                      <CIcon icon={cilPencil} size="lg" className="me-2" onClick={() => handleEditCustomer(customer)} />
                      <CIcon icon={cilTrash} size="lg" onClick={() => setDeleteCustomerId(customer._id)} />
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          )}
        </CCardBody>
      </CCard>

      <CModal visible={viewModalVisible} onClose={() => setViewModalVisible(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Customer Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p><strong>Name:</strong> {currentCustomer.name}</p>
          <p><strong>Email:</strong> {currentCustomer.email}</p>
          <p><strong>Mobile:</strong> {currentCustomer.mobile}</p>
          <p><strong>State:</strong> {currentCustomer.state}</p>
          <p><strong>Zip Code:</strong> {currentCustomer.zipCode}</p>
          <p><strong>Address:</strong> {currentCustomer.address}</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setViewModalVisible(false)}>Close</CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Edit Customer</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <div className="mb-3">
              <CFormLabel>Name</CFormLabel>
              <CFormInput type="text" name="name" value={currentCustomer.name} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <CFormLabel>Mobile</CFormLabel>
              <CFormInput type="text" name="mobile" value={currentCustomer.mobile} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <CFormLabel>State</CFormLabel>
              <CFormInput type="text" name="state" value={currentCustomer.state} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <CFormLabel>Zip Code</CFormLabel>
              <CFormInput type="text" name="zipCode" value={currentCustomer.zipCode} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <CFormLabel>Address</CFormLabel>
              <CFormInput type="text" name="address" value={currentCustomer.address} onChange={handleChange} />
            </div>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>Cancel</CButton>
          <CButton color="primary" onClick={handleSaveCustomer}>Update</CButton>
        </CModalFooter>
      </CModal>
      <CModal visible={deleteCustomerId !== null} onClose={() => setDeleteCustomerId(null)}>
        <CModalHeader closeButton>
          <CModalTitle>Confirm Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure you want to delete this customer?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setDeleteCustomerId(null)}>Cancel</CButton>
          <CButton color="danger" onClick={confirmDeleteCustomer}>Delete</CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default CustomerManagement;
