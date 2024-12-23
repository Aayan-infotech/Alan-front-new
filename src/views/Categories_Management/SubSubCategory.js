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
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [subSubCategoryName, setSubSubCategoryName] = useState('');
  const [image, setImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [editSubSubCategory, setEditSubSubCategory] = useState(null);

  // Fetch categories when the modal is shown
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('http://44.196.64.110:7878/api/categories');
      setCategories(data.map((cat) => ({ id: cat._id, name: cat.name })));
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch Sub-Categories based on the selected category
  const fetchSubCategories = (categoryId) => {
    axios
      .get(`http://44.196.64.110:7878/api/subcategory?category_id=${categoryId}`)
      .then((response) => {
        setSubCategories(response.data.map((subCat) => ({ id: subCat._id, name: subCat.name })));
      })
      .catch((error) => {
        console.error('Error fetching subcategories:', error);
      });
  };

  // Fetch all Sub-Sub-Categories when the component is mounted
  useEffect(() => {
    fetchAllSubcategoriesData();
  }, []);

  const fetchAllSubcategoriesData=async()=>{
    axios.get('http://44.196.64.110:7878/api/subSubCategories')
    .then(response => {
      setSubSubCategories(response.data);
    })
    .catch(error => {
      console.error('Error fetching sub-sub-categories:', error);
    });
  }
  // Handle Add Sub-Sub-Category
  const handleAddSubSubCategory = () => {
    const selectedCategory = categories.find((cat) => cat.name === category);
    const selectedSubCategory = subCategories.find((subCat) => subCat.name === subCategory);

    if (!selectedCategory || !selectedSubCategory) {
      alert('Please select valid category and sub-category');
      return;
    }

    const payload = {
      image,
      category_id: selectedCategory.id,
      sub_category_id: selectedSubCategory.id,
      name: subSubCategoryName,
      status: 1,
      ins_date: new Date().toISOString(),
      ins_ip: "127.0.0.1",
      ins_by: null,
    };

    axios
      .post('http://44.196.64.110:7878/api/subSubCategories', payload)
      .then((response) => {
        // setSubSubCategories([...subSubCategories, response.data]);
        fetchAllSubcategoriesData();
        setVisible(false);
        resetForm();
      })
      .catch((error) => {
        console.error('Error adding sub-sub-category:', error);
      });
  };

  // Handle Edit Sub-Sub-Category
  const handleEditSubSubCategory = (subSubCategory) => {
    setEditSubSubCategory(subSubCategory);
    setCategory(subSubCategory.category);
    setSubCategory(subSubCategory.subCategory);
    setSubSubCategoryName(subSubCategory.name);
    setImage(subSubCategory.image);
    setVisible(true);
  };

  // Handle Update 
  const handleUpdateSubSubCategory = () => {
    // Ensure you are passing the correct 'id' field (not the whole object)
    const payload = {
      image,
      category_id: categories.find((cat) => cat.name === category)?.id,
      sub_category_id: subCategories.find((subCat) => subCat.name === subCategory)?.id,
      name: subSubCategoryName,
      status: editSubSubCategory.status,
      ins_date: editSubSubCategory.ins_date,
      ins_ip: "127.0.0.1",
      ins_by: null,
    };
    // Extract the correct ID
    const subSubCategoryId = editSubSubCategory._id;  // Use _id field from the object
    // Check if the ID exists
    if (subSubCategoryId) {
      axios.put(`http://44.196.64.110:7878/api/subSubCategories/${subSubCategoryId}`, payload)
        .then(() => {
          setSubSubCategories(subSubCategories.map(subSubCategory =>
            subSubCategory._id === subSubCategoryId
              ? { ...subSubCategory, ...payload }
              : subSubCategory
          ));
          setVisible(false);
          resetForm();
        })
        .catch(error => {
          console.error('Error updating sub-sub-category:', error);
        });
    } else {
      console.error('Invalid ID for update:', editSubSubCategory);
    }
  };

  //Handle Delete
  const handleDeleteSubSubCategory = (subSubCategoryToDelete) => {
    // Extract the correct ID for deletion
    const subSubCategoryId = subSubCategoryToDelete._id;  // Use _id field from the object

    // Ensure subSubCategoryId is available before making the request
    if (subSubCategoryId) {
      axios.delete(`http://44.196.64.110:7878/api/subSubCategories/${subSubCategoryId}`)
        .then(() => {
          setSubSubCategories(subSubCategories.filter(subSubCategory => subSubCategory._id !== subSubCategoryId));
        })
        .catch(error => {
          console.error('Error deleting sub-sub-category:', error);
        });
    } else {
      console.error('Invalid ID for deletion:', subSubCategoryToDelete);
    }
  };



  // Handle Image Change (Image Upload)
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
                <CTableHeaderCell>Image</CTableHeaderCell>
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
                    <CTableDataCell>{subSubCategory.category_name}</CTableDataCell>
                    <CTableDataCell>{subSubCategory.sub_category_name}</CTableDataCell>
                    <CTableDataCell>{subSubCategory.name}</CTableDataCell>
                    <CTableDataCell>
                      {subSubCategory.image ? (
                        <img src={subSubCategory.image} alt={subSubCategory.name} width="50" height="50" />
                      ) : (
                        'No Image'
                      )}
                    </CTableDataCell>
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

      {/* Modal for Add/Edit Sub-Sub-Category */}
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
                fetchSubCategories(selectedCategory);
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
              disabled={!category}
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
