import React, { useState, useEffect } from 'react';
import { CRow, CCol, CCard, CCardBody, CButton, CContainer, CHeader, CHeaderBrand, CFormLabel } from '@coreui/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faFileContract, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const StaticContentManagement = () => {
  const [activeSection, setActiveSection] = useState('About Us');
  const [contentData, setContentData] = useState({
    'About Us': '',
    'Terms & Conditions': '',
    'Privacy Policy': ''
  });

  useEffect(() => {
    fetchContent(activeSection);
  }, [activeSection]);

  const fetchContent = async (section) => {
    try {
      const response = await axios.get(`http://localhost:7878/api/StaticContent/${section}`);
      setContentData(prev => ({ ...prev, [section]: response.data.content }));
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const handleDescriptionChange = (value) => {
    setContentData({ ...contentData, [activeSection]: value });
  };

  const saveContent = async () => {
    try {
      await axios.post('http://localhost:7878/api/StaticContent', { section: activeSection, content: contentData[activeSection] });
      alert('Content saved successfully!');
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };

  const sections = [
    { name: 'About Us', icon: faInfoCircle, color: 'primary' },
    { name: 'Terms & Conditions', icon: faFileContract, color: 'warning' },
    { name: 'Privacy Policy', icon: faShieldAlt, color: 'success' }
  ];

  return (
    <CContainer fluid>
      {/* Header */}
      <CHeader className="mb-4 bg-light p-3">
        <CHeaderBrand>Welcome, Discount Doors and Windows 👋</CHeaderBrand>
      </CHeader>
      
      {/* Navigation Cards */}
      <CRow className="mb-4">
        {sections.map((section) => (
          <CCol md={4} key={section.name}>
            <CCard className={`p-3 text-white bg-${section.color}`} style={{ cursor: 'pointer' }} onClick={() => setActiveSection(section.name)}>
              <h5>
                <FontAwesomeIcon icon={section.icon} className="me-2" />
                {section.name}
              </h5>
              <p>Add & update {section.name.toLowerCase()}</p>
            </CCard>
          </CCol>
        ))}
      </CRow>

      {/* Editor */}
      <CCard className="p-4">
        <CCardBody>
          <h4>{activeSection}</h4>
          <CRow>
            <CCol md={12}>
              <CFormLabel htmlFor="contentEditor">Add & update {activeSection.toLowerCase()}</CFormLabel>
              <ReactQuill
                value={contentData[activeSection]}
                onChange={handleDescriptionChange}
                placeholder={`Enter ${activeSection.toLowerCase()} content`}
              />
            </CCol>
          </CRow>
          <CButton color="success" className="mt-3" onClick={saveContent}>Save Content</CButton>
        </CCardBody>
      </CCard>
    </CContainer>
  );
};

export default StaticContentManagement;
