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

const FormulaManage = () => {
  const [products, setProducts] = useState([])
  const [formulas, setFormulas] = useState({})
  const [dimensions, setDimensions] = useState({})
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [editType, setEditType] = useState('formula') // 'formula' or 'dimension'
  const [currentProduct, setCurrentProduct] = useState(null)
  const [formulaInput, setFormulaInput] = useState('')
  const [minInput, setMinInput] = useState([0, 0])
  const [maxInput, setMaxInput] = useState([0, 0])
  const [alert, setAlert] = useState(null)
  const [temperingFormula, setTemperingFormula] = useState('')
  const [temperingModal, setTemperingModal] = useState(false)
  const [temperingInput, setTemperingInput] = useState('')
  const [gridFormula, setGridFormula] = useState('')
  const [validGridNames, setValidGridNames] = useState('')
  const [gridModal, setGridModal] = useState(false)
  const [gridInput, setGridInput] = useState('')
  const [gridNamesInput, setGridNamesInput] = useState('')

  useEffect(() => {
    let isMounted = true

    async function fetchData() {
      try {
        setLoading(true)

        // Fetch all products
        const productRes = await axios.get(
          `https://www.discountdoorandwindow.com/api/formula-config/products`,
        )
        const products = productRes.data
        if (!isMounted) return
        setProducts(products)

        // Fetch formulas and dimension limits for products
        const formulaPromises = products.map((p) =>
          axios
            .get(`https://www.discountdoorandwindow.com/api/formula-config/formula/${p._id}`)
            .then((res) => ({ id: p._id, formula: res.data.formula }))
            .catch(() => ({ id: p._id, formula: null })),
        )

        const dimensionPromises = products.map((p) =>
          axios
            .get(
              `https://www.discountdoorandwindow.com/api/formula-config/dimension-limit/${p._id}`,
            )
            .then((res) => ({ id: p._id, dims: res.data }))
            .catch(() => ({ id: p._id, dims: null })),
        )

        // Fetch tempering and grid formulas in parallel
        const [formulasResult, dimensionsResult, temperingRes, gridRes] = await Promise.all([
          Promise.all(formulaPromises),
          Promise.all(dimensionPromises),
          axios.get('https://www.discountdoorandwindow.com/api/formula-config/tempering-formula').catch(() => null),
          axios.get('https://www.discountdoorandwindow.com/api/formula-config/grid-formula').catch(() => null),
        ])

        if (!isMounted) return

        // Map formulas and dimensions
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

        // Set tempering formula state if available
        if (temperingRes && temperingRes.data && temperingRes.data.formula) {
          setTemperingFormula(temperingRes.data.formula.formula || '')
        } else {
          setTemperingFormula('')
        }

        // Set grid formula state if available
        if (gridRes && gridRes.data && gridRes.data.formula) {
          setGridFormula(gridRes.data.formula.formula || '')
          setValidGridNames(
            Array.isArray(gridRes.data.formula.validGridNames)
              ? gridRes.data.formula.validGridNames.join(', ')
              : '',
          )
        } else {
          setGridFormula('')
          setValidGridNames('')
        }
      } catch (error) {
        if (isMounted) {
          setAlert({ color: 'danger', message: 'Failed to load data from server.' })
        }
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
        `https://www.discountdoorandwindow.com/api/formula-config/formula`,
        { productId: currentProduct._id, formula: formulaInput },
        // { withCredentials: true }
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
      setAlert({
        color: 'warning',
        message: 'Min and Max must be arrays of exactly two numbers.',
      })
      return
    }
    try {
      await axios.post(
        `https://www.discountdoorandwindow.com/api/formula-config/dimension-limit`,
        { productId: currentProduct._id, min: minInput, max: maxInput },
        // { withCredentials: true }
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

  const handleTemperingSave = async () => {
    if (!temperingInput.trim()) {
      setAlert({ color: 'warning', message: 'Tempering formula cannot be empty.' })
      return
    }
    try {
      await axios.post(`https://www.discountdoorandwindow.com/api/formula-config/tempering-formula`, {
        formula: temperingInput,
      })
      setTemperingFormula(temperingInput)
      setTemperingModal(false)
      setAlert({ color: 'success', message: 'Tempering formula updated successfully.' })
    } catch {
      setAlert({ color: 'danger', message: 'Failed to update tempering formula.' })
    }
  }

  const handleGridSave = async () => {
    if (!gridInput.trim()) {
      setAlert({ color: 'warning', message: 'Grid formula cannot be empty.' })
      return
    }
    try {
      await axios.post(`https://www.discountdoorandwindow.com/api/formula-config/grid-formula`, {
        formula: gridInput,
        validGridNames: gridNamesInput
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      })
      setGridFormula(gridInput)
      setValidGridNames(gridNamesInput)
      setGridModal(false)
      setAlert({ color: 'success', message: 'Grid formula updated successfully.' })
    } catch {
      setAlert({ color: 'danger', message: 'Failed to update grid formula.' })
    }
  }

  return (
    <>
      <CCard className="m-4 shadow-sm">
        <CCardHeader className="bg-primary text-white">
          <h3 className="mb-0">Formula & Dimension Limit Management</h3>
        </CCardHeader>
        <CCardBody>
          {alert && (
            <CAlert color={alert.color} className="mb-4">
              {alert.message}
            </CAlert>
          )}
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
                    <CTableDataCell className="fst-italic">
                      {p.category || <em>Not Set</em>}
                    </CTableDataCell>
                    <CTableDataCell style={{ fontFamily: 'monospace' }}>
                      {formulas[p._id] || <em className="text-muted">Not Set</em>}
                    </CTableDataCell>
                    <CTableDataCell>
                      {dimensions[p._id] ? (
                        <>
                          <div>
                            Min:{' '}
                            <span className="fw-semibold">
                              {dimensions[p._id].min[0]} × {dimensions[p._id].min[1]}
                            </span>
                          </div>
                          <div>
                            Max:{' '}
                            <span className="fw-semibold">
                              {dimensions[p._id].max[0]} × {dimensions[p._id].max[1]}
                            </span>
                          </div>
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
      <CCard className="mb-3">
        <CCardHeader className="bg-light">
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-bold">Tempering Formula</span>
            <CButton
              size="sm"
              color="primary"
              onClick={() => {
                setTemperingInput(temperingFormula)
                setTemperingModal(true)
              }}
            >
              Edit
            </CButton>
          </div>
        </CCardHeader>
        <CCardBody>
          <div>
            <span className="text-muted">{temperingFormula || <em>Not Set</em>}</span>
          </div>
        </CCardBody>
      </CCard>
      <CModal visible={temperingModal} onClose={() => setTemperingModal(false)} centered>
        <CModalHeader closeButton>
          <CModalTitle>Edit Tempering Formula</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormLabel>Tempering Formula</CFormLabel>
          <CFormInput
            type="text"
            value={temperingInput}
            onChange={(e) => setTemperingInput(e.target.value)}
            placeholder="e.g. (h + w) ^ 2 * 0.0278"
          />
          <small className="text-muted">
            Use <code>h</code> (height), <code>w</code> (width)
          </small>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setTemperingModal(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={handleTemperingSave}>
            Save
          </CButton>
        </CModalFooter>
      </CModal>

      <CCard className="mb-3">
        <CCardHeader className="bg-light">
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-bold">Grid Formula</span>
            <CButton
              size="sm"
              color="primary"
              onClick={() => {
                setGridInput(gridFormula)
                setGridNamesInput(validGridNames)
                setGridModal(true)
              }}
            >
              Edit
            </CButton>
          </div>
        </CCardHeader>
        <CCardBody>
          <div>
            <span className="text-muted">Formula: {gridFormula || <em>Not Set</em>}</span>
          </div>
          <div className="small text-muted">
            Valid Grid Names: {validGridNames || <em>Not Set</em>}
          </div>
        </CCardBody>
      </CCard>
      <CModal visible={gridModal} onClose={() => setGridModal(false)} centered>
        <CModalHeader closeButton>
          <CModalTitle>Edit Grid Formula</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormLabel>Grid Formula</CFormLabel>
          <CFormInput
            type="text"
            value={gridInput}
            onChange={(e) => setGridInput(e.target.value)}
            placeholder="e.g. (h + w) ^ 2 * 0.0139"
          />
          <CFormLabel className="mt-2">Valid Grid Names (comma separated)</CFormLabel>
          <CFormInput
            type="text"
            value={gridNamesInput}
            onChange={(e) => setGridNamesInput(e.target.value)}
            placeholder="e.g. Flat grid Between the glass, Grille"
          />
          <small className="text-muted">
            Use <code>h</code> (height), <code>w</code> (width)
          </small>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setGridModal(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={handleGridSave}>
            Save
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        size="lg"
        backdrop="static"
        centered
      >
        <CModalHeader closeButton>
          <CModalTitle>
            {editType === 'formula' ? 'Edit Formula' : 'Edit Dimension Limits'} for{' '}
            <span className="fw-bold">{currentProduct?.name}</span>
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {alert && (
            <CAlert color={alert.color} className="mb-3">
              {alert.message}
            </CAlert>
          )}
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
              <CFormLabel className="fw-semibold mt-2 mb-1">
                Min Dimensions (Width, Height)
              </CFormLabel>
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
