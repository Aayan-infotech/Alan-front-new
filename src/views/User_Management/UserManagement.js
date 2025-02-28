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
import { cilTrash, cilPencil, cilLockUnlocked, cilLockLocked } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

const API_URL = 'http://54.236.98.193:7878/api/AdminUsers';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: '',
    name: '',
    email: '',
    mobile: '',
    password: '',
    status: 'Active',
  });
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  // Open modal for adding a new user
  const handleAddUser = () => {
    setCurrentUser({ id: '', name: '', email: '', mobile: '', password: '', status: '' });
    setIsEditing(false);
    setModalVisible(true);
    console.log("handleAddUser",handleAddUser());
    
  };

  // Open modal for editing a user
  const handleEditUser = (user) => {
    setCurrentUser({ ...user, id: user._id });
    setIsEditing(true);
    setModalVisible(true);
  };

  // fetchUserIp
  const fetchUserIp = async () => {
    try {
      const response = await axios.get('https://api.ipify.org?format=json');
      return response.data.ip; // Return the IP address
    } catch (error) {
      console.error('Error fetching IP address:', error);
      return ''; 
    }
  };

  // Save user (add or update)
  const handleSaveUser = async () => {
    try {
      const userIp = await fetchUserIp(); // Get user's IP address
  
      if (isEditing) {
        await axios.put(`${API_URL}/${currentUser.id}`, {
          name: currentUser.name,
          email: currentUser.email,
          mobile: currentUser.mobile,
          ins_ip: userIp, // Add IP address to the update request
        });
      } else {
        await axios.post(API_URL, {
          name: currentUser.name,
          email: currentUser.email,
          mobile: currentUser.mobile,
          password: currentUser.password,
          ins_ip: userIp, // Add IP address to the save request
        });
      }
      fetchUsers(); // Refresh the list of users
      setModalVisible(false); // Close the modal
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  // Delete a user
  const confirmDeleteUser = async () => {
    try {
      await axios.delete(`${API_URL}/${deleteUserId}`);
      fetchUsers();
      setDeleteUserId(null);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Toggle Active/Blocked status (0 = Disabled, 1 = Enabled)
  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 1 ? 0 : 1;
      await axios.put(`${API_URL}/${id}`, { status: newStatus });
      fetchUsers();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="container mt-4">
      <CCard>
        <CCardHeader>
          <h3>User Management</h3>
          <CButton color="primary" onClick={handleAddUser}>
            Add User
          </CButton>
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
                  <CTableHeaderCell>mobile</CTableHeaderCell>
                  <CTableHeaderCell>status</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {users.map((user) => (
                  <CTableRow key={user._id}>
                    <CTableDataCell>{user._id}</CTableDataCell>
                    <CTableDataCell>{user.name}</CTableDataCell>
                    <CTableDataCell>{user.email}</CTableDataCell>
                    <CTableDataCell>{user.mobile || 'N/A'}</CTableDataCell>
                    <CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color={user.status === 1 ? 'success' : 'secondary'}
                          size="sm"
                          onClick={() => toggleStatus(user._id, user.status)}
                        >
                          <CIcon icon={user.status === 1 ? cilLockUnlocked : cilLockLocked} className="me-1" />
                          {user.status === 1 ? 'Enabled' : 'Disabled'}
                        </CButton>
                      </CTableDataCell>

                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton color="info" size="sm" onClick={() => handleEditUser(user)} className="me-2">
                        <CIcon icon={cilPencil} />
                      </CButton>
                      <CButton color="danger" size="sm" onClick={() => setDeleteUserId(user._id)}>
                        <CIcon icon={cilTrash} />
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          )}
        </CCardBody>
      </CCard>

      {/* Add/Edit User Modal */}
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader closeButton>
          <CModalTitle>{isEditing ? 'Edit User' : 'Add User'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <div className="mb-3">
              <CFormLabel>Name</CFormLabel>
              <CFormInput type="text" name="name" value={currentUser.name} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <CFormLabel>Email</CFormLabel>
              <CFormInput type="email" name="email" value={currentUser.email} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <CFormLabel>mobile</CFormLabel>
              <CFormInput type="text" name="mobile" value={currentUser.mobile} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <CFormLabel>Create Password</CFormLabel>
              <CFormInput type="password" name="password" value={currentUser.password} onChange={handleChange} placeholder="Create a password" />
            </div>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={handleSaveUser}>
            {isEditing ? 'Update' : 'Add'}
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Confirm Delete Modal */}
      <CModal visible={deleteUserId !== null} onClose={() => setDeleteUserId(null)}>
        <CModalHeader closeButton>
          <CModalTitle>Confirm Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure you want to delete this user?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setDeleteUserId(null)}>
            Cancel
          </CButton>
          <CButton color="danger" onClick={confirmDeleteUser}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default UserManagement;
