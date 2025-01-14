import React, { useState } from 'react';
import {
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormSelect,
} from '@coreui/react';
import { cilTrash, cilPencil, cilList } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import './ManageOrders.css'; // Importing custom CSS

const ManageOrders = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customerName: 'John Doe',
      customerEmail: 'john.doe@example.com',
      orderStatus: 'Shipped',
      orderDate: '2025-01-10',
      product: 'Laptop',
      productDetails: 'Dell Inspiron 15',
      productValue: 800,
      payment: 'Paid',
      transactionId: '123456789',
      paymentDate: '2025-01-09',
      paymentStatus: 'Completed',
      amount: 800,
      transactionMode: 'Credit Card',
    },
    
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);
  const [showPaymentDetailsModal, setShowPaymentDetailsModal] = useState(false);
  const [showCustomerDetailsModal, setShowCustomerDetailsModal] = useState(false);

  const [orderStatus, setOrderStatus] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetailsModal(true);
  };

  const handleViewPaymentDetails = (order) => {
    setSelectedOrder(order);
    setShowPaymentDetailsModal(true);
  };

  const handleViewCustomerDetails = (order) => {
    setSelectedOrder(order);
    setShowCustomerDetailsModal(true);
  };

  const handleOrderStatusChange = (e) => {
    setOrderStatus(e.target.value);
  };

  const handlePaymentStatusChange = (e) => {
    setPaymentStatus(e.target.value);
  };

  const handleDeleteOrder = (orderId) => {
    const newOrders = orders.filter((order) => order.id !== orderId);
    setOrders(newOrders);
  };

  const handleEditOrder = (order) => {
    console.log('Editing order: ', order);
  };

  return (
    <>
      {/* <h1 className="header-title">Manage Orders</h1> */}
      <CCard>
        <CCardHeader className="order-card-header">Order List</CCardHeader>
        <CCardBody>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Sr. No</CTableHeaderCell>
                <CTableHeaderCell>Order ID</CTableHeaderCell>
                <CTableHeaderCell>Customer Name</CTableHeaderCell>
                <CTableHeaderCell>Order Status</CTableHeaderCell>
                <CTableHeaderCell>Order Date</CTableHeaderCell>
                <CTableHeaderCell>Order Details</CTableHeaderCell>
                <CTableHeaderCell>Payment Status</CTableHeaderCell>
                <CTableHeaderCell>Payment Details</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {orders.map((order, index) => (
                <CTableRow key={order.id}>
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell>{order.id}</CTableDataCell>
                  <CTableDataCell>
                    <CButton color="link" onClick={() => handleViewCustomerDetails(order)}>
                      <CIcon icon={cilList} /> {order.customerName}
                    </CButton>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormSelect
                      className={`custom-dropdown ${orderStatus === order.orderStatus ? 'selected' : ''}`}
                      value={orderStatus || order.orderStatus}
                      onChange={handleOrderStatusChange}
                    >
                      <option value="Placed">Placed</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Returned">Returned</option>
                    </CFormSelect>
                  </CTableDataCell>
                  <CTableDataCell>{order.orderDate}</CTableDataCell>
                  <CTableDataCell>
                    <CButton color="link" onClick={() => handleViewOrderDetails(order)}>
                      <CIcon icon={cilList} /> View
                    </CButton>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormSelect
                      className={`custom-dropdown ${paymentStatus === order.paymentStatus ? 'selected' : ''}`}
                      value={paymentStatus || order.paymentStatus}
                      onChange={handlePaymentStatusChange}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Successful">Successful</option>
                      <option value="Failed">Failed</option>
                      <option value="Refunded">Refunded</option>
                    </CFormSelect>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton color="link" onClick={() => handleViewPaymentDetails(order)}>
                      <CIcon icon={cilList} /> View
                    </CButton>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div className="action-buttons">
                      <CButton className="btn-icon" color="warning" onClick={() => handleEditOrder(order)}>
                        <CIcon icon={cilPencil} />
                      </CButton>
                      <CButton className="btn-icon" color="danger" onClick={() => handleDeleteOrder(order.id)}>
                        <CIcon icon={cilTrash} />
                      </CButton>
                    </div>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {/* Modals for details (Order, Payment, Customer) */}
      {selectedOrder && (
        <CModal visible={showOrderDetailsModal} onClose={() => setShowOrderDetailsModal(false)}>
          <CModalHeader>
            <CModalTitle>Order Details</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>Order ID: {selectedOrder.id}</p>
            <p>Order Date: {selectedOrder.orderDate}</p>
            <p>Product: {selectedOrder.product}</p>
            <p>Product Details: {selectedOrder.productDetails}</p>
            <p>Product Price: ${selectedOrder.productValue}</p>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setShowOrderDetailsModal(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      )}

      {selectedOrder && (
        <CModal visible={showPaymentDetailsModal} onClose={() => setShowPaymentDetailsModal(false)}>
          <CModalHeader>
            <CModalTitle>Payment Details</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>Payment: {selectedOrder.payment}</p>
            <p>Transaction ID: {selectedOrder.transactionId}</p>
            <p>Date: {selectedOrder.paymentDate}</p>
            <p>Status: {selectedOrder.paymentStatus}</p>
            <p>Amount: ${selectedOrder.amount}</p>
            <p>Transaction Mode: {selectedOrder.transactionMode}</p>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setShowPaymentDetailsModal(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      )}

      {selectedOrder && (
        <CModal visible={showCustomerDetailsModal} onClose={() => setShowCustomerDetailsModal(false)}>
          <CModalHeader>
            <CModalTitle>Customer Details</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>Name: {selectedOrder.customerName}</p>
            <p>Email: {selectedOrder.customerEmail}</p>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setShowCustomerDetailsModal(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      )}
    </>
  );
};

export default ManageOrders;
