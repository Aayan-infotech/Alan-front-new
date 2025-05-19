import React, { useEffect, useState } from 'react'
import axios from 'axios'
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
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'

const Rating = () => {
  const [ratings, setRatings] = useState([])
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [selectedRating, setSelectedRating] = useState(null)
  const [filters, setFilters] = useState({
    name: '',
    rating: '',
    productType: '',
    adminApproved: '',
  })

  const [page, setPage] = useState(1)
const [limit, setLimit] = useState(10) // or any number you want per page
const [totalPages, setTotalPages] = useState(1)

const fetchRatings = async () => {
  try {
    const queryFilters = { ...filters }

    if (queryFilters.adminApproved !== '') {
      queryFilters.adminApproved = queryFilters.adminApproved
    } else {
      delete queryFilters.adminApproved
    }

    // Add pagination
    queryFilters.page = page
    queryFilters.limit = limit

    const query = new URLSearchParams(queryFilters).toString()
    const res = await axios.get(`https://www.discountdoorandwindow.com/api/ratings?${query}`)

    setRatings(res.data.data)
    setTotalPages(res.data.totalPages || 1) // assuming your API returns totalPages
  } catch (err) {
    console.error('Error fetching ratings:', err)
  }
}




  useEffect(() => {
    fetchRatings()
  }, [filters,page,limit])

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this rating?')) {
      await axios.delete(`https://www.discountdoorandwindow.com/api/ratings/${id}`)
      fetchRatings()
    }
  }

  const openEditModal = (rating) => {
    setSelectedRating({ ...rating })
    setEditModalVisible(true)
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setSelectedRating({ ...selectedRating, [name]: value })
  }

  const updateRating = async () => {
    try {
      await axios.put(`https://www.discountdoorandwindow.com/api/ratings/${selectedRating._id}`, selectedRating)
      setEditModalVisible(false)
      fetchRatings()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Ratings</strong>
        </CCardHeader>
        <CCardBody>
          <CForm className="row g-3 mb-3">
            <div className="col-md-3">
              <CFormLabel>Product Name</CFormLabel>
              <CFormInput
                type="text"
                name="name"
                value={filters.name}
                onChange={(e) => setFilters({ ...filters, name: e.target.value })}
              />
            </div>
            <div className="col-md-2">
              <CFormLabel>Rating</CFormLabel>
              <CFormInput
                type="number"
                name="rating"
                min="1"
                max="5"
                value={filters.rating}
                onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <CFormLabel>Product Type</CFormLabel>
              <CFormSelect
                value={filters.productType}
                onChange={(e) => setFilters({ ...filters, productType: e.target.value })}
              >
                <option value="">All</option>
                <option value="Windows">Windows</option>
                <option value="Doors">Doors</option>
                <option value="Hardware">Hardware</option>
              </CFormSelect>
            </div>
            <div className="col-md-2">
              <CFormLabel>Admin Approved</CFormLabel>
              <CFormSelect
                value={filters.adminApproved}
                onChange={(e) => setFilters({ ...filters, adminApproved: e.target.value })}
              >
                <option value="">All</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </CFormSelect>
            </div>
            <div className="col-md-2 d-flex align-items-end">
              <CButton color="secondary" onClick={() => setFilters({ name: '', rating: '', productType: '', adminApproved: '' })}>
                Reset
              </CButton>
            </div>
          </CForm>

          <CTable bordered hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Product Name</CTableHeaderCell>
                <CTableHeaderCell>Product Type</CTableHeaderCell>
                <CTableHeaderCell>Rating</CTableHeaderCell>
                <CTableHeaderCell>Review</CTableHeaderCell>
                <CTableHeaderCell>Approved</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {ratings.map((item) => (
                <CTableRow key={item._id}>
                  <CTableDataCell>{item.name}</CTableDataCell>
                  <CTableDataCell>{item.productType}</CTableDataCell>
                  <CTableDataCell>{item.rating}</CTableDataCell>
                  <CTableDataCell>{item.review}</CTableDataCell>
                  <CTableDataCell>{item.adminApproved ? 'Yes' : 'No'}</CTableDataCell>
                  <CTableDataCell>
                    <CButton size="sm" color="info" onClick={() => openEditModal(item)} className="me-2">
                      <CIcon icon={cilPencil} />
                    </CButton>
                    <CButton size="sm" color="danger" onClick={() => handleDelete(item._id)}>
                      <CIcon icon={cilTrash} />
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {/* Edit Modal */}
      <CModal visible={editModalVisible} onClose={() => setEditModalVisible(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Edit Rating</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormLabel>Product Name</CFormLabel>
            <CFormInput name="name" value={selectedRating?.name || ''} onChange={handleEditChange} />
            <CFormLabel className="mt-2">Product Type</CFormLabel>
            <CFormSelect name="productType" value={selectedRating?.productType || ''} onChange={handleEditChange}>
              <option value="Windows">Windows</option>
              <option value="Doors">Doors</option>
              <option value="Hardware">Hardware</option>
            </CFormSelect>
            <CFormLabel className="mt-2">Rating</CFormLabel>
            <CFormInput
              type="number"
              name="rating"
              min="1"
              max="5"
              value={selectedRating?.rating || ''}
              onChange={handleEditChange}
            />
            <CFormLabel className="mt-2">Review</CFormLabel>
            <CFormInput name="review" value={selectedRating?.review || ''} onChange={handleEditChange} />
            <CFormLabel className="mt-2">Admin Approved</CFormLabel>
            <CFormSelect name="adminApproved" value={selectedRating?.adminApproved ? 'true' : 'false'} onChange={(e) => {
              setSelectedRating({ ...selectedRating, adminApproved: e.target.value === 'true' })
            }}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </CFormSelect>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setEditModalVisible(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={updateRating}>
            Save Changes
          </CButton>
        </CModalFooter>
      </CModal>
      <div className="d-flex justify-content-between align-items-center mt-3">
  <div>
    Page {page} of {totalPages}
  </div>
  <div>
    <CButton
      size="sm"
      disabled={page === 1}
      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
      className="me-2"
    >
      Previous
    </CButton>
    <CButton
      size="sm"
      disabled={page === totalPages}
      onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
    >
      Next
    </CButton>
  </div>
</div>

    </>
  )
}

export default Rating
