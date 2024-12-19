import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
  CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter,
  CForm, CFormLabel, CFormInput, CCard, CCardHeader, CCardBody, CCardFooter
} from '@coreui/react';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CategoriesManagement.css';



const CategoriesManagement = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://44.196.64.110:7878/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const fetchUserIp = async () => {
    try {
      const response = await axios.get('https://api.ipify.org?format=json');
      return response.data.ip;
    } catch (error) {
      console.error('Error fetching IP address:', error);
      return '';
    }
  };

  const handleAddCategory = async () => {
    try {
      const userIp = await fetchUserIp();
      const formData = new FormData();
      formData.append('name', categoryName);
      formData.append('image', categoryImage);
      formData.append('ins_ip', userIp);
      formData.append('status', 1);

      const response = await axios.post('http://44.196.64.110:7878/api/categories', formData);

      setCategories([...categories, response.data.newCategory]);
      setCategoryName('');
      setCategoryImage(null);
      setVisible(false);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleToggleStatus = async (category) => {
    try {
      // Determine the new status based on the current status
      const updatedStatus = category.status === 1 ? 0 : 1;
  
      // Send the update request to the backend
      const response = await axios.put(`http://44.196.64.110:7878/api/categories/${category._id}`, {
        status: updatedStatus,
      });
  
      // Update the category list with the new status
      setCategories(categories.map(c =>
        c._id === category._id ? response.data.updatedCategory : c
      ));
    } catch (error) {
      console.error('Error toggling category status:', error);
    }
  };
  

  const handleUpdateCategory = async () => {
    try {
      const userIp = await fetchUserIp();
      const formData = new FormData();
      formData.append('name', categoryName);
      if (categoryImage) {
        formData.append('image', categoryImage);
      }
      formData.append('update_ip', userIp);

      const response = await axios.put(`http://44.196.64.110:7878/api/categories/${editCategory._id}`, formData);

      setCategories(categories.map(category =>
        category._id === editCategory._id ? response.data.updatedCategory : category
      ));

      setEditCategory(null);
      setCategoryName('');
      setCategoryImage(null);
      setVisible(false);
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };
  const handleEditCategory = (category) => {
    console.log('Editing category:', category); // Debugging log to verify the function is called
    setEditCategory(category);
    setCategoryName(category.name);
    setCategoryImage(null);
    setVisible(true);
  };
  

  const handleDeleteCategory = async (categoryToDelete) => {
    try {
      await axios.delete(`http://44.196.64.110:7878/api/categories/${categoryToDelete._id}`);
      setCategories(categories.filter(category => category._id !== categoryToDelete._id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  }
  return (
    <>
      <CCard className="categories-card">
        <CCardHeader className="categories-card-header">
          <div className="d-flex justify-content-between align-items-center">
            <h5>Categories Management</h5>
            <CButton color="primary" onClick={() => setVisible(true)} className="add-category-btn">
              <FontAwesomeIcon icon={faPlus} /> Add Category
            </CButton>
          </div>
        </CCardHeader>

        <CCardBody className="categories-card-body">
          <CTable striped bordered hover responsive className="categories-table">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Index</CTableHeaderCell>
                <CTableHeaderCell>Image</CTableHeaderCell> {/* Image column */}
                <CTableHeaderCell>Category Name</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {categories.length === 0 ? (
                <CTableRow>
                  <CTableDataCell colSpan={5} className="text-center">No Categories Available</CTableDataCell>
                </CTableRow>
              ) : (
                categories.map((category, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>
                      {category.image ? (
                        <img src={category.image} alt={category.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                      ) : (
                        <span>No Image</span>
                      )}
                    </CTableDataCell>
                    <CTableDataCell>{category.name}</CTableDataCell>
                    <CTableDataCell>{category.status}</CTableDataCell>
                    <CTableDataCell>
                    <CButton
  color={category.status === 1 ? 'danger' : 'success'}
  onClick={() => handleToggleStatus(category)}
  className="mx-1 status-toggle-btn"
>
  {category.status === 1 ? 'Block' : 'Activate'}
</CButton>

                      <CButton
  color="warning"
  onClick={() => handleEditCategory(category)}
  className="mx-1 edit-btn"
>
  <FontAwesomeIcon icon={faEdit} />
</CButton>

                      <CButton 
                        color="danger" 
                        onClick={() => handleDeleteCategory(category)}
                        className="mx-1 delete-btn"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))
              )}
            </CTableBody>
          </CTable>
        </CCardBody>

        <CCardFooter className="text-center">
          <small>Categories Management System</small>
        </CCardFooter>
      </CCard>

      {/* Add or Edit Category Modal */}
      {/* <CModal size="md" visible={visible} onClose={() => setVisible(false)}> */}
      <CModal size="lg" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>{editCategory ? 'Edit Category' : 'Add New Category'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormLabel>Category Name</CFormLabel>
            <CFormInput
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              className="category-input"
            />
            
            <CFormLabel>Category Image</CFormLabel>
            <CFormInput
              type="file"
              onChange={(e) => setCategoryImage(e.target.files[0])}
              className="category-image-input"
            />
            {categoryImage && (
              <div className="image-preview">
                <img src={URL.createObjectURL(categoryImage)} alt="Category Preview" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
              </div>
            )}
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)} className="cancel-btn">
            Cancel
          </CButton>
          <CButton 
            color="primary" 
            onClick={editCategory ? handleUpdateCategory : handleAddCategory}
            className="save-btn"
          >
            {editCategory ? 'Save Changes' : 'Add Category'}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default CategoriesManagement;
