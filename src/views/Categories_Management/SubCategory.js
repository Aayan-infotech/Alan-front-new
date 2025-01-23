import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
  CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter,
  CForm, CFormLabel, CFormInput, CFormSelect, CCard, CCardHeader, CCardBody, CCardFooter
} from '@coreui/react';
import { faEdit, faTrash, faPlus, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CategoriesManagement.css';

const SubCategory = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [subCategoryName, setSubCategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [editSubCategory, setEditSubCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  // Fetch categories from API when the component is mounted
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

  // Fetch sub-categories from API
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get('http://44.196.64.110:7878/api/subcategory');
        setSubCategories(response.data);
      } catch (error) {
        console.error('Error fetching sub-categories:', error);
      }
    };

    fetchSubCategories();
  }, []);

  // Handle adding new sub-category
  const handleAddSubCategory = async () => {
    if (subCategoryName && selectedCategory && selectedImage) {
      const formData = new FormData();
      formData.append('name', subCategoryName);
      formData.append('category_id', selectedCategory);
      formData.append('images', selectedImage);
      formData.append('status', '1');
      formData.append('ins_date', new Date().toISOString());
      formData.append('ins_ip', '127.0.0.1');

      try {
        await axios.post('http://44.196.64.110:7878/api/subcategory', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        setSubCategoryName('');
        setSelectedCategory('');
        setSelectedImage(null);
        setVisible(false);

        // Fetch updated sub-categories
        const response = await axios.get('http://44.196.64.110:7878/api/subcategory');
        setSubCategories(response.data);
      } catch (error) {
        console.error('Error adding sub-category:', error);
      }
    }
  };

  // Handle updating existing sub-category
  const handleUpdateSubCategory = async () => {
    if (editSubCategory) {
      const formData = new FormData();
      formData.append('name', subCategoryName);
      formData.append('category_id', selectedCategory);
      if (selectedImage instanceof File) {
        formData.append('images', selectedImage);
      }
      formData.append('status', '1');
      formData.append('ins_date', new Date().toISOString());
      formData.append('ins_ip', '127.0.0.1');

      try {
        await axios.put(`http://44.196.64.110:7878/api/subcategory/${editSubCategory._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        setSubCategoryName('');
        setSelectedCategory('');
        setSelectedImage(null);
        setVisible(false);
        setEditSubCategory(null);

        // Fetch updated sub-categories
        const response = await axios.get('http://44.196.64.110:7878/api/subcategory');
        setSubCategories(response.data);
      } catch (error) {
        console.error('Error updating sub-category:', error);
      }
    }
  };

  // Handle deleting a sub-category
  const handleDeleteSubCategory = async (subCategoryToDelete) => {
    try {
      await axios.delete(`http://44.196.64.110:7878/api/subcategory/${subCategoryToDelete._id}`);

      // Fetch updated sub-categories after successful deletion
      const response = await axios.get('http://44.196.64.110:7878/api/subcategory');
      setSubCategories(response.data);
    } catch (error) {
      console.error('Error deleting sub-category:', error);
    }
  };

  // Handle toggling sub-category status (active/block)
  const handleToggleStatus = async (subCategory) => {
    try {
      const updatedSubCategory = {
        ...subCategory,
        status: subCategory.status === 1 ? 0 : 1
      };

      await axios.put(`http://44.196.64.110:7878/api/subcategory/${subCategory._id}`, updatedSubCategory);

      // Fetch updated sub-categories after status change
      const response = await axios.get('http://44.196.64.110:7878/api/subcategory');
      setSubCategories(response.data);
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  // Get category name from category_id
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.name : 'N/A';
  };

  return (
    <>
      <CCard className="subcategory-card">
        <CCardHeader className="subcategory-card-header">
          <div className="d-flex justify-content-between align-items-center">
            <h5>Sub-Category Management</h5>
            <CButton color="primary" onClick={() => setVisible(true)} className="add-subcategory-btn">
              <FontAwesomeIcon icon={faPlus} /> Add Sub-Category
            </CButton>
          </div>
        </CCardHeader>

        <CCardBody className="subcategory-card-body">
          <CTable striped bordered hover responsive className="subcategory-table">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Index</CTableHeaderCell>
                <CTableHeaderCell>Image</CTableHeaderCell>
                <CTableHeaderCell>Sub-Category Name</CTableHeaderCell>
                <CTableHeaderCell>Category</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {subCategories.length === 0 ? (
                <CTableRow>
                  <CTableDataCell colSpan={6} className="text-center">No Sub-Categories Available</CTableDataCell>
                </CTableRow>
              ) : (
                subCategories.map((subCategory, index) => (
                  <CTableRow key={subCategory._id}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>
                      {subCategory.images && subCategory.images.length > 0 ? (
                        <img
                          src={subCategory.images[0]} // Access the first image in the array
                          alt="Sub-category"
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </CTableDataCell>
                    <CTableDataCell>{subCategory.name}</CTableDataCell>
                    <CTableDataCell>{getCategoryName(subCategory.category_id)}</CTableDataCell>
                    <CTableDataCell>{subCategory.status === 1 ? 'Active' : 'Blocked'}</CTableDataCell>
                    <CTableDataCell>
                      <FontAwesomeIcon
                        icon={subCategory.status === 1 ? faUnlock : faLock}
                        onClick={() => handleToggleStatus(subCategory)}
                        style={{ cursor: 'pointer', margin: '0 8px', color: subCategory.status === 1 ? 'green' : 'red' }}
                      />
                      <FontAwesomeIcon
                        icon={faEdit}
                        onClick={() => {
                          setVisible(true);
                          setEditSubCategory(subCategory);
                          setSubCategoryName(subCategory.name);
                          setSelectedCategory(subCategory.category_id);
                        }}
                        style={{ cursor: 'pointer', margin: '0 8px' }}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => handleDeleteSubCategory(subCategory)}
                        style={{ cursor: 'pointer', margin: '0 8px', color: 'red' }}
                      />
                    </CTableDataCell>
                  </CTableRow>
                ))
              )}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>{editSubCategory ? 'Edit' : 'Add'} Sub-Category</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormLabel htmlFor="subCategoryName">Sub-Category Name</CFormLabel>
            <CFormInput
              id="subCategoryName"
              type="text"
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
              required
            />
            <CFormLabel htmlFor="category">Category</CFormLabel>
            <CFormSelect
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </CFormSelect>

            <CFormLabel htmlFor="image">Image</CFormLabel>
            <CFormInput
              id="image"
              type="file"
              onChange={handleImageChange}
              accept="image/*"
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton
            color="primary"
            onClick={editSubCategory ? handleUpdateSubCategory : handleAddSubCategory}
          >
            {editSubCategory ? 'Update' : 'Add'} Sub-Category
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default SubCategory;
