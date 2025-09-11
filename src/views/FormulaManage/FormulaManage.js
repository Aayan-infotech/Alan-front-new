import React, { useState, useEffect } from 'react'
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
  CSpinner,
  CAlert,
} from '@coreui/react'

const API_BASE = 'https://www.discountdoorandwindow.com/api/formula-config'

const FormulaManage = () => {
  const [products, setProducts] = useState([])
  const [formulas, setFormulas] = useState({})
  const [dimensions, setDimensions] = useState({})
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [editType, setEditType] = useState('formula')
  const [currentProduct, setCurrentProduct] = useState(null)
  const [formulaInput, setFormulaInput] = useState('')
  const [minInput, setMinInput] = useState([0, 0])
  const [maxInput, setMaxInput] = useState([0, 0])
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function fetchData() {
      try {
        setLoading(true)
        const productRes = await axios.get(`${API_BASE}/products`, { withCredentials: true })
        const products = productRes.data
        if (!isMounted) return
        setProducts(products)

        const formulaPromises = products.map((p) =>
          axios
            .get(`${API_BASE}/formula/${p._id}`, { withCredentials: true })
            .then((res) => ({ id: p._id, formula: res.data.formula }))
            .catch(() => ({ id: p._id, formula: null })),
        )
        const dimensionPromises = products.map((p) =>
          axios
            .get(`${API_BASE}/dimension-limit/${p._id}`, { withCredentials: true })
            .then((res) => ({ id: p._id, dims: res.data }))
            .catch(() => ({ id: p._id, dims: null })),
        )

        const formulasResult = await Promise.all(formulaPromises)
        const dimensionsResult = await Promise.all(dimensionPromises)

        if (!isMounted) return

        const formulasMap = {}
        formulasResult.forEach(({ id, formula }) => {
          formulasMap[id] = formula
        })

        const dimensionsMap = {}
        dimensionsResult.forEach(({ id, dims }) => {
          dimensionsMap[id] = dims
        })

        setFormulas(formulasMap)
        setDimensions(dimensionsMap)
      } catch (error) {
        if (isMounted) setAlert({ color: 'danger', message: 'Failed to load data.' })
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [])

  const openModal = (product, type) => {
    setCurrentProduct(product)
    setEditType(type)
    if (type === 'formula') {
      setFormulaInput(formulas[product._id] || '')
    } else {
      const dim = dimensions[product._id]
      setMinInput(dim?.min || [0, 0])
      setMaxInput(dim?.max || [0, 0])
    }
    setAlert(null)
    setModalVisible(true)
  }

  const saveFormula = async () => {
    if (!formulaInput.trim()) {
      setAlert({ color: 'warning', message: 'Formula cannot be empty.' })
      return
    }
    try {
      await axios.post(
        `${API_BASE}/formula`,
        { productId: currentProduct._id, formula: formulaInput },
        { withCredentials: true },
      )
      setFormulas((prev) => ({ ...prev, [currentProduct._id]: formulaInput }))
      setAlert({ color: 'success', message: 'Formula saved successfully.' })
      setModalVisible(false)
    } catch {
      setAlert({ color: 'danger', message: 'Failed to save formula.' })
    }
  }

  const saveDimensions = async () => {
    if (
      !Array.isArray(minInput) ||
      !Array.isArray(maxInput) ||
      minInput.length !== 2 ||
      maxInput.length !== 2 ||
      minInput.some(isNaN) ||
      maxInput.some(isNaN)
    ) {
      setAlert({ color: 'warning', message: 'Min and Max must be arrays of exactly two numbers.' })
      return
    }
    try {
      await axios.post(
        `${API_BASE}/dimension-limit`,
        { productId: currentProduct._id, min: minInput, max: maxInput },
        { withCredentials: true },
      )
      setDimensions((prev) => ({
        ...prev,
        [currentProduct._id]: { min: minInput, max: maxInput },
      }))
      setAlert({ color: 'success', message: 'Dimension limits saved successfully.' })
      setModalVisible(false)
    } catch {
      setAlert({ color: 'danger', message: 'Failed to save dimension limits.' })
    }
  }

  return (
    <>
      <CCard className="m-4 shadow-sm">
        <CCardHeader className="bg-primary text-white">
          <h3 className="mb-0">Formula & Dimension Limit Management</h3>
        </CCardHeader>
        <CCardBody>
          {alert && <CAlert color={alert.color} className="mb-4">{alert.message}</CAlert>}
          {loading ? (
            <div className="text-center py-5">
              <CSpinner color="primary" size="lg" />
            </div>
          ) : (
            <CTable striped hover responsive bordered>
              <CTableHead className="table-primary">
                <CTableRow>
                  <CTableHeaderCell>Product Name</CTableHeaderCell>
                  <CTableHeaderCell>Category Name</CTableHeaderCell>
                  <CTableHeaderCell>Formula</CTableHeaderCell>
                  <CTableHeaderCell>Dimension Limits (Min × Max)</CTableHeaderCell>
                  <CTableHeaderCell className="text-center" style={{ minWidth: '150px' }}>
                    Actions
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {products.map((p) => (
                  <CTableRow key={p._id}>
                    <CTableDataCell className="fw-semibold">{p.name}</CTableDataCell>
                    <CTableDataCell className="fst-italic">{p.category || <em>Not Set</em>}</CTableDataCell>
                    <CTableDataCell style={{ fontFamily: 'monospace' }}>
                      {formulas[p._id] || <em className="text-muted">Not Set</em>}
                    </CTableDataCell>
                    <CTableDataCell>
                      {dimensions[p._id] ? (
                        <>
                          <div>Min: <span className="fw-semibold">{dimensions[p._id].min[0]} × {dimensions[p._id].min[1]}</span></div>
                          <div>Max: <span className="fw-semibold">{dimensions[p._id].max[0]} × {dimensions[p._id].max[1]}</span></div>
                        </>
                      ) : (
                        <em className="text-muted">Not Set</em>
                      )}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CButton
                        size="sm"
                        color="warning"
                        className="me-2"
                        onClick={() => openModal(p, 'formula')}
                      >
                        Edit Formula
                      </CButton>
                      <CButton size="sm" color="info" onClick={() => openModal(p, 'dimension')}>
                        Edit Dimensions
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          )}
        </CCardBody>
      </CCard>

      <CModal visible={modalVisible} onClose={() => setModalVisible(false)} size="lg" backdrop="static" centered>
        <CModalHeader closeButton>
          <CModalTitle>
            {editType === 'formula' ? 'Edit Formula' : 'Edit Dimension Limits'} for <span className="fw-bold">{currentProduct?.name}</span>
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {alert && <CAlert color={alert.color} className="mb-3">{alert.message}</CAlert>}
          {editType === 'formula' ? (
            <>
              <CFormLabel className="fw-semibold mb-2">Formula</CFormLabel>
              <CFormInput
                type="text"
                value={formulaInput}
                onChange={(e) => setFormulaInput(e.target.value)}
                placeholder="e.g. (h + w) * 3.305 - 114"
                size="lg"
              />
              <small className="text-muted fst-italic mt-1 d-block">
                Use variables <code>h</code> for height and <code>w</code> for width.
              </small>
            </>
          ) : (
            <>
              <CFormLabel className="fw-semibold mt-2 mb-1">Min Dimensions (Width, Height)</CFormLabel>
              <div className="d-flex gap-3 mb-3">
                <CFormInput
                  type="number"
                  value={minInput[0]}
                  onChange={(e) => setMinInput([Number(e.target.value), minInput[1]])}
                  placeholder="Min Width"
                  size="lg"
                />
                <CFormInput
                  type="number"
                  value={minInput[1]}
                  onChange={(e) => setMinInput([minInput[0], Number(e.target.value)])}
                  placeholder="Min Height"
                  size="lg"
                />
              </div>
              <CFormLabel className="fw-semibold mb-1">Max Dimensions (Width, Height)</CFormLabel>
              <div className="d-flex gap-3">
                <CFormInput
                  type="number"
                  value={maxInput[0]}
                  onChange={(e) => setMaxInput([Number(e.target.value), maxInput[1]])}
                  placeholder="Max Width"
                  size="lg"
                />
                <CFormInput
                  type="number"
                  value={maxInput[1]}
                  onChange={(e) => setMaxInput([maxInput[0], Number(e.target.value)])}
                  placeholder="Max Height"
                  size="lg"
                />
              </div>
            </>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={editType === 'formula' ? saveFormula : saveDimensions}>
            Save
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default FormulaManage
