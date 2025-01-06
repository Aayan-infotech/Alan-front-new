import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CButton,
  CRow,
  CCol,
  CBadge,
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import './DimensionsProduct.css';

const DimensionFormSection = ({
  sectionName,
  options,
  displayData,
  handleInputChange,
  handleAddData,
  handleDeleteData,
  addSuccessMessage,
  formData,
}) => (
  <CCard className="mb-4 shadow-sm custom-card">
    <CCardHeader className="custom-card-header">
      <h5 className="text-primary">Add {sectionName}</h5>
    </CCardHeader>
    <CCardBody>
      <CForm>
        <CFormLabel className="custom-label">{sectionName}</CFormLabel>
        <CFormSelect
          onChange={(e) => handleInputChange(e, sectionName)}
          value={formData[sectionName] || ''}
          className="custom-select"
        >
          <option value="">Select {sectionName}</option>
          {options.map((opt, index) => (
            <option key={index} value={opt}>
              {opt}
            </option>
          ))}
        </CFormSelect>

        <CFormLabel className="custom-label">Entry %</CFormLabel>
        <CFormInput
          type="number"
          onChange={(e) => handleInputChange(e, `${sectionName}Percentage`)}
          value={formData[`${sectionName}Percentage`] || ''}
          className="custom-input"
        />

        <div className="text-center">
          <CButton
            color="primary"
            className="btn-add mt-3"
            onClick={() => handleAddData(sectionName)}
            disabled={!formData[sectionName] || !formData[`${sectionName}Percentage`]}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add
          </CButton>
        </div>

        {addSuccessMessage && (
          <div className="mt-3 text-center text-success">
            <FontAwesomeIcon icon={faCheckCircle} className="mr-2" /> Data added successfully!
          </div>
        )}

        <div className="mt-4">
          {displayData.length === 0 ? (
            <p className="text-muted text-center">No data added yet.</p>
          ) : (
            displayData.map((data, index) => (
              <CRow key={index} className="align-items-center custom-row">
                <CCol>
                  {data[sectionName]} - {data.value}
                </CCol>
                <CCol>
                  {/* <CBadge color="info">{new Date(data.timestamp).toLocaleString()}</CBadge> */}
                </CCol>
                <CCol>
                  <CButton
                    color="danger"
                    className="btn-delete"
                    onClick={() => handleDeleteData(sectionName, data._id, index)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </CButton>
                </CCol>
              </CRow>
            ))
          )}
        </div>
      </CForm>
    </CCardBody>
  </CCard>
);

const DimensionsProduct = () => {
  const location = useLocation();
  const { Product_id } = location.state || {}; // Retrieve Product_id from state

  const [formData, setFormData] = useState({});
  // const [displayData, setDisplayData] = useState({});
  const [displayData, setDisplayData] = useState({
    Grid: [],
    Fin: [],
    Color: [],
    Tampering: [],
    installation: [],
    Lock: [],
    GlassType: [],
    panelSpacing: [],
    sideWindowOpens: [],
  });
  
  const [addSuccessMessage, setAddSuccessMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const sectionOptions = {
    Grid: ['No Grid', 'Flat Grid', 'Prairie'],
    Fin: ['Dual Wall', 'Nail Fin', 'No Fin'],
    Color: ['White', 'Almond'],
    Tampering: ['Yes', 'No'],
    installation: ['Yes', 'No'],
    Lock: ['Standard', 'Advanced Lock'],
    GlassType: ['Tempered', 'Double Glazed'],
    PanelSpacing: ['Wide', 'Narrow'],
    SideWindowOpens: ['Left', 'Right'],
  };

  const apiEndpoints = {
    Grid: 'dimsGrid',
    Fin: 'dimsFin',
    Color: 'dimsColor',
    Tampering: 'dimsTamper',
    installation: 'dimsInst',
    Lock: 'dimsLock',
    GlassType: 'dimsGType',
    PanelSpacing: 'dimsPSpacing',
    SideWindowOpens: 'dimsSWinOpens',
  };

  // useEffect(() => {
  //   const fetchAllData = async () => {
  //     setIsLoading(true);
  //     const newDisplayData = {};
  //     for (const [section, api] of Object.entries(apiEndpoints)) {
  //       try {
  //         const res = await fetch(`http://44.196.64.110:7878/api/${api}`);
  //         const data = await res.json();
  //         newDisplayData[section] = data || [];
  //       } catch (error) {
  //         console.error(`Error fetching ${section} data:`, error);
  //       }
  //     }
  //     setDisplayData(newDisplayData);
  //     setIsLoading(false);
  //   };
  //   fetchAllData();
  // }, []);

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      const newDisplayData = {};
  
      // Loop through all API endpoints
      for (const [section, api] of Object.entries(apiEndpoints)) {
        try {
          // Fetch data for each section
          const res = await fetch(`http://44.196.64.110:7878/api/dims/type/${section}/ProductID/${Product_id}`);
          
          // Check if response is ok (status 200-299)
          if (!res.ok) {
            throw new Error(`Failed to fetch ${section} data. Status: ${res.status}`);
          }
  
          const data = await res.json();
  
          // Store data in newDisplayData object
          newDisplayData[section] = data || [];
        } catch (error) {
          // Log any error that occurs during fetching
          console.error(`Error fetching ${section} data:`, error);
          // Optionally, store an error message or empty array in case of failure
          newDisplayData[section] = [];  // Or you can store an error message
        }
      }
  
      // Set the state with the new data
      setDisplayData(newDisplayData);
      setIsLoading(false);
    };
  
    fetchAllData();
  }, [Product_id]);  
  

  const handleInputChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleAddData = async (section) => {
    const payload = {
      Product_id, 
      [section]: formData[section],
      value: formData[`${section}Percentage`],
      // timestamp: new Date(),
    };
    console.log(payload); // Log the payload

    try {
      const res = await fetch(`http://44.196.64.110:7878/api/${apiEndpoints[section]}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      setDisplayData({
        ...displayData,
        [section]: [...(displayData[section] || []), result],
      });

      setAddSuccessMessage(true);
      setTimeout(() => setAddSuccessMessage(false), 2000);
      setFormData({ ...formData, [section]: '', [`${section}Percentage`]: '' });
    } catch (error) {
      console.error(`Error adding ${section} data:`, error);
    }
  };

  const handleDeleteData = async (section, id, index) => {
    try {
      await fetch(`http://44.196.64.110:7878/api/${apiEndpoints[section]}/${id}`, { method: 'DELETE' });

      const updatedData = (displayData[section] || []).filter((_, i) => i !== index);
      setDisplayData({ ...displayData, [section]: updatedData });
    } catch (error) {
      console.error(`Error deleting ${section} data:`, error);
    }
  };

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Dimensions Product</h1>
      {Object.keys(sectionOptions).map((section) => (
        <DimensionFormSection
          key={section}
          sectionName={section}
          options={sectionOptions[section]}
          displayData={displayData[section] || []}
          handleInputChange={handleInputChange}
          handleAddData={handleAddData}
          handleDeleteData={handleDeleteData}
          addSuccessMessage={addSuccessMessage}
          formData={formData}
        />
      ))}
    </div>
  );
};

export default DimensionsProduct;
