// import React, { useEffect, useState } from 'react';
// import { useParams ,useLocation } from 'react-router-dom';
// import axios from 'axios';

// const DimensionsProductDoors = () => {
//   const { productId, categoryName } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const location = useLocation();
//   const {productIdfordet}=location.state || [];
  

//   useEffect(() => {
//     const fetchProductData = async () => {
//       try {
//         const response = await axios.get(`http://44.196.64.110:7878/api/products/getProductsbyid/${productIdfordet}`);
//         setProduct(response.data);
//       } catch (err) {
//         setError('Error fetching product data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProductData();
//   }, [productId]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//       <h1>{product.name}</h1>
//       <h2>{categoryName}</h2>
//       <p>{product.Description}</p>
//       <p>Price: ₹{product.price}</p>
//       <p>SKU: {product.sku}</p>
//       <p>Product Formula Added: {product.productFormulaAdded}</p>
//       {/* Render other product details as needed */}
//     </div>
//   );
// };

// export default DimensionsProductDoors;


import React, { useState, useEffect } from 'react';
import {
  CCard,CCardHeader, CCardBody,CForm,CFormLabel,CFormSelect,CFormInput,CFormTextarea,CButton, CRow,CCol,
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

        {sectionName === 'Frame Width and Height' ? (
          <>
            <CFormLabel className="custom-label">Amount</CFormLabel>
            <CFormInput
              type="number"
              onChange={(e) => handleInputChange(e, 'Amount')}
              value={formData.Amount || ''}
              className="custom-input"
            />
          </>
        ) : sectionName === 'Special Instructions, Questions or Comments?' ? (
          <>
            <CFormLabel className="custom-label">{sectionName}</CFormLabel>
            <CFormTextarea
              onChange={(e) => handleInputChange(e, sectionName)}
              value={formData[sectionName] || ''}
              className="custom-input"
            />
          </>
        ) : (
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
              (sectionName !== 'Frame Width and Height' &&
                sectionName !== 'Special Instructions, Questions or Comments?' &&
                !formData[`${sectionName}Percentage`]) ||
              (sectionName === 'Frame Width and Height' && !formData.Amount)
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
                  {sectionName === 'Frame Width and Height' ? (
                    <>
                      <strong>{data[sectionName]}</strong> -{' '}
                      {data.value === null || data.value === '' ? (
                        <span>
                          <strong>Amount:</strong> {data.Amount}
                        </span>
                      ) : (
                        <span>
                          <strong>Value:</strong> {data.value}
                        </span>
                      )}
                    </>
                  ) : sectionName === 'Special Instructions, Questions or Comments?' ? (
                    <>
                      <strong>{data[sectionName]}</strong>
                    </>
                  ) : (
                    <>
                      {data[sectionName]} - {data.value}
                    </>
                  )}
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

const DimensionsProductDoors = () => {
  const location = useLocation();
  const { productIdfordet, categoryName } = location.state || {};
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [displayData, setDisplayData] = useState({});
  const [addSuccessMessage, setAddSuccessMessage] = useState(false);

  const sectionOptions = {
    'Select Pre Hung-Options': ['Option 1', 'Option 2', 'Option 3'],
    'Frame Width and Height': ['Dimension 1', 'Dimension 2', 'Dimension 3'],
    'Select Pre-finishing Options': ['Pre-Finishing 1', 'Pre-Finishing 2'],
    'Select Door Swing Direction': ['Left', 'Right'],
    'Select Frame Options': ['Frame Option 1', 'Frame Option 2'],
    'Peep View': ['Yes', 'No'],
    'Hinge Color': ['Silver', 'Black', 'Bronze'],
    'Sill': ['Sill Option 1', 'Sill Option 2'],
    'Weather Strip Color': ['White', 'Black', 'Gray'],
    'Select Bore Options': ['Bore Option 1', 'Bore Option 2'],
    'For San Diego Residents. For installation in other areas, please contact us.': ['Info'],
    'Side the Window Opens': ['Option A', 'Option B'],
    'Choose Grid Options': ['Grid Option 1', 'Grid Option 2'],
    'Choose Frame Extrusion': ['Extrusion Option 1', 'Extrusion Option 2'],
    'Lock Option': ['Auto Lock', 'Cam Lock'],
    'Color': ['Red', 'Blue', 'Green'],
    'Width of Door Frame': ['100cm', '110cm', '120cm'],
    'Select Door Swing': ['Swing Left', 'Swing Right'],
    'Select Frame Size': ['Small', 'Medium', 'Large'],
    'Select Jamb Size': ['Jamb Option 1', 'Jamb Option 2'],
    'Door Shoe': ['Shoe Option 1', 'Shoe Option 2'],
    'Weatherstrip': ['Option 1', 'Option 2'],
    'Hinges': ['Hinge Option 1', 'Hinge Option 2'],
    'Special Instructions, Questions or Comments?': [],
  };

  useEffect(() => {
    const initData = {};
    Object.keys(sectionOptions).forEach((section) => {
      initData[section] = [];
    });
    setDisplayData(initData);
  }, []);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await axios.get(`http://44.196.64.110:7878`);
        setProduct(res.data);
      } catch (err) {
        console.error('Error fetching product data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductData();
  }, [productIdfordet]);

  const handleInputChange = (e, field) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleAddData = async (section) => {
    const payload = {
      Product_id: productIdfordet,
      [section]: formData[section],
      value: formData[`${section}Percentage`],
    };
    if (section === 'Frame Width and Height') {
      payload.Amount = formData.Amount;
    }
    try {
      const res = await fetch(`http://44.196.64.110:7878`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      setDisplayData((prev) => ({
        ...prev,
        [section]: [...(prev[section] || []), result],
      }));
      setAddSuccessMessage(true);
      setTimeout(() => setAddSuccessMessage(false), 2000);
      setFormData((prev) => ({ ...prev, [section]: '', [`${section}Percentage`]: '', Amount: '' }));
    } catch (error) {
      console.error(`Error adding ${section} data:`, error);
    }
  };

  const handleDeleteData = async (section, id, index) => {
    try {
      await fetch(`http://44.196.64.110:7878`, { method: 'DELETE' });
      const updated = (displayData[section] || []).filter((_, i) => i !== index);
      setDisplayData((prev) => ({ ...prev, [section]: updated }));
    } catch (error) {
      console.error(`Error deleting ${section} data:`, error);
    }
  };

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Door Dimensions</h1>
      {product && (
        <div className="mb-4">
          <h2>{product.name}</h2>
          <h4>{categoryName}</h4>
          <p>{product.Description}</p>
          <p>Price: ₹{product.price}</p>
          <p>SKU: {product.sku}</p>
          <p>Product Formula Added: {product.productFormulaAdded}</p>
        </div>
      )}
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

export default DimensionsProductDoors;

