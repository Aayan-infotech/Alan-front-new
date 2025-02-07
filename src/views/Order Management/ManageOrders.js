import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CCard, CCardHeader, CCardBody, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
  CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton, CFormInput, CFormSelect, CFormTextarea
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilShortText, cilPencil } from '@coreui/icons';
import './ManageOrders.css';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showEditOrderModal, setShowEditOrderModal] = useState(false);
  const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);
  const [showPaymentDetailsModal, setShowPaymentDetailsModal] = useState(false);

  useEffect(() => {
    axios.get('http://44.196.64.110:7878/api/FnalCustData/getAllCustData')
      .then(response => {
        setOrders(response.data);
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

 
  const handleEditOrder = (order) => {
    setSelectedOrder({ ...order });
    setShowEditOrderModal(true);
  };

  const handleUpdateOrderStatus = async () => {
    if (!selectedOrder) return;
    try {
      await axios.put(`http://localhost:7878/api/FnalCustData/editFinalOrder/${selectedOrder.id}`, {
        orderStatus: selectedOrder.orderStatus,
      });
      setOrders((prevOrders) => prevOrders.map((order) => 
        order.order_id === selectedOrder.order_id ? { ...order, orderStatus: selectedOrder.orderStatus } : order
      ));
      setShowEditOrderModal(false);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <>
      <CCard className="order-card">
        <CCardHeader className="order-card-header">Order List</CCardHeader>
        <CCardBody>
          <CTable hover responsive className="order-table">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>#</CTableHeaderCell>
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
                <CTableRow key={order.order_id} className="order-row">
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell>{order.order_id}</CTableDataCell>
                  <CTableDataCell>{order.customerName}</CTableDataCell>
                  <CTableDataCell>{order.orderStatus}</CTableDataCell>
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
                  <CTableDataCell>
                    <div className="action-icons">
                      <div className="action-icon edit-icon" onClick={() => handleEditOrder(order)}>
                        <CIcon icon={cilPencil} />
                      </div>
                    </div>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {/* Order Details Modal */}
      {selectedOrder && (
        <CModal visible={showOrderDetailsModal} onClose={() => setShowOrderDetailsModal(false)}>
          <CModalHeader>
            <CModalTitle>Order Details</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>Order ID: {selectedOrder.order_id}</p>
            <p>Product Name: {selectedOrder.productName}</p>
            <p>Product Price: {selectedOrder.product_price}</p>
            <p>Total Price: {selectedOrder.totalPrice}</p>
            <p>Product SKU: {selectedOrder.productSku}</p>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setShowOrderDetailsModal(false)}>Close</CButton>
          </CModalFooter>
        </CModal>
      )}
      {/* Payment Details Modal */}
      {selectedOrder && showPaymentDetailsModal && (
        <CModal visible={showPaymentDetailsModal} onClose={() => setShowPaymentDetailsModal(false)}>
          <CModalHeader>
            <CModalTitle>Payment Details</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>Payment ID: {selectedOrder.paymentId}</p>
            <p>Payment Status: {selectedOrder.paymentStatus}</p>
            <p>Quantity: {selectedOrder.quantity}</p>
            <p>Paid Amount: {selectedOrder.paidAmount}</p>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setShowPaymentDetailsModal(false)}>Close</CButton>
          </CModalFooter>
        </CModal>
      )}
       {/* Edit Order Modal */}
     {/* Edit Order Modal */}
     {selectedOrder && showEditOrderModal && (
        <CModal visible={showEditOrderModal} onClose={() => setShowEditOrderModal(false)}>
          <CModalHeader>
            <CModalTitle>Edit Order</CModalTitle>
          </CModalHeader>
          <CModalBody className='row gy-4'>
            <div className="form-group col-4">
              <label>Order ID</label>
              <CFormInput type="text" value={selectedOrder.order_id} readOnly />
            </div>
            <div className="form-group col-4">
              <label>Order Status</label>
              <CFormSelect 
                value={selectedOrder.orderStatus} 
                onChange={(e) => setSelectedOrder({ ...selectedOrder, orderStatus: e.target.value })}>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </CFormSelect>
            </div>
            <div className="form-group mt-3">
              <label>Billing Address</label>
              <p>{selectedOrder.customerName}</p>
              <p>{selectedOrder.customerEmail}</p>
              <p>{selectedOrder.customerMobile}</p>
              <p>{selectedOrder.customerAddress}</p>
              <p>{selectedOrder.customerState}</p>
              <p>{selectedOrder.customerZipCode}</p>
              <p>{selectedOrder.customerCountry}</p>
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={handleUpdateOrderStatus}>Save Changes</CButton>
            <CButton color="secondary" onClick={() => setShowEditOrderModal(false)}>Close</CButton>
          </CModalFooter>
        </CModal>
      )}
    </>
  );
};

export default ManageOrders;







 {/* Edit Order Modal */}
//  {selectedOrder && showEditOrderModal && (
//   <CModal visible={showEditOrderModal} onClose={() => setShowEditOrderModal(false)}>
//     <CModalHeader>
//       <CModalTitle>Edit Order</CModalTitle>
//     </CModalHeader>
//     <CModalBody className='row gy-4'>
//       <div className="form-group col-4">
//         <label>Order ID</label>
//         <CFormInput type="text" value={selectedOrder.order_id} readOnly />
//       </div>
//       <div className="form-group col-4">
//         <label>Order Date</label>
//         <CFormInput type="date" value={selectedOrder.date} readOnly />
//       </div>
//       <div className="form-group col-4">
//         <label>Order Status</label>
//         <CFormSelect value={selectedOrder.orderStatus} disabled>
//           <option value="Pending">Pending</option>
//           <option value="Processing">Processing</option>
//           <option value="Shipped">Shipped</option>
//           <option value="Delivered">Delivered</option>
//           <option value="Cancelled">Cancelled</option>
//         </CFormSelect>
//       </div>
//       <div className="form-group mt-3">
//         <label>Order Summary</label>
//         <CFormTextarea rows={3} value={selectedOrder.orderSummary || ""} readOnly />
//       </div>
//       <div className="form-group mt-3">
//         <label>Billing Address</label>
//         <CFormTextarea rows={3} value={selectedOrder.orderSummary || ""} readOnly />
//       </div>
//       <div className="form-group mt-3">
//         <label>Shipping Details</label>
//         <CFormTextarea rows={3} value={selectedOrder.shippingDetails || ""} readOnly />
//       </div>
//     </CModalBody>
//     <CModalFooter>
//       <CButton color="secondary" onClick={() => setShowEditOrderModal(false)}>Close</CButton>
//     </CModalFooter>
//   </CModal>
// )}