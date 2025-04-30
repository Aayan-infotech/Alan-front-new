import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CCard, CCardHeader, CCardBody, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
  CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilShortText } from '@coreui/icons';
import './ManageOrders.css';

const CancelledOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);
  const [showPaymentDetailsModal, setShowPaymentDetailsModal] = useState(false);

 //fetch all and filter cancelled 

  useEffect(() => {
    axios.get('https://www.discountdoorandwindow.com/api/FnalCustData/getAllCustData')
      .then(response => {
        const cancelled = response.data.filter(order => order.orderStatus === 'Cancelled');
        setOrders(cancelled);
      })
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  const handleOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetailsModal(true);
  };

  const handlePaymentDetails = (order) => {
    if (!order.paymentId || !order.paidAmount) {
      alert("No payment details available for this order.");
      return;
    }
    setSelectedOrder({ ...order });
    setShowPaymentDetailsModal(true);
  };

  return (
    <>
      <CCard className="order-card">
        <CCardHeader className="order-card-header">Cancelled Orders</CCardHeader>
        <CCardBody>
          <CTable hover responsive className="order-table">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>#</CTableHeaderCell>
                <CTableHeaderCell>Order ID</CTableHeaderCell>
                <CTableHeaderCell>Customer Name</CTableHeaderCell>
                <CTableHeaderCell>Order Date</CTableHeaderCell>
                <CTableHeaderCell>Order Details</CTableHeaderCell>
                <CTableHeaderCell>Payment Status</CTableHeaderCell>
                <CTableHeaderCell>Payment Details</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {orders.map((order, index) => (
                <CTableRow key={order.order_id} className="order-row">
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell>{order.order_id}</CTableDataCell>
                  <CTableDataCell>{order.customerName}</CTableDataCell>
                  <CTableDataCell>{new Date(order.date).toLocaleDateString()}</CTableDataCell>
                  <CTableDataCell>
                    <div className="action-icon" onClick={() => handleOrderDetails(order)}>
                      <CIcon icon={cilShortText} /> View
                    </div>
                  </CTableDataCell>
                  <CTableDataCell>{order.paymentStatus}</CTableDataCell>
                  <CTableDataCell>
                    <div className="action-icon" onClick={() => handlePaymentDetails(order)}>
                      <CIcon icon={cilShortText} /> View
                    </div>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {selectedOrder && (
        <CModal visible={showOrderDetailsModal} onClose={() => setShowOrderDetailsModal(false)} size="xl">
          <CModalHeader>
            <CModalTitle>Order Details</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CTable bordered>
              <CTableBody>
                <CTableRow>
                  <CTableHeaderCell style={{ width: '25%', color: 'red' }}>Order ID</CTableHeaderCell>
                  <CTableDataCell style={{ width: '25%' }}>{selectedOrder.order_id}</CTableDataCell>
                  <CTableHeaderCell style={{ width: '25%', color: 'red' }}>Order Date</CTableHeaderCell>
                  <CTableDataCell style={{ width: '25%' }}>
                    {new Date(selectedOrder.date).toLocaleDateString()}
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell style={{ color: 'red' }}>Product</CTableHeaderCell>
                  <CTableDataCell colSpan={3}>{selectedOrder.productName}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell style={{ color: 'red', height: '100px' }}>Product Details</CTableHeaderCell>
                  <CTableDataCell colSpan={3} style={{ verticalAlign: 'top' }}>
                    {selectedOrder.selectedOptions &&
                      Object.entries(selectedOrder.selectedOptions).map(([key, value]) => (
                        <li key={key}><strong>{key}:</strong> {value}</li>
                      ))}
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell style={{ color: 'red' }}>Product Value</CTableHeaderCell>
                  <CTableDataCell colSpan={3}>
                    <div className="text-end">
                      {`USD ${selectedOrder.totalPrice}/-`}
                    </div>
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setShowOrderDetailsModal(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      )}

      {selectedOrder && showPaymentDetailsModal && (
        <CModal visible={showPaymentDetailsModal} onClose={() => setShowPaymentDetailsModal(false)} size="xl">
          <CModalHeader>
            <CModalTitle>Payment Details</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CTable bordered>
              <CTableBody>
                <CTableRow>
                  <CTableHeaderCell
                    rowSpan={5}
                    className="fw-bold text-success text-center align-middle"
                    style={{ verticalAlign: "middle" }}
                  >
                    Payment
                  </CTableHeaderCell>
                  <CTableHeaderCell className="fw-bold">Transaction ID</CTableHeaderCell>
                  <CTableDataCell>{selectedOrder.paymentId}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell className="fw-bold">Transaction Date</CTableHeaderCell>
                  <CTableDataCell>
                    {new Date(selectedOrder.date).toLocaleDateString()}
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell className="fw-bold">Transaction Status</CTableHeaderCell>
                  <CTableDataCell>{selectedOrder.paymentStatus}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell className="fw-bold">Transaction Amount</CTableHeaderCell>
                  <CTableDataCell>USD {selectedOrder.paidAmount}/-</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setShowPaymentDetailsModal(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      )}
    </>
  );
};

export default CancelledOrders;
