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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:7878/api/updatePrices/getAllPriceAdjustments');
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
      <CContainer className="d-flex justify-content-center align-items-center vh-100">
        <CSpinner color="primary" />
      </CContainer>
    );
  }

  if (error) {
    return (
      <CContainer className="mt-4">
        <CAlert color="danger" className="text-center">
          <FontAwesomeIcon icon={faExclamationTriangle} /> {error}
        </CAlert>
      </CContainer>
    );
  }

  return (
    <CContainer className="mt-5">
      <CCard className="shadow-lg">
        <CCardHeader className="bg-primary text-white text-center">
          <h4>Price Adjustment History</h4>
        </CCardHeader>
        <CCardBody>
          <CTable striped bordered hover responsive className="table table-sm text-center">
            <thead className="table-dark">
              <tr>
                <th>index</th>
                <th>Date & Time</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Sub Sub Category</th>
                <th>Update Percent</th>
                <th>Price Adjustment</th>
              </tr>
            </thead>
            <tbody>
              {priceAdjustments.map((adjustment, index) => (
                <tr key={adjustment._id}>
                  <td>{index + 1}</td>
                  <td>{new Date(adjustment.date).toLocaleString()}</td>
                  <td>{adjustment.category_name || 'N/A'}</td>
                  <td>{adjustment.sub_category_name || 'N/A'}</td>
                  <td>{adjustment.sub_sub_category_name || 'N/A'}</td>
                  <td>{adjustment.updatePercent}%</td>
                  <td>{adjustment.PriceAdjustment}</td>
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