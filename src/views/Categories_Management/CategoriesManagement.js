import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
  CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter,
  CForm, CFormLabel, CFormInput, CCard, CCardHeader, CCardBody, CCardFooter
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import './CategoriesManagement.css';

const CategoriesManagement = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://www.discountdoorandwindow.com/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/svg+xml'];

  const isDuplicateName = (name) => {
    const lowerName = name.trim().toLowerCase();
    return categories.some(cat => cat.name.trim().toLowerCase() === lowerName && (!editCategory || cat._id !== editCategory._id));
  };

  const validateForm = () => {
    if (!categoryName.trim()) {
      alert('Category Name is required.');
      return false;
    }

    if (!editCategory && !categoryImage) {
      alert('Category Image is required.');
      return false;
    }

    if (categoryImage && !allowedImageTypes.includes(categoryImage.type)) {
      alert('Only JPEG, PNG, GIF, and SVG image formats are allowed.');
      return false;
    }

    if (isDuplicateName(categoryName)) {
      alert('Category name already exists. Please use a different name.');
      return false;
    }

    return true;
  };

  const fetchUserIp = async () => {
    try {
      const response = await axios.get('https://api.ipify.org?format=json');
      return response.data.ip;
    } catch (error) {
      console.error('Error fetching IP address:', error);
      return '';
    }
  };

  // const handleAddCategory = async () => {
  //   try {
  //     const userIp = await fetchUserIp();
  //     const formData = new FormData();
  //     formData.append('name', categoryName);
  //     if (categoryImage) formData.append('images', categoryImage);
  //     formData.append('ins_ip', userIp);
  //     formData.append('status', 1);

  //     const response = await axios.post('https://www.discountdoorandwindow.com/api/categories', formData);
  //     setCategories([...categories, response.data.newCategory]);
  //     resetForm();
  //   } catch (error) {
  //     console.error('Error adding category:', error);
  //   }
  // };

  const handleAddCategory = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const userIp = await fetchUserIp();
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('name', categoryName);
      if (categoryImage) formData.append('images', categoryImage);
      formData.append('ins_ip', userIp);
      formData.append('status', 1);

      const response = await axios.post(
        'https://www.discountdoorandwindow.com/api/categories',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories([...categories, response.data.newCategory]);
      resetForm();
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleUpdateCategory = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const userIp = await fetchUserIp();
      const formData = new FormData();
      formData.append('name', categoryName);
      if (categoryImage) formData.append('images', categoryImage);
      formData.append('update_ip', userIp);
      const response = await axios.put(`https://www.discountdoorandwindow.com/api/categories/${editCategory._id}`, formData);
      setCategories(categories.map(category =>
        category._id === editCategory._id ? response.data.updatedCategory : category
      ));
      resetForm();
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const resetForm = () => {
    setEditCategory(null);
    setCategoryName('');
    setCategoryImage(null);
    setVisible(false);
    setLoading(false);
  };

  const handleEditCategory = (category) => {
    setLoading(false);
    setEditCategory(category);
    setCategoryName(category.name);
    setCategoryImage(null);
    setVisible(true);
  };

  const handleDeleteCategory = async (categoryToDelete) => {
    try {
      await axios.delete(`https://www.discountdoorandwindow.com/api/categories/${categoryToDelete._id}`);
      setCategories(categories.filter(category => category._id !== categoryToDelete._id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleToggleStatus = async (category) => {
    try {
      const updatedStatus = category.status === 1 ? 0 : 1;
      const response = await axios.put(`https://www.discountdoorandwindow.com/api/categories/updateStatus/${category._id}`, {
        status: updatedStatus,
      });

      if (response.data && response.data.category) { // Ensure the response is valid
        setCategories(prevCategories =>
          prevCategories.map(c =>
            c._id === category._id ? { ...c, status: updatedStatus } : c
          )
        );
      } else {
        console.error('Unexpected API response:', response.data);
      }
    } catch (error) {
      console.error('Error toggling category status:', error);
    }
  };

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
                <CTableHeaderCell>Image</CTableHeaderCell>
                <CTableHeaderCell>Name</CTableHeaderCell>
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
                      {category.images && category.images.length > 0 ? (
                        <img src={category.images[0]} alt={category.name} style={{ width: '50px', height: '50px' }} />
                      ) : 'No Image'}
                    </CTableDataCell>
                    <CTableDataCell>{category.name}</CTableDataCell>
                    <CTableDataCell>{category.status === 1 ? 'Active' : 'Blocked'}</CTableDataCell>
                    <CTableDataCell>
                      <FontAwesomeIcon
                        icon={category.status === 1 ? faUnlock : faLock}
                        onClick={() => handleToggleStatus(category)}
                        style={{ cursor: 'pointer', margin: '0 8px', color: category.status === 1 ? 'green' : 'red' }}
                      />
                      <FontAwesomeIcon
                        icon={faEdit}
                        color="warning"
                        onClick={() => handleEditCategory(category)}
                        style={{ margin: '0 8px', cursor: 'pointer' }}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        color="danger"
                        onClick={() => handleDeleteCategory(category)}
                        style={{ cursor: 'pointer' }}
                      />
                    </CTableDataCell>
                  </CTableRow>
                ))
              )}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      <CModal size="lg" visible={visible} onClose={resetForm}>
        <CModalHeader>
          <CModalTitle>{editCategory ? 'Edit Category' : 'Add Category'}</CModalTitle>
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
            {/* <CFormInput
              type="file"
              onChange={(e) => setCategoryImage(e.target.files[0])}
            /> */}
            <CFormInput
              type="file"
              accept=".jpg,.jpeg,.png,.gif,.svg"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file && !allowedImageTypes.includes(file.type)) {
                  alert('Only JPEG, PNG, GIF, and SVG image formats are allowed.');
                  e.target.value = null;
                  return;
                }
                setCategoryImage(file)
              }}
            />
            {categoryImage ? (
              <div className="image-preview">
                <img src={URL.createObjectURL(categoryImage)} alt="Preview" style={{ width: '100px', height: '100px' }} />
              </div>
            ) : editCategory && editCategory.images && editCategory.images.length > 0 ? (
              <div className="image-preview">
                <img src={editCategory.images[0]} alt="Preview" style={{ width: '100px', height: '100px' }} />
              </div>
            ) : null}
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={resetForm}>Cancel</CButton>
          <CButton
            color="primary"
            onClick={editCategory ? handleUpdateCategory : handleAddCategory}
            disabled={loading}
          >
            {loading ? 'Please wait...' : (editCategory ? 'Save Changes' : 'Add Category')}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default CategoriesManagement;
