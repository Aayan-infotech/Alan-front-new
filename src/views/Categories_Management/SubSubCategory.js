import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
  CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter,
  CForm, CFormLabel, CFormSelect, CFormInput, CCard, CCardHeader, CCardBody, CCardFooter
} from '@coreui/react';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CategoriesManagement.css';

const SubSubCategory = () => {
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [categories, setCategories] = useState([]); // For storing categories from API
  const [subCategories, setSubCategories] = useState([]); // For storing subcategories based on selected category
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [subSubCategoryName, setSubSubCategoryName] = useState('');
  const [image, setImage] = useState(null); // State to store the image
  const [visible, setVisible] = useState(false);
  const [editSubSubCategory, setEditSubSubCategory] = useState(null);

  // Fetch categories when the modal is shown
  const fetchCategories = () => {
    axios.get('http://44.196.64.110:7878/api/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  };

  // Fetch subcategories when the category changes
  const fetchSubCategories = (categoryName) => {
    axios.get(`http://44.196.64.110:7878/api/subcategory?category=${categoryName}`)
      .then(response => {
        setSubCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching subcategories:', error);
      });
  };

  const handleAddSubSubCategory = () => {
    setSubSubCategories([
      ...subSubCategories,
      { category, subCategory, name: subSubCategoryName, image, status: 'Active' }
    ]);
    setSubSubCategoryName('');
    setCategory('');
    setSubCategory('');
    setImage(null); // Reset image after adding
    setVisible(false);
  };

  const handleEditSubSubCategory = (subSubCategory) => {
    setEditSubSubCategory(subSubCategory);
    setCategory(subSubCategory.category);
    setSubCategory(subSubCategory.subCategory);
    setSubSubCategoryName(subSubCategory.name);
    setImage(subSubCategory.image); // Set image when editing
    setVisible(true);
  };

  const handleUpdateSubSubCategory = () => {
    setSubSubCategories(
      subSubCategories.map(subSubCategory =>
        subSubCategory === editSubSubCategory
          ? { ...subSubCategory, name: subSubCategoryName, image }
          : subSubCategory
      )
    );
    setEditSubSubCategory(null);
    setSubSubCategoryName('');
    setCategory('');
    setSubCategory('');
    setImage(null);
    setVisible(false);
  };

  const handleDeleteSubSubCategory = (subSubCategoryToDelete) => {
    setSubSubCategories(
      subSubCategories.filter(subSubCategory => subSubCategory !== subSubCategoryToDelete)
    );
  };

  const handleToggleStatus = (subSubCategory) => {
    setSubSubCategories(
      subSubCategories.map(s =>
        s === subSubCategory ? { ...s, status: s.status === 'Active' ? 'Blocked' : 'Active' } : s
      )
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL); // Save the image URL to state
    }
  };

  return (
    <>
      <CCard>
        <CCardHeader>
          <div className="d-flex justify-content-between align-items-center">
            <h5>Sub-Sub-Category Management</h5>
            <CButton color="primary" onClick={() => { setVisible(true); fetchCategories(); }}>
              <FontAwesomeIcon icon={faPlus} /> Add Sub-Sub-Category
            </CButton>
          </div>
        </CCardHeader>

        <CCardBody>
          <CTable striped bordered hover responsive className="subcategory-table">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Index</CTableHeaderCell>
                <CTableHeaderCell>Category</CTableHeaderCell>
                <CTableHeaderCell>Sub-Category</CTableHeaderCell>
                <CTableHeaderCell>Sub-Sub-Category</CTableHeaderCell>
                <CTableHeaderCell>Image</CTableHeaderCell> {/* Added column for image */}
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {subSubCategories.length === 0 ? (
                <CTableRow>
                  <CTableDataCell colSpan={7} style={{ textAlign: 'center' }}>
                    No Sub-Sub-Categories Available
                  </CTableDataCell>
                </CTableRow>
              ) : (
                subSubCategories.map((subSubCategory, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{subSubCategory.category}</CTableDataCell>
                    <CTableDataCell>{subSubCategory.subCategory}</CTableDataCell>
                    <CTableDataCell>{subSubCategory.name}</CTableDataCell>
                    <CTableDataCell>
                      {subSubCategory.image ? (
                        <img src={subSubCategory.image} alt={subSubCategory.name} width="50" height="50" />
                      ) : (
                        'No Image'
                      )}
                    </CTableDataCell> {/* Display image */}
                    <CTableDataCell>{subSubCategory.status}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color={subSubCategory.status === 'Active' ? 'danger' : 'success'}
                        onClick={() => handleToggleStatus(subSubCategory)}
                        className="mx-1 status-toggle-btn"
                      >
                        {subSubCategory.status === 'Active' ? 'Block' : 'Activate'}
                      </CButton>
                      <CButton
                        color="warning"
                        onClick={() => handleEditSubSubCategory(subSubCategory)}
                        className="mx-1 edit-btn"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </CButton>
                      <CButton
                        color="danger"
                        onClick={() => handleDeleteSubSubCategory(subSubCategory)}
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
          <small>Sub-Sub-Category Management System</small>
        </CCardFooter>
      </CCard>

      {/* Add or Edit Sub-Sub-Category Modal */}
      <CModal size="md" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>{editSubSubCategory ? 'Edit Sub-Sub-Category' : 'Add New Sub-Sub-Category'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormLabel>Category</CFormLabel>
            <CFormSelect
              value={category}
              onChange={(e) => {
                const selectedCategory = e.target.value;
                setCategory(selectedCategory);
                fetchSubCategories(selectedCategory); // Fetch subcategories when a category is selected
              }}
              className="subcategory-select"
            >
              <option value="">Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat.name}>{cat.name}</option>
              ))}
            </CFormSelect>

            <CFormLabel>Sub-Category</CFormLabel>
            <CFormSelect
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="subcategory-select"
              disabled={!category} // Disable if no category is selected
            >
              <option value="">Select Sub-Category</option>
              {subCategories.map((subCat, index) => (
                <option key={index} value={subCat.name}>{subCat.name}</option>
              ))}
            </CFormSelect>

            <CFormLabel>Sub-Sub-Category Name</CFormLabel>
            <CFormInput
              type="text"
              value={subSubCategoryName}
              onChange={(e) => setSubSubCategoryName(e.target.value)}
              placeholder="Enter Sub-Sub-Category name"
              className="subcategory-input"
            />

            {/* Image Upload */}
            <CFormLabel>Upload Image</CFormLabel>
            <CFormInput
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="subcategory-input"
            />
            {image && <img src={image} alt="Preview" width="100" height="100" />}
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)} className="cancel-btn">
            Cancel
          </CButton>
          <CButton
            color="primary"
            onClick={editSubSubCategory ? handleUpdateSubSubCategory : handleAddSubSubCategory}
            className="save-btn"
          >
            {editSubSubCategory ? 'Save Changes' : 'Add Sub-Sub-Category'}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default SubSubCategory;
