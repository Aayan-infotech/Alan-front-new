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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTrash,cilEnvelopeClosed  } from '@coreui/icons'

const ContactsUs = () => {
  const [contacts, setContacts] = useState([])
  const [filters, setFilters] = useState({ name: '', email: '', type: '' })
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const limit = 10

  const fetchContacts = async () => {
    try {
      const params = { ...filters, page, limit }
      const res = await axios.get('http://18.209.91.97:7778/api/contacts', { params })
      if (res.data.success) {
        setContacts(res.data.data)
        setTotalPages(Math.ceil(res.data.total / limit))
      }
    } catch (err) {
      console.error('Error fetching contacts:', err)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [filters, page])

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return
    try {
      await axios.delete(`http://18.209.91.97:7778/api/contacts/${id}`)
      fetchContacts()
    } catch (err) {
      console.error('Failed to delete contact:', err)
    }
  }

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
    setPage(1) // reset to first page on filter change
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>Contact Messages</CCardHeader>
      <CCardBody>
        {/* Filter Inputs */}
        <CRow className="mb-3">
          <CCol md={4}>
            <CFormLabel>Name</CFormLabel>
            <CFormInput
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
              placeholder="Search by name"
            />
          </CCol>
          <CCol md={4}>
            <CFormLabel>Email</CFormLabel>
            <CFormInput
              name="email"
              value={filters.email}
              onChange={handleFilterChange}
              placeholder="Search by email"
            />
          </CCol>
          <CCol md={4}>
            <CFormLabel>Type</CFormLabel>
            <CFormSelect name="type" value={filters.type} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="Contact Us">Contact Us</option>
              <option value="Get Estimates">Get Estimates</option>
            </CFormSelect>
          </CCol>
        </CRow>

        {/* Contact Table */}
        <CTable striped hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Mobile</CTableHeaderCell>
              <CTableHeaderCell>Type</CTableHeaderCell>
              <CTableHeaderCell>Message</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {contacts.map((contact) => (
              <CTableRow key={contact._id}>
                <CTableDataCell>{contact.name}</CTableDataCell>
                <CTableDataCell>{contact.email}</CTableDataCell>
                <CTableDataCell>{contact.mobileNo}</CTableDataCell>
                <CTableDataCell>{contact.type}</CTableDataCell>
                <CTableDataCell>{contact.message}</CTableDataCell>
                <CTableDataCell>
                {/* <a
                  href={`mailto:${contact.email}?subject=Regarding your ${contact.type} message&body=Hi ${contact.name},%0D%0A%0D%0ARegarding your message: "${contact.message}"`}
                  title="Send Email"
                  style={{ textDecoration: 'none' }}
                >
                  <CButton color="info" size="sm">
                    <CIcon icon={cilEnvelopeClosed} />
                  </CButton>
                </a> */}
                <a
                  href={`mailto:${contact.email}`}
                  title="Send Email"
                  style={{ textDecoration: 'none' }}
                >
                  <CButton color="info" size="sm">
                    <CIcon icon={cilEnvelopeClosed} />
                  </CButton>
                </a>
                  <CButton color="danger" size="sm" onClick={() => handleDelete(contact._id)}>
                    <CIcon icon={cilTrash} />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>

        {/* Pagination */}
        <CPagination align="end" className="mt-3">
          {Number.isFinite(totalPages) && totalPages > 0 && (
            <CPagination align="end" className="mt-3">
              {[...Array(totalPages)].map((_, idx) => (
                <CPaginationItem
                  key={idx}
                  active={page === idx + 1}
                  onClick={() => setPage(idx + 1)}
                  style={{ cursor: 'pointer' }}
                >
                  {idx + 1}
                </CPaginationItem>
              ))}
            </CPagination>
          )}
        </CPagination>
      </CCardBody>
    </CCard>
  )
}

export default ContactsUs
