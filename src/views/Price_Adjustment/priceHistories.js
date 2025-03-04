import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CContainer,
  CCard,
  CCardHeader,
  CCardBody,
  CSpinner,
  CAlert,
  CTable,
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const PriceHistories = () => {
  const [priceAdjustments, setPriceAdjustments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://18.221.196.222:7878/api/updatePrices/getAllPriceAdjustments');
        setPriceAdjustments(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <CContainer className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <CSpinner color="primary" />
      </CContainer>
    );
  }

  if (error) {
    return (
      <CContainer>
        <CAlert color="danger">
          <FontAwesomeIcon icon={faExclamationTriangle} /> {error}
        </CAlert>
      </CContainer>
    );
  }

  return (
    <CContainer>
      <CCard>
        <CCardHeader>
          <h4>Price Adjustment History</h4>
        </CCardHeader>
        <CCardBody>
          <CTable striped hover>
            <thead>
              <tr>
                <th scope="col">Index</th>
                <th scope="col">Date</th>
                <th scope="col">Category ID</th>
                <th scope="col">Sub Category ID</th>
                <th scope="col">Sub Sub Category ID</th>
                <th scope="col">Update Percent</th>
              </tr>
            </thead>
            <tbody>
              {priceAdjustments.map((adjustment, index) => (
                <tr key={adjustment._id}>
                  <td>{index + 1}</td>
                  <td>{new Date(adjustment.date).toLocaleDateString()}</td>
                  <td>{adjustment.category_id || 'N/A'}</td>
                  <td>{adjustment.sub_category_id || 'N/A'}</td>
                  <td>{adjustment.sub_sub_category_id || 'N/A'}</td>
                  <td>{adjustment.updatePercent}%</td>
                </tr>
              ))}
            </tbody>
          </CTable>
        </CCardBody>
      </CCard>
    </CContainer>
  );
};

export default PriceHistories;
