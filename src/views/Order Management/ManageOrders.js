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
  CFormInput,
  CFormTextarea,
} from '@coreui/react';
import { cilTrash, cilPencil, cilShortText } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CFormSelect } from '@coreui/react';
import './ManageOrders.css';

const ManageOrders = () => {
  const [orders, setOrders] = useState([
    {
      id: 453,
      customerName: 'Shashank saxena',
      orderStatus: 'pending',
      orderDate: '2025-01-10',
      orderSummary: '1x Laptop, 2x Mouse',
      paymentStatus: 'Reject',
      paymentDetails: 'Transaction ID: 123456789',
    },
    {
      id: 787,
      customerName: 'imtiyaz hussain',
      orderStatus: 'Accept',
      orderDate: '2025-01-10',
      orderSummary: '1x Laptop, 2x Mouse',
      paymentStatus: 'Pending',
      paymentDetails: 'Transaction ID: 123456789',
    }, {
      id: 345,
      customerName: 'testing',
      orderStatus: 'Deline',
      orderDate: '2025-01-10',
      orderSummary: '1x Laptop, 2x Mouse',
      paymentStatus: 'Paid',
      paymentDetails: 'Transaction ID: 123456789',
    },
    {
      id: 787,
      customerName: 'imtiyaz hussain',
      orderStatus: 'Accept',
      orderDate: '2025-01-10',
      orderSummary: '1x Laptop, 2x Mouse',
      paymentStatus: 'Pending',
      paymentDetails: 'Transaction ID: 123456789',
    },
    {
      id: 787,
      customerName: 'imtiyaz hussain',
      orderStatus: 'Accept',
      orderDate: '2025-01-10',
      orderSummary: '1x Laptop, 2x Mouse',
      paymentStatus: 'Pending',
      paymentDetails: 'Transaction ID: 123456789',
    },

  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showEditOrderModal, setShowEditOrderModal] = useState(false);
  const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);
  const [showPaymentDetailsModal, setShowPaymentDetailsModal] = useState(false);

  const handleOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetailsModal(true);
  };

  const handlePaymentDetails = (order) => {
    setSelectedOrder(order);
    setShowPaymentDetailsModal(true);
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setShowEditOrderModal(true);
  };

  const handleDeleteOrder = (orderId) => {
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);
  };

  const handleSaveChanges = () => {
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
                <CTableRow key={order.id} className="order-row">
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell>{order.id}</CTableDataCell>
                  <CTableDataCell>{order.customerName}</CTableDataCell>
                  <CTableDataCell>{order.orderStatus}</CTableDataCell>
                  <CTableDataCell>{order.orderDate}</CTableDataCell>
                  {/* <CTableDataCell>{order.orderSummary}</CTableDataCell> */}
                  <CTableDataCell>
                    <div
                    style={{color: 'darkgreen'}}
                      className="action-icon"
                      onClick={() => handleOrderDetails(order)}
                    >
                      <CIcon icon={cilShortText} />
                      {' '} View details
                    </div>
                  </CTableDataCell>
                  <CTableDataCell>{order.paymentStatus}</CTableDataCell>
                  {/* <CTableDataCell>{order.OrderDetails}</CTableDataCell> */}
                  {/* <CTableDataCell>{order.paymentDetails}</CTableDataCell> */}
                  
                  <CTableDataCell>
                    <div
                    style={{color: 'darkgreen'}}
                      className="action-icon"
                      onClick={() => handlePaymentDetails(order)}
                      
                    >
                      <CIcon icon={cilShortText} />
                      {' '}View details
                    </div>
                  </CTableDataCell>
                  <CTableDataCell>
                    {/* <CButton
                      color="warning"
                      className="action-btn edit-btn"
                      onClick={() => handleEditOrder(order)}
                    >
                      <CIcon icon={cilPencil} /> Edit
                    </CButton>
                    <CButton
                      color="danger"
                      className="action-btn delete-btn ms-2"
                      onClick={() => handleDeleteOrder(order.id)}
                    >
                      <CIcon icon={cilTrash} /> Delete
                    </CButton> */}
                    <div className="action-icons">
                      <div
                        className="action-icon edit-icon"
                        onClick={() => handleEditOrder(order)}
                      >
                        <CIcon icon={cilPencil} />
                      </div>
                      {/* <div
                        className="action-icon delete-icon ms-2"
                        onClick={() => handleDeleteOrder(order.id)}
                      >
                        <CIcon icon={cilTrash} />
                      </div> */}
                    </div>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {selectedOrder && (
        <CModal
          visible={showEditOrderModal}
          onClose={() => setShowEditOrderModal(false)}
        >
          <CModalHeader>
            <CModalTitle>Edit Order</CModalTitle>
          </CModalHeader>
          <CModalBody className='row gy-4'>
            <div className="form-group col-4">
              <label>Order ID</label>
              <CFormInput
                type="text"
                value={selectedOrder.id}
                readOnly
              />
            </div>
            <div className="form-group  col-4">
              <label>Order Date</label>
              <CFormInput
                type="date"
                value={selectedOrder.orderDate}
                onChange={(e) =>
                  setSelectedOrder({ ...selectedOrder, orderDate: e.target.value })
                }
              />
            </div>
            <div className="form-group  col-4">
              <label>Order Status</label>
              <CFormSelect
                value={selectedOrder.orderStatus}
                onChange={(e) =>
                  setSelectedOrder({ ...selectedOrder, orderStatus: e.target.value })
                }
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </CFormSelect>
            </div>
            <div className="form-group mt-3">
              <label>Order Summary</label>
              <CFormTextarea
                rows={3}
                value={selectedOrder.orderSummary}
                onChange={(e) =>
                  setSelectedOrder({ ...selectedOrder, orderSummary: e.target.value })
                }
              />
            </div>
            {/* <div className="form-group mt-3">
              <label>Payment Status</label>
              <CFormInput
                type="text"
                value={selectedOrder.paymentStatus}
                onChange={(e) =>
                  setSelectedOrder({ ...selectedOrder, paymentStatus: e.target.value })
                }
              />
            </div> */}
            <div className="form-group mt-3">
              <label>Billing Address</label>
              <CFormTextarea
                rows={3}
                value={selectedOrder.orderSummary}
                onChange={(e) =>
                  setSelectedOrder({ ...selectedOrder, orderSummary: e.target.value })
                }
              />
            </div>
            <div className="form-group mt-3">
              <label>Shipping Details</label>
              <CFormTextarea
                rows={3}
                value={selectedOrder.paymentDetails}
                onChange={(e) =>
                  setSelectedOrder({ ...selectedOrder, paymentDetails: e.target.value })
                }
              />
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={handleSaveChanges}>
              Save Changes
            </CButton>
            <CButton
              color="secondary"
              onClick={() => setShowEditOrderModal(false)}
            >
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <CModal
          visible={showOrderDetailsModal}
          onClose={() => setShowOrderDetailsModal(false)}
        >
          <CModalHeader>
            <CModalTitle>Order Details</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p><strong>Order ID:</strong> {selectedOrder.id}</p>
            <p><strong>Order Date:</strong> {selectedOrder.orderDate}</p>
            <p><strong>Product:</strong> {selectedOrder.orderSummary.split(',')[0]}</p>
            <p><strong>Product Details:</strong> {selectedOrder.orderSummary}</p>
            <p><strong>Product Value:</strong> {/* Insert product value here */}</p>
          </CModalBody>
          <CModalFooter>
            <CButton
              color="secondary"
              onClick={() => setShowOrderDetailsModal(false)}
            >
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      )}


      {/* Payment Details Modal */}
      {selectedOrder && (
        <CModal
          visible={showPaymentDetailsModal}
          onClose={() => setShowPaymentDetailsModal(false)}
           size="lg"
             alignment="center"
        >
          <CModalHeader className='border-0'>
            <CModalTitle>Payment Details</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div className='table-responsive'>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Transaction ID:</th>
                  <th scope="col">Transaction Date:</th>
                  <th scope="col">Transaction Status:</th>
                  <th scope="col">Transaction Amount:</th>
                  <th scope="col">Transaction Mode:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1234</td>
                  <td>13 Jan 2024</td>
                  <td>Success</td>
                  <td> USD 1300/-</td>
                  <td>Card</td>
                  
                
                </tr>
              
              </tbody>
            </table>
            </div>
          </CModalBody>
          <CModalFooter className='border-0'>
            <CButton
              color="secondary"
              onClick={() => setShowPaymentDetailsModal(false)}
            >
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      )}

    </>
  );
};

export default ManageOrders;
