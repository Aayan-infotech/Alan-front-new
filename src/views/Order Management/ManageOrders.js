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
    axios.get('https://www.discountdoorandwindow.com/api/FnalCustData/getAllCustData')
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
      await axios.put(`https://www.discountdoorandwindow.com/api/FnalCustData/editFinalOrder/${selectedOrder.id}`, {
        orderStatus: selectedOrder.orderStatus,
      });
      setOrders((prevOrders) => prevOrders.map((order) =>
        order.id === selectedOrder.id ? { ...order, orderStatus: selectedOrder.orderStatus } : order
      ));
      setShowEditOrderModal(false);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleTrackInfoSubmit = async () => {
    if (!selectedOrder || !selectedOrder.id) {
      alert("No order selected.");
      return;
    }
    try {
      const response = await axios.put(
        `https://www.discountdoorandwindow.com/api/FnalCustData/editFinalOrder/${selectedOrder.id}`,
        {
          trackId: selectedOrder.trackId || "",
          trackPartner: selectedOrder.trackPartner || "",
        }
      );

      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === selectedOrder.id
              ? { ...order, trackId: selectedOrder.trackId, trackPartner: selectedOrder.trackPartner }
              : order
          )
        );

        alert("Tracking info updated successfully");
      } else {
        alert("Failed to update tracking info");
      }
    } catch (error) {
      console.error("Error updating tracking info:", error);
      alert("Error updating tracking info");
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
                  {/* <CTableDataCell>{order.orderStatus}</CTableDataCell> */}
                  <CTableDataCell
                    className={`text-white text-center fw-bold ${order.orderStatus === "Pending" ? "bg-warning" :
                      order.orderStatus === "Processing" ? "bg-info" :
                        order.orderStatus === "Shipped" ? "bg-primary" :
                          order.orderStatus === "Delivered" ? "bg-success" :
                            "bg-danger"}`} // Color for "Cancelled"
                  >
                    {order.orderStatus}
                  </CTableDataCell>

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
        <CModal visible={showOrderDetailsModal} onClose={() => setShowOrderDetailsModal(false)} size="xl">
          <CModalHeader>
            <CModalTitle>Order Details</CModalTitle>
          </CModalHeader>
          {/* <CModalBody>
            <p>Order ID: {selectedOrder.order_id}</p>
            <p>Product Name: {selectedOrder.productName}</p>
            <p>Product Price: {selectedOrder.product_price}</p>
            <p>Total Price: {selectedOrder.totalPrice}</p>
            <p>Product SKU: {selectedOrder.productSku}</p>
            <p>Selected Options:</p>
            <ul>
              {selectedOrder.selectedOptions &&
                Object.entries(selectedOrder.selectedOptions).map(([key, value]) => (
                  <li key={key}><strong>{key}:</strong> {value}</li>
                ))}
            </ul>
          </CModalBody> */}
          <CModalBody>
            <CTable bordered>
              <CTableBody>
                <CTableRow>
                  <CTableHeaderCell style={{ width: '25%', color: 'red' }}>Order ID</CTableHeaderCell >
                  <CTableDataCell style={{ width: '25%' }}>{selectedOrder.order_id}</CTableDataCell>
                  <CTableHeaderCell style={{ width: '25%', color: 'red' }}>Order Date</CTableHeaderCell >
                  <CTableDataCell style={{ width: '25%' }}>{new Date(selectedOrder.date).toLocaleDateString()}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell style={{ color: 'red' }}>Product</CTableHeaderCell >
                  <CTableDataCell colSpan={3}>{selectedOrder.productName}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell style={{ color: 'red', height: '100px' }}>Product Details</CTableHeaderCell >
                  <CTableDataCell colSpan={3} style={{ verticalAlign: 'top' }}>{selectedOrder.selectedOptions &&
                    Object.entries(selectedOrder.selectedOptions).map(([key, value]) => (
                      <li key={key}><strong>{key}:</strong> {value}</li>
                    ))}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell style={{ color: 'red' }}>Product Value</CTableHeaderCell >
                  <CTableDataCell colSpan={3}>
                    <div className='text-end'>
                      {`USD ${selectedOrder.totalPrice}/-`}
                    </div>
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable >
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setShowOrderDetailsModal(false)}>Close</CButton>
          </CModalFooter>
        </CModal>
      )}

      {/* Payment Details Modal */}
      {/* {selectedOrder && showPaymentDetailsModal && (
        <CModal visible={showPaymentDetailsModal} onClose={() => setShowPaymentDetailsModal(false)}>
          <CModalHeader>
            <CModalTitle>Payment Details</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div className="form-group col-4">
              <label>Order Date</label>
              <CFormInput
                type="text"
                value={new Date(selectedOrder.date).toISOString().split('T')[0]}
                readOnly
              />
            </div>
            <p>Payment ID: {selectedOrder.paymentId}</p>
            <p>Payment Status: {selectedOrder.paymentStatus}</p>
            <p>Quantity: {selectedOrder.quantity}</p>
            <p>Paid Amount: {selectedOrder.paidAmount}</p>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setShowPaymentDetailsModal(false)}>Close</CButton>
          </CModalFooter>
        </CModal>
      )} */}
      {selectedOrder && showPaymentDetailsModal && (
        <CModal visible={showPaymentDetailsModal} onClose={() => setShowPaymentDetailsModal(false)} size="xl">
          <CModalHeader>
            <CModalTitle>Payment Details</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CTable bordered>
              <CTableBody>
                <CTableRow>
                  {/* <CTableHeaderCell rowSpan={5} className="fw-bold text-success">Payment</CTableHeaderCell> */}
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
                  <CTableDataCell>{new Date(selectedOrder.date).toLocaleDateString()}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell className="fw-bold">Transaction Status</CTableHeaderCell>
                  <CTableDataCell>{selectedOrder.paymentStatus}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell className="fw-bold">Transaction Amount</CTableHeaderCell>
                  <CTableDataCell>USD {selectedOrder.paidAmount}/-</CTableDataCell>
                </CTableRow>
                {/* <CTableRow>
                  <CTableHeaderCell className="fw-bold">Transaction Mode</CTableHeaderCell>
                  <CTableDataCell>{selectedOrder.paymentMode}</CTableDataCell>
                </CTableRow> */}
              </CTableBody>
            </CTable>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setShowPaymentDetailsModal(false)}>Close</CButton>
          </CModalFooter>
        </CModal>
      )}
      {/* Edit Order Modal */}
      {selectedOrder && showEditOrderModal && (
        <CModal visible={showEditOrderModal} onClose={() => setShowEditOrderModal(false)} size="xl">
          <CModalHeader>
            <CModalTitle>Edit Order</CModalTitle>
          </CModalHeader>
          <CModalBody className='row gy-4'>
            <div className="form-group col-4">
              <label>Order ID</label>
              <CFormInput
                type="text"
                value={selectedOrder.order_id}
                readOnly
                title={selectedOrder.order_id} // Shows full Order ID on hover
              />
            </div>
            <div className="form-group col-4">
              <label>Order Date</label>
              <CFormInput
                type="text"
                value={new Date(selectedOrder.date).toISOString().split('T')[0]}
                readOnly
              />
            </div>
            <div className="form-group col-4">
              <label>Order Status</label>
              <CFormSelect
                className={`text-white ${selectedOrder.orderStatus === "Pending" ? "bg-warning" :
                  selectedOrder.orderStatus === "Processing" ? "bg-info" :
                    selectedOrder.orderStatus === "Shipped" ? "bg-primary" :
                      selectedOrder.orderStatus === "Delivered" ? "bg-success" :
                        "bg-danger"}`} // Color for "Cancelled"
                value={selectedOrder.orderStatus}
                onChange={(e) => setSelectedOrder({ ...selectedOrder, orderStatus: e.target.value })}
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </CFormSelect>
            </div>

            {/* Track */}
            <div className="form-group col-4">
              <label>Track ID</label>
              <CFormInput
                type="text"
                value={selectedOrder?.trackId || ""}
                onChange={(e) =>
                  setSelectedOrder((prev) => (prev ? { ...prev, trackId: e.target.value } : {}))
                }
                placeholder="Enter Track ID"
              />
            </div>
            <div className="form-group col-4">
              <label>Track Partner</label>
              <CFormInput
                type="text"
                value={selectedOrder?.trackPartner || ""}
                onChange={(e) =>
                  setSelectedOrder((prev) => ({ ...prev, trackPartner: e.target.value }))
                }
                placeholder="Enter Track Partner"
              />
            </div>
            <div className="form-group col-4 d-flex align-items-end">
              <CButton color="success" onClick={handleTrackInfoSubmit}>Submit Tracking Info</CButton>
            </div>

            <div className="form-group mt-3">
              <label>Billing Address</label>
              <div className="card">
                <div className="card-body">
                  <ul className="list-unstyled">
                    <li><strong>Name:</strong> {selectedOrder.customerName}</li>
                    <li><strong>Email:</strong> {selectedOrder.customerEmail}</li>
                    <li><strong>Mobile:</strong> {selectedOrder.customerMobile}</li>
                    <li><strong>Address:</strong> {selectedOrder.customerAddress}</li>
                    <li><strong>State:</strong> {selectedOrder.customerState}</li>
                    <li><strong>Zip Code:</strong> {selectedOrder.customerZipCode}</li>
                    <li><strong>Country:</strong> {selectedOrder.customerCountry}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="form-group mt-3">
              <label>Shipping Details</label>
              <CFormTextarea rows={6} readOnly
                value={
                  `Window Pick Up\n - Green World Windows and Doors\n - 3810 Wabash Drive\n - Mira Loma, CA 91752\n\n` +
                  `Door Pickup\n - A.A.W. Doors\n - 13900 S Broadway\n - Los Angeles, CA 90061\n\n` +
                  `Both Door and Window Pick Up\n - Discount Door and Window\n - 5450 Complex St.\n - Unit 301\n - San Diego, CA 92123`
                }
              />
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







{/* Edit Order Modal */ }
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