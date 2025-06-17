import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
  CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter,
  CForm, CFormLabel, CFormSelect, CFormInput, CCard, CCardHeader, CCardBody, CCardFooter
} from '@coreui/react';
import { faEdit, faTrash, faPlus, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CategoriesManagement.css';

const SubSubCategory = () => {
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [subSubCategoryName, setSubSubCategoryName] = useState('');
  const [images, setImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [editSubSubCategory, setEditSubSubCategory] = useState(null);
  const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/svg+xml',];
  const [isSubmitting, setIsSubmitting] = useState(false);      // NEW
  const [preview, setPreview] = useState(null);

  //VALIDATION 
  const validateForm = () => {
    if (!category || !subCategory) {
      alert('Please select a category and sub‑category.');
      return false;
    }
    if (!subSubCategoryName.trim()) {
      alert('Please enter a sub‑sub‑category name.');
      return false;
    }
    if (!images) {
      alert('Please select an image.');
      return false;
    }
    if (!allowedImageTypes.includes(images.type)) {
      alert('Only JPEG, PNG, GIF, and SVG formats are allowed.');
      return false;
    }
    return true;
  };


  // Fetch categories when the modal is shown
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('http://18.209.91.97:7778/api/categories');
      setCategories(data.map((cat) => ({ id: cat._id, name: cat.name })));
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch Sub-Categories based on the selected category
  const fetchSubCategories = (categoryId) => {
    axios
      .get(`http://18.209.91.97:7778/api/subcategory?category_id=${categoryId}`)
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

  const fetchAllSubcategoriesData = async () => {
    axios.get('http://18.209.91.97:7778/api/subSubCategories')
      .then(response => {
        setSubSubCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching sub-sub-categories:', error);
      });
  }

  const handleAddSubSubCategory = () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    const selectedCategory = categories.find((cat) => cat.name === category);
    const selectedSubCategory = subCategories.find((subCat) => subCat.name === subCategory);

    if (!selectedCategory || !selectedSubCategory) {
      alert('Please select valid category and sub-category');
      return;
    }

    const formData = new FormData();

    formData.append('images', images);
    formData.append('category_id', selectedCategory.id);
    formData.append('sub_category_id', selectedSubCategory.id);
    formData.append('name', subSubCategoryName);
    formData.append('status', 1);
    formData.append('ins_date', new Date().toISOString());
    formData.append('ins_ip', '127.0.0.1');

    axios
      .post('http://18.209.91.97:7778/api/subSubCategories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        fetchAllSubcategoriesData();
        setVisible(false);
        resetForm();
      })
      .catch((error) => { console.error('Error adding sub-sub-category:', error); })
      .finally(() => { setIsSubmitting(false); resetForm(); });
  };

  const handleEditSubSubCategory = async (subSubCategory) => {
    setEditSubSubCategory(subSubCategory);

    // Step 1: Set category and fetch sub-categories
    setCategory(subSubCategory.category); // Or use ID if needed

    await fetchSubCategories(subSubCategory.category); // fetch by category ID

    // Step 2: Set sub-category after sub-categories are fetched
    setSubCategory(subSubCategory.sub_category_name); // Use name if you're comparing by name

    // Step 3: Set remaining fields
    setSubSubCategoryName(subSubCategory.name);
    setCategory(subSubCategory.category_name);
    setPreview(subSubCategory.images)
    setImage(null);
    setPreview(subSubCategory.images || null);
    setVisible(true);

    // Fetch categories too (optional if already fetched globally)
    fetchCategories();
  };

  const handleUpdateSubSubCategory = async () => {
    
    setIsSubmitting(true);

    const selectedCategory = categories.find((cat) => cat.name === category);
    const selectedSubCategory = subCategories.find((subCat) => subCat.name === subCategory);

    if (!selectedCategory || !selectedSubCategory) {
      alert('Please select valid category and sub-category');
      setIsSubmitting(false);
      return;
    }

    const subSubCategoryId = editSubSubCategory._id;
    if (!subSubCategoryId) {
      console.error('Invalid ID for update:', editSubSubCategory);
      setIsSubmitting(false);
      return;
    }

    // Fetch user IP (default to 0.0.0.0 if fails)
    let userIp = '0.0.0.0';
    try {
      const response = await axios.get('https://api.ipify.org?format=json');
      userIp = response.data.ip || '0.0.0.0';
    } catch (error) {
      console.warn('Could not fetch IP, using default 0.0.0.0');
    }

    const formData = new FormData();
    formData.append('name', subSubCategoryName);
    formData.append('category_id', selectedCategory.id);
    formData.append('sub_category_id', selectedSubCategory.id);
    formData.append('status', editSubSubCategory.status || 1);
    formData.append('update_by', '60f6a1df1a2b3c001f0b1e90'); 
    formData.append('update_ip', userIp);

    if (images) {
      formData.append('images', images);
    }

    try {
      const response = await axios.put(
        `http://18.209.91.97:7778/api/subSubCategories/${subSubCategoryId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const updated = response.data.data;
      setSubSubCategories(subSubCategories.map((item) =>
        item._id === subSubCategoryId ? updated : item
      ));
      await fetchAllSubcategoriesData()
      setVisible(false);
      resetForm();
    } catch (error) {
      console.error('Error updating sub-sub-category:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSubSubCategory = (subSubCategoryToDelete) => {
    const subSubCategoryId = subSubCategoryToDelete._id;
    if (subSubCategoryId) {
      axios.delete(`http://18.209.91.97:7778/api/subSubCategories/${subSubCategoryId}`)
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

  const handleToggleStatus = (subSubCategoryId) => {
    const subSubCategory = subSubCategories.find((item) => item._id === subSubCategoryId);
    const newStatus = subSubCategory.status === 1 ? 0 : 1;

    const payload = { status: newStatus };

    axios.put(`http://18.209.91.97:7778/api/subSubCategories/${subSubCategoryId}`, payload)
      .then(() => {
        setSubSubCategories(subSubCategories.map(subSubCategory =>
          subSubCategory._id === subSubCategoryId
            ? { ...subSubCategory, status: newStatus }
            : subSubCategory
        ));
      })
      .catch((error) => {
        console.error('Error toggling status:', error);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && !allowedImageTypes.includes(file.type)) {
      alert('Only JPEG, PNG, GIF, and SVG formats are allowed.');
      return;
    }
    setImage(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  // Reset form state for the modal
  const resetForm = () => {
    setCategory('');
    setSubCategory('');
    setSubSubCategoryName('');
    setImage(null);
    setEditSubSubCategory(null);
    setSubCategories([]);
    setPreview(null);
  };

  return (
    <>
      <CCard>
        <CCardHeader>
          <div className="d-flex justify-content-between align-items-center">
            <h5>Sub-Sub-Category Management</h5>
            <CButton color="primary" onClick={() => { setVisible(true); fetchCategories(); resetForm(); }}>
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
                      {subSubCategory.images ? (
                        <img src={subSubCategory.images} alt={subSubCategory.name} width="50" height="50" />
                      ) : (
                        'No Image'
                      )}
                    </CTableDataCell>
                    <CTableDataCell>{subSubCategory.status === 1 ? 'Active' : 'Inactive'}</CTableDataCell>
                    <CTableDataCell>
                      <FontAwesomeIcon
                        icon={subSubCategory.status === 1 ? faUnlock : faLock}
                        onClick={() => handleToggleStatus(subSubCategory._id)} // Updated to pass the correct ID
                        style={{ cursor: 'pointer', margin: '0 8px', color: subSubCategory.status === 1 ? 'green' : 'red' }}
                      />
                      <FontAwesomeIcon
                        icon={faEdit}
                        color="warning"
                        onClick={() => handleEditSubSubCategory(subSubCategory)}
                        style={{ margin: '0 8px', cursor: 'pointer' }}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        color="danger"
                        onClick={() => handleDeleteSubSubCategory(subSubCategory)}
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

      {/* Modal for Add/Edit Sub-Sub-Category */}
      <CModal size="md" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>{editSubSubCategory ? 'Edit Sub-Sub-Category' : 'Add Sub-Sub-Category'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormLabel>Category</CFormLabel>
            <CFormSelect
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                fetchSubCategories(e.target.value);  // Fetch subcategories based on selected category
              }}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </CFormSelect>

            <CFormLabel>Sub-Category</CFormLabel>
            <CFormSelect
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            >
              <option value="">Select Sub-Category</option>
              {subCategories.map((subCat) => (
                <option key={subCat.id} value={subCat.name}>
                  {subCat.name}
                </option>
              ))}
            </CFormSelect>

            <CFormLabel>Sub-Sub-Category Name</CFormLabel>
            <CFormInput
              type="text"
              value={subSubCategoryName}
              onChange={(e) => setSubSubCategoryName(e.target.value)}
            />

            <CFormLabel>Image</CFormLabel>
            <CFormInput
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/gif,image/svg+xml"   // NEW
              onChange={handleImageChange}
            />
            {preview && (                                               /* NEW – live preview */
              <div className="mt-2">
                <img src={preview} alt="preview" width="100" height="100" style={{ objectFit: 'cover' }} />
              </div>
            )}
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => { setVisible(false); resetForm(); }}>Cancel</CButton>
          <CButton
            color="primary"
            disabled={isSubmitting}                                     // NEW
            onClick={editSubSubCategory ? handleUpdateSubSubCategory : handleAddSubSubCategory}
          >
            {isSubmitting ? 'Please wait…' : editSubSubCategory ? 'Update' : 'Add'}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default SubSubCategory;