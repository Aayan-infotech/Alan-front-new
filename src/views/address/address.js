import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CFormInput,
  CFormLabel,
  CRow,
  CCol,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CPagination,
  CPaginationItem,
  CFormSelect,
  CForm
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTrash, cilPencil } from '@coreui/icons'

const Address = () => {
  const [addresses, setAddresses] = useState([])
  const [form, setForm] = useState({
    id: '',
    street: '',
    suite: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)

  useEffect(() => {
    fetchAddresses()
  }, [])

  const fetchAddresses = async () => {
    setLoading(true)
    try {
      const res = await axios.get('http://18.209.91.97:7778/api/address')
      setAddresses(res.data.data || [])
    } catch (error) {
      console.error(error)
      setMessage('Failed to load addresses.')
    }
    setLoading(false)
  }

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = { ...form }
      if (payload.id === '') delete payload.id // remove id if empty to create new

      const res = await axios.post('http://18.209.91.97:7778/api/address', payload)
      setMessage(res.data.message || 'Success')
      setForm({
        id: '',
        street: '',
        suite: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
      })
      fetchAddresses()
    } catch (error) {
      setMessage(error.response?.data?.message || 'Operation failed.')
    }
    setLoading(false)
  }

  const handleEdit = (address) => {
    setForm({ ...address })
  }

  const handleDelete = async (id) => {
    // Optional: Add delete API call here
    alert(`Delete action not implemented yet for ID: ${id}`)
  }

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
//   const currentItems = addresses.slice(indexOfFirstItem, indexOfLastItem)
  const currentItems = addresses.length > 0 ? [addresses[currentPage - 1]] : []
  const totalPages = Math.ceil(addresses.length / itemsPerPage)

  return (
    <CCard className="p-3">
      <CCardHeader>
        <h3>Manage Addresses</h3>
      </CCardHeader>
      <CCardBody>
        {message && (
          <div className="alert alert-info" role="alert">
            {message}
          </div>
        )}

        {/* Address Form */}
        <CForm onSubmit={handleSubmit} className="mb-4">
          <CRow className="g-3">
            <CCol md={6}>
              <CFormLabel htmlFor="street">Street *</CFormLabel>
              <CFormInput
                id="street"
                name="street"
                value={form.street}
                onChange={handleInputChange}
                required
                placeholder="Enter street"
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="suite">Suite</CFormLabel>
              <CFormInput
                id="suite"
                name="suite"
                value={form.suite}
                onChange={handleInputChange}
                placeholder="Enter suite (optional)"
              />
            </CCol>
            <CCol md={4}>
              <CFormLabel htmlFor="city">City *</CFormLabel>
              <CFormInput
                id="city"
                name="city"
                value={form.city}
                onChange={handleInputChange}
                required
                placeholder="City"
              />
            </CCol>
            <CCol md={4}>
              <CFormLabel htmlFor="state">State *</CFormLabel>
              <CFormInput
                id="state"
                name="state"
                value={form.state}
                onChange={handleInputChange}
                required
                placeholder="State"
              />
            </CCol>
            <CCol md={4}>
              <CFormLabel htmlFor="zip">Zip *</CFormLabel>
              <CFormInput
                id="zip"
                name="zip"
                value={form.zip}
                onChange={handleInputChange}
                required
                placeholder="Zip code"
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="phone">Phone</CFormLabel>
              <CFormInput
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleInputChange}
                placeholder="Phone number"
              />
            </CCol>
            <CCol md={6} className="d-flex align-items-end">
              <CButton type="submit" color="primary" disabled={loading}>
                {form.id ? 'Update Address' : 'Add Address'}
              </CButton>
              <CButton
                color="secondary"
                className="ms-2"
                onClick={() =>
                  setForm({
                    id: '',
                    street: '',
                    suite: '',
                    city: '',
                    state: '',
                    zip: '',
                    phone: '',
                  })
                }
                disabled={loading}
              >
                Clear
              </CButton>
            </CCol>
          </CRow>
        </CForm>

        {/* Address Table */}
        <CTable hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Street</CTableHeaderCell>
              <CTableHeaderCell>Suite</CTableHeaderCell>
              <CTableHeaderCell>City</CTableHeaderCell>
              <CTableHeaderCell>State</CTableHeaderCell>
              <CTableHeaderCell>Zip</CTableHeaderCell>
              <CTableHeaderCell>Phone</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {loading ? (
              <CTableRow>
                <CTableDataCell colSpan={7} className="text-center">
                  Loading...
                </CTableDataCell>
              </CTableRow>
            ) : currentItems.length === 0 ? (
              <CTableRow>
                <CTableDataCell colSpan={7} className="text-center">
                  No addresses found.
                </CTableDataCell>
              </CTableRow>
            ) : (
              currentItems.map((address) => (
                <CTableRow key={address._id}>
                  <CTableDataCell>{address.street}</CTableDataCell>
                  <CTableDataCell>{address.suite || '-'}</CTableDataCell>
                  <CTableDataCell>{address.city}</CTableDataCell>
                  <CTableDataCell>{address.state}</CTableDataCell>
                  <CTableDataCell>{address.zip}</CTableDataCell>
                  <CTableDataCell>{address.phone || '-'}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      size="sm"
                      color="info"
                      className="me-2"
                      onClick={() => handleEdit(address)}
                    >
                      <CIcon icon={cilPencil} />
                    </CButton>
                    {/* <CButton
                      size="sm"
                      color="danger"
                      onClick={() => handleDelete(address._id)}
                    >
                      <CIcon icon={cilTrash} />
                    </CButton> */}
                  </CTableDataCell>
                </CTableRow>
              ))
            )}
          </CTableBody>
        </CTable>

        {/* Pagination */}
        {totalPages > 1 && (
          <CPagination
            aria-label="Address pagination"
            className="mt-3 justify-content-center"
          >
            <CPaginationItem
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </CPaginationItem>

            {[...Array(totalPages)].map((_, i) => (
              <CPaginationItem
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </CPaginationItem>
            ))}

            <CPaginationItem
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Next
            </CPaginationItem>
          </CPagination>
        )}
      </CCardBody>
    </CCard>
  )
}

export default Address
