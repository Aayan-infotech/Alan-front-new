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
    axios.get('http://localhost:7878/api/FnalCustData/getAllCustData')
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
    setSelectedOrder({ ...order }); // Ensure state update is handled correctly
    setShowPaymentDetailsModal(true);
  };

  const handleEditOrder = (order) => {
    setSelectedOrder({ ...order }); // Ensuring state update
    setShowEditOrderModal(true);
  };

  const handleSaveChanges = () => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.order_id === selectedOrder.order_id ? selectedOrder : order
      )
    );
    setShowEditOrderModal(false);
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
            <p><strong>Order ID:</strong> {selectedOrder.order_id}</p>
            <p><strong>Product:</strong> {selectedOrder.productName}</p>
            <p><strong>Amount:</strong> ${selectedOrder.paidAmount}</p>
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
            {selectedOrder.paymentId ? (
              <>
                <p><strong>Transaction ID:</strong> {selectedOrder.paymentId}</p>
                <p><strong>Amount Paid:</strong> ${selectedOrder.paidAmount}</p>
                <p><strong>Status:</strong> {selectedOrder.paymentStatus}</p>
              </>
            ) : (
              <p>No payment details available.</p>
            )}
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setShowPaymentDetailsModal(false)}>Close</CButton>
          </CModalFooter>
        </CModal>
      )}

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
              <label>Order Date</label>
              <CFormInput type="date" value={selectedOrder.date} readOnly />
            </div>
            <div className="form-group col-4">
              <label>Order Status</label>
              <CFormSelect value={selectedOrder.orderStatus} disabled>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </CFormSelect>
            </div>
            <div className="form-group mt-3">
              <label>Order Summary</label>
              <CFormTextarea rows={3} value={selectedOrder.orderSummary || ""} readOnly />
            </div>
            <div className="form-group mt-3">
              <label>Billing Address</label>
              <CFormTextarea rows={3} value={selectedOrder.billingAddress || ""} readOnly />
            </div>
            <div className="form-group mt-3">
              <label>Shipping Details</label>
              <CFormTextarea rows={3} value={selectedOrder.shippingDetails || ""} readOnly />
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setShowEditOrderModal(false)}>Close</CButton>
          </CModalFooter>
        </CModal>
      )}

    </>
  );
};

export default ManageOrders;










// import React, { useState } from 'react';
// import {
//   CCard,
//   CCardHeader,
//   CCardBody,
//   CButton,
//   CTable,
//   CTableHead,
//   CTableRow,
//   CTableHeaderCell,
//   CTableBody,
//   CTableDataCell,
//   CModal,
//   CModalHeader,
//   CModalTitle,
//   CModalBody,
//   CModalFooter,
//   CFormInput,
//   CFormTextarea,
// } from '@coreui/react';
// import { cilTrash, cilPencil, cilShortText } from '@coreui/icons';
// import CIcon from '@coreui/icons-react';
// import { CFormSelect } from '@coreui/react';
// import './ManageOrders.css';

// const ManageOrders = () => {
//   const [orders, setOrders] = useState([

//   ]);

//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [showEditOrderModal, setShowEditOrderModal] = useState(false);
//   const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);
//   const [showPaymentDetailsModal, setShowPaymentDetailsModal] = useState(false);

//   const handleOrderDetails = (order) => {
//     setSelectedOrder(order);
//     setShowOrderDetailsModal(true);
//   };

//   const handlePaymentDetails = (order) => {
//     setSelectedOrder(order);
//     setShowPaymentDetailsModal(true);
//   };

//   const handleEditOrder = (order) => {
//     setSelectedOrder(order);
//     setShowEditOrderModal(true);
//   };

//   const handleDeleteOrder = (orderId) => {
//     const updatedOrders = orders.filter((order) => order.id !== orderId);
//     setOrders(updatedOrders);
//   };

//   const handleSaveChanges = () => {
//     setShowEditOrderModal(false);
//   };

//   return (
//     <>
//       <CCard className="order-card">
//         <CCardHeader className="order-card-header">Order List</CCardHeader>
//         <CCardBody>
//           <CTable hover responsive className="order-table">
//             <CTableHead>
//               <CTableRow>
//                 <CTableHeaderCell>Sr. No</CTableHeaderCell>
//                 <CTableHeaderCell>Order ID</CTableHeaderCell>
//                 <CTableHeaderCell>Customer Name</CTableHeaderCell>
//                 <CTableHeaderCell>Order Status</CTableHeaderCell>
//                 <CTableHeaderCell>Order Date</CTableHeaderCell>
//                 <CTableHeaderCell>Order Details</CTableHeaderCell>
//                 <CTableHeaderCell>Payment Status</CTableHeaderCell>
//                 <CTableHeaderCell>Payment Details</CTableHeaderCell>
//                 <CTableHeaderCell>Actions</CTableHeaderCell>
//               </CTableRow>
//             </CTableHead>
//             <CTableBody>
//               {orders.map((order, index) => (
//                 <CTableRow key={order.id} className="order-row">
//                   <CTableDataCell>{index + 1}</CTableDataCell>
//                   <CTableDataCell>{order.id}</CTableDataCell>
//                   <CTableDataCell>{order.customerName}</CTableDataCell>
//                   <CTableDataCell>{order.orderStatus}</CTableDataCell>
//                   <CTableDataCell>{order.orderDate}</CTableDataCell>
//                   {/* <CTableDataCell>{order.orderSummary}</CTableDataCell> */}
//                   <CTableDataCell>
//                     <div
//                       style={{ color: 'darkgreen' }}
//                       className="action-icon"
//                       onClick={() => handleOrderDetails(order)}
//                     >
//                       <CIcon icon={cilShortText} />
//                       {' '} View details
//                     </div>
//                   </CTableDataCell>
//                   <CTableDataCell>{order.paymentStatus}</CTableDataCell>
//                   <CTableDataCell>
//                     <div
//                       style={{ color: 'darkgreen' }}
//                       className="action-icon"
//                       onClick={() => handlePaymentDetails(order)}

//                     >
//                       <CIcon icon={cilShortText} />
//                       {' '}View details
//                     </div>
//                   </CTableDataCell>
//                   <CTableDataCell>
//                     <div className="action-icons">
//                       <div
//                         className="action-icon edit-icon"
//                         onClick={() => handleEditOrder(order)}
//                       >
//                         <CIcon icon={cilPencil} />
//                       </div>
//                     </div>
//                   </CTableDataCell>
//                 </CTableRow>
//               ))}
//             </CTableBody>
//           </CTable>
//         </CCardBody>
//       </CCard>

//       {selectedOrder && (
//         <CModal
//           visible={showEditOrderModal}
//           onClose={() => setShowEditOrderModal(false)}
//         >
//           <CModalHeader>
//             <CModalTitle>Edit Order</CModalTitle>
//           </CModalHeader>
//           <CModalBody className='row gy-4'>
//             <div className="form-group col-4">
//               <label>Order ID</label>
//               <CFormInput
//                 type="text"
//                 value={selectedOrder.id}
//                 readOnly
//               />
//             </div>
//             <div className="form-group  col-4">
//               <label>Order Date</label>
//               <CFormInput
//                 type="date"
//                 value={selectedOrder.orderDate}
//                 onChange={(e) =>
//                   setSelectedOrder({ ...selectedOrder, orderDate: e.target.value })
//                 }
//               />
//             </div>
//             <div className="form-group  col-4">
//               <label>Order Status</label>
//               <CFormSelect
//                 value={selectedOrder.orderStatus}
//                 onChange={(e) =>
//                   setSelectedOrder({ ...selectedOrder, orderStatus: e.target.value })
//                 }
//               >
//                 <option value="Pending">Pending</option>
//                 <option value="Processing">Processing</option>
//                 <option value="Shipped">Shipped</option>
//                 <option value="Delivered">Delivered</option>
//                 <option value="Cancelled">Cancelled</option>
//               </CFormSelect>
//             </div>
//             <div className="form-group mt-3">
//               <label>Order Summary</label>
//               <CFormTextarea
//                 rows={3}
//                 value={selectedOrder.orderSummary}
//                 onChange={(e) =>
//                   setSelectedOrder({ ...selectedOrder, orderSummary: e.target.value })
//                 }
//               />
//             </div>
//             <div className="form-group mt-3">
//               <label>Billing Address</label>
//               <CFormTextarea
//                 rows={3}
//                 value={selectedOrder.orderSummary}
//                 onChange={(e) =>
//                   setSelectedOrder({ ...selectedOrder, orderSummary: e.target.value })
//                 }
//               />
//             </div>
//             <div className="form-group mt-3">
//               <label>Shipping Details</label>
//               <CFormTextarea
//                 rows={3}
//                 value={selectedOrder.paymentDetails}
//                 onChange={(e) =>
//                   setSelectedOrder({ ...selectedOrder, paymentDetails: e.target.value })
//                 }
//               />
//             </div>
//           </CModalBody>
//           <CModalFooter>
//             <CButton color="primary" onClick={handleSaveChanges}>
//               Save Changes
//             </CButton>
//             <CButton
//               color="secondary"
//               onClick={() => setShowEditOrderModal(false)}
//             >
//               Cancel
//             </CButton>
//           </CModalFooter>
//         </CModal>
//       )}
//       {/* Order Details Modal */}
//       {selectedOrder && (
//         <CModal
//           visible={showOrderDetailsModal}
//           onClose={() => setShowOrderDetailsModal(false)}
//         >
//           <CModalHeader>
//             <CModalTitle>Order Details</CModalTitle>
//           </CModalHeader>
//           <CModalBody>
//             <p><strong>Order ID:</strong> {selectedOrder.id}</p>
//             <p><strong>Order Date:</strong> {selectedOrder.orderDate}</p>
//             <p><strong>Product:</strong> {selectedOrder.orderSummary.split(',')[0]}</p>
//             <p><strong>Product Details:</strong> {selectedOrder.orderSummary}</p>
//             <p><strong>Product Value:</strong> {/* Insert product value here */}</p>
//           </CModalBody>
//           <CModalFooter>
//             <CButton
//               color="secondary"
//               onClick={() => setShowOrderDetailsModal(false)}
//             >
//               Close
//             </CButton>
//           </CModalFooter>
//         </CModal>
//       )}
//       {/* Payment Details Modal */}
//       {selectedOrder && (
//         <CModal
//           visible={showPaymentDetailsModal}
//           onClose={() => setShowPaymentDetailsModal(false)}
//           size="lg"
//           alignment="center"
//         >
//           <CModalHeader className='border-0'>
//             <CModalTitle>Payment Details</CModalTitle>
//           </CModalHeader>
//           <CModalBody>
//             <div className='table-responsive'>
//               <table class="table table-striped">
//                 <thead>
//                   <tr>
//                     <th scope="col">Transaction ID:</th>
//                     <th scope="col">Transaction Date:</th>
//                     <th scope="col">Transaction Status:</th>
//                     <th scope="col">Transaction Amount:</th>
//                     <th scope="col">Transaction Mode:</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>1234</td>
//                     <td>13 Jan 2024</td>
//                     <td>Success</td>
//                     <td> USD 1300/-</td>
//                     <td>Card</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </CModalBody>
//           <CModalFooter className='border-0'>
//             <CButton
//               color="secondary"
//               onClick={() => setShowPaymentDetailsModal(false)}
//             >
//               Close
//             </CButton>
//           </CModalFooter>
//         </CModal>
//       )}

//     </>
//   );
// };
// export default ManageOrders;
