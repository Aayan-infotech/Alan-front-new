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

// const DimensionFormSection = ({
//   sectionName,
//   options,
//   displayData,
//   handleInputChange,
//   handleAddData,
//   handleDeleteData,
//   addSuccessMessage,
//   formData,
// }) => (

//   <CCard className="mb-4 shadow-sm custom-card">
//     <CCardHeader className="custom-card-header">
//       <h5 className="text-primary">Add {sectionName}</h5>
//     </CCardHeader>
//     <CCardBody>
//       <CForm>
//         <CFormLabel className="custom-label">{sectionName}</CFormLabel>
//         <CFormSelect
//           onChange={(e) => handleInputChange(e, sectionName)}
//           value={formData[sectionName] || ''}
//           className="custom-select"
//         >
//           <option value="">Select {sectionName}</option>
//           {options.map((opt, index) => (
//             <option key={index} value={opt}>
//               {opt}
//             </option>
//           ))}
//         </CFormSelect>

//         {/* Show Amount for widthHeight   only */}
//         {sectionName === 'widthHeight' && (
//           <>
//             <CFormLabel className="custom-label">Amount</CFormLabel>
//             <CFormInput
//               type="number"
//               onChange={(e) => handleInputChange(e, 'amount')}
//               value={formData.amount || ''}
//               className="custom-input"
//             />
//           </>
//         )}

//         {/* Show Entry % for other sections */}
//         {sectionName !== 'widthHeight' && (
//           <>
//             <CFormLabel className="custom-label">Entry %</CFormLabel>
//             <CFormInput
//               type="number"
//               onChange={(e) => handleInputChange(e, `${sectionName}Percentage`)}
//               value={formData[`${sectionName}Percentage`] || ''}
//               className="custom-input"
//             />
//           </>
//         )}

//         <div className="text-center">
//           <CButton
//             color="primary"
//             className="btn-add mt-3"
//             onClick={() => handleAddData(sectionName)}
//             disabled={
//               !formData[sectionName] || (sectionName !== 'widthHeight' && !formData[`${sectionName}Percentage`]) || (sectionName === 'widthHeight' && !formData.amount)
//             }
//           >
//             <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add
//           </CButton>
//         </div>

//         {addSuccessMessage && (
//           <div className="mt-3 text-center text-success">
//             <FontAwesomeIcon icon={faCheckCircle} className="mr-2" /> Data added successfully!
//           </div>
//         )}

//         <div className="mt-4">
//           {displayData.length === 0 ? (
//             <p className="text-muted text-center">No data added yet.</p>
//           ) : (
//             displayData.map((data, index) => (
//               <CRow key={index} className="align-items-center custom-row">
//                 <CCol>
//                   {/* For widthHeight, show Amount if value is null */}
//                   {sectionName === 'widthHeight' ? (
//                     <>
//                       <strong>{data.widthHeight}</strong> -{' '}
//                       {data.value === null || data.value === '' ? (
//                         // Show amount if value is null or empty
//                         <span><strong>Amount:</strong> {data.amount}</span>
//                       ) : (
//                         // Otherwise show value
//                         <span><strong>Value:</strong> {data.value}</span>
//                       )}
//                     </>
//                   ) : (
//                     // For other sections, show the regular data
//                     <>
//                       {data[sectionName]} - {data.value}
//                     </>
//                   )}
//                 </CCol>
//                 <CCol>
//                   {/* Optional: you can add a badge or any other metadata here */}
//                 </CCol>
//                 <CCol>
//                   <CButton
//                     color="danger"
//                     className="btn-delete"
//                     onClick={() => handleDeleteData(sectionName, data._id, index)}
//                   >
//                     <FontAwesomeIcon icon={faTrash} />
//                   </CButton>
//                 </CCol>
//               </CRow>
//             ))
//           )}
//         </div>
//       </CForm>
//     </CCardBody>
//   </CCard>

// );

const DimensionFormSection = ({
  sectionName,
  options,
  displayData,
  handleInputChange,
  handleAddData,
  handleDeleteData,
  addSuccessMessage,
  formData,
}) => {
  // Function to format section names for display
  const formatSectionName = (name) => {
    if (name === 'widthHeight') return 'Width X Height Y';
    return name;
  };

  // Format value for display (replace * with X for widthHeight)
  const formatValue = (value) => {
    if (sectionName === 'widthHeight' && value) {
      return value.split('*').join(' X ');
    }
    return value;
  };

  return (
    <CCard className="mb-4 shadow-sm custom-card">
      <CCardHeader className="custom-card-header">
        <h5 className="text-primary">Add {formatSectionName(sectionName)}</h5>
      </CCardHeader>
      <CCardBody>
        <CForm>
          <CFormLabel className="custom-label">{formatSectionName(sectionName)}</CFormLabel>
          <CFormInput
            type="text"
            onChange={(e) => handleInputChange(e, sectionName)}
            value={formData[sectionName] || ''}
            placeholder={`Enter ${formatSectionName(sectionName)}`}
            className="custom-input"
          />

          {/* Show Amount for widthHeight only */}
          {sectionName === 'widthHeight' && (
            <>
              <CFormLabel className="custom-label">Amount</CFormLabel>
              <CFormInput
                type="number"
                onChange={(e) => handleInputChange(e, 'amount')}
                value={formData.amount || ''}
                className="custom-input"
              />
            </>
          )}

          {/* Show Entry % for other sections */}
          {sectionName !== 'widthHeight' && (
            <>
              <CFormLabel className="custom-label">Entry %</CFormLabel>
              <CFormInput
                type="number"
                onChange={(e) => handleInputChange(e, `${sectionName}Percentage`)}
                value={formData[`${sectionName}Percentage`] || ''}
                className="custom-input"
              />
            </>
          )}

          <div className="text-center">
            <CButton
              color="primary"
              className="btn-add mt-3"
              onClick={() => handleAddData(sectionName)}
              disabled={
                !formData[sectionName] ||
                (sectionName !== 'widthHeight' && !formData[`${sectionName}Percentage`]) ||
                (sectionName === 'widthHeight' && !formData.amount)
              }
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
                    {sectionName === 'widthHeight' ? (
                      <>
                        <strong>{formatValue(data.widthHeight)}</strong> -{' '}
                        {data.value === null || data.value === '' ? (
                          <span><strong>Amount:</strong> {data.amount}</span>
                        ) : (
                          <span><strong>Value:</strong> {data.value}</span>
                        )}
                      </>
                    ) : (
                      <>
                        {data[sectionName]} - {data.value}
                      </>
                    )}
                  </CCol>
                  <CCol />
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
};

const DimensionsProduct = () => {
  const location = useLocation();
  const { Product_id } = location.state || {}; // Retrieve Product_id from state

  const [formData, setFormData] = useState({});
  // const [displayData, setDisplayData] = useState({});
  const [displayData, setDisplayData] = useState({
    widthHeight: [],
    Grid: [],
    Fin: [],
    Color: [],
    TemperingOption: [],
    installation: [],
    Lock: [],
    GlassType: [],
    panelSpacing: [],
    sideWindowOpens: [],
  });

  const [addSuccessMessage, setAddSuccessMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const sectionOptions = {
    widthHeight: ['22*5', '4*6', '7*7', '7*5', '7*8', '3*7'],
    Grid: ['No Grid', 'Flat grid Between the glass'],
    Fin: ['Dual Wall Integral Flush Fin', 'Nail Fin', 'No Fin'],
    Color: ['White', 'Almond','Bronze','Black','AC Black'],
    TemperingOption: ['Yes', 'No'],
    installation: ['Yes', 'No'],
    Lock: ['Auto Lock', 'Cam Lock'],
    GlassType: ['Obscure', 'No Obscure'],
    PanelSpacing: ['panel Spacing 1/4-1/2-1/4', 'panel Spacing 1/3-1/3-1/3'],
    SideWindowOpens: ['XO', 'OX'],
  };


  const apiEndpoints = {
    widthHeight: 'dimsWH',
    Grid: 'dimsGrid',
    Fin: 'dimsFin',
    Color: 'dimsColor',
    TemperingOption: 'dimsTamper',
    installation: 'dimsInst',
    Lock: 'dimsLock',
    GlassType: 'dimsGType',
    PanelSpacing: 'dimsPSpacing',
    SideWindowOpens: 'dimsSWinOpens',
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      const newDisplayData = {};

      // Loop through all API endpoints
      for (const [section, api] of Object.entries(apiEndpoints)) {
        try {
          // Fetch data for each section
          const res = await fetch(`https://www.discountdoorandwindow.com/api/dims/type/${section}/ProductID/${Product_id}`);

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
    // Add amount only if the section is "widthHeight  "
    if (section === 'widthHeight') {
      payload.amount = formData.amount; // Only for widthHeight   section
    }

    console.log(payload); // Log the payload to see what will be sent
    console.log(payload); // Log the payload

    try {
      const res = await fetch(`https://www.discountdoorandwindow.com/api/${apiEndpoints[section]}`, {
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
      setFormData({ ...formData, [section]: '', [`${section}Percentage`]: '', amount: '' });
    } catch (error) {
      console.error(`Error adding ${section} data:`, error);
    }
  };

  const handleDeleteData = async (section, id, index) => {
    try {
      await fetch(`https://www.discountdoorandwindow.com/api/${apiEndpoints[section]}/${id}`, { method: 'DELETE' });

      const updatedData = (displayData[section] || []).filter((_, i) => i !== index);
      setDisplayData({ ...displayData, [section]: updatedData });
    } catch (error) {
      console.error(`Error deleting ${section} data:`, error);
    }
  };

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }
  const fetchAllData = async () => {
    setIsLoading(true);
    const newDisplayData = {};

    for (const [section, api] of Object.entries(apiEndpoints)) {
      try {
        const res = await fetch(`https://www.discountdoorandwindow.com/api/${api}`);
        const data = await res.json();

        // Special handling for widthHeight   if value is not included
        if (section === 'widthHeight') {
          newDisplayData[section] = data.map(item => ({
            ...item,
            value: item.value || 'N/A', // Handle missing value gracefully
          }));
        } else {
          newDisplayData[section] = data || [];
        }
      } catch (error) {
        console.error(`Error fetching ${section} data:`, error);
        newDisplayData[section] = [];
      }
    }
    setDisplayData(newDisplayData);
    setIsLoading(false);
  };

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
