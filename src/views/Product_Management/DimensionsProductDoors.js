import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CFormInput,
  CButton,
  CSpinner,
  CAlert,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom'
import "./DimensionsProduct.css"

const DimensionsProductDoors = () => {
  // Door Dimensions
  const [entries, setEntries] = useState([])
  const [dimensionValue, setDimensionValue] = useState('')
  const [dimensionAmount, setDimensionAmount] = useState('')
  const [loadingDimensions, setLoadingDimensions] = useState(false)

  // Pre Hung Options
  const [preHungOptions, setPreHungOptions] = useState([])
  const [preHungValue, setPreHungValue] = useState('')
  const [preHungAmount, setPreHungAmount] = useState('')
  const [loadingPreHung, setLoadingPreHung] = useState(false)

  // Pre Finishing Options
  const [preFinishingOptions, setPreFinishingOptions] = useState([])
  const [preFinishingValue, setPreFinishingValue] = useState('')
  const [preFinishingAmount, setPreFinishingAmount] = useState('')
  const [loadingPreFinishing, setLoadingPreFinishing] = useState(false)

  // Frame Options
  const [frameOptions, setFrameOptions] = useState([])
  const [frameOptionValue, setFrameOptionValue] = useState('')
  const [frameOptionAmount, setFrameOptionAmount] = useState('')
  const [loadingFrameOptions, setLoadingFrameOptions] = useState(false)

  // Swing Direction
  const [swingDirection, setSwingDirection] = useState([])
  const [swingDirectionValue, setSwingDirectionValue] = useState('')
  const [swingDirectionAmount, setSwingDirectionAmount] = useState('')
  const [loadingSwingDirection, setLoadingSwingDirection] = useState(false)

  // Peep View
  const [peepView, setPeepView] = useState([])
  const [peepViewValue, setPeepViewValue] = useState('')
  const [peepViewAmount, setPeepViewAmount] = useState('')
  const [loadingPeepView, setLoadingPeepView] = useState(false)

  // Hinge Color
  const [hingeColor, setHingeColor] = useState([])
  const [hingeColorValue, setHingeColorValue] = useState('')
  const [hingeColorAmount, setHingeColorAmount] = useState('')
  const [loadingHingeColor, setLoadingHingeColor] = useState(false)

  // Door Sill
  const [sillOptions, setSillOptions] = useState([])
  const [sillValue, setSillValue] = useState('')
  const [sillAmount, setSillAmount] = useState('')
  const [loadingSill, setLoadingSill] = useState(false)

  // Weather Strip Color
  const [weatherStripColor, setWeatherStripColor] = useState([])
  const [weatherStripColorValue, setWeatherStripColorValue] = useState('')
  const [weatherStripColorAmount, setWeatherStripColorAmount] = useState('')
  const [loadingWeatherStripColor, setLoadingWeatherStripColor] = useState(false)

  // Grid Options
  const [gridOptions, setGridOptions] = useState([])
  const [gridOptionValue, setGridOptionValue] = useState('')
  const [gridOptionAmount, setGridOptionAmount] = useState('')
  const [loadingGridOptions, setLoadingGridOptions] = useState(false)

  // Frame Extrusion
  const [frameExtrusion, setFrameExtrusion] = useState([])
  const [frameExtrusionValue, setFrameExtrusionValue] = useState('')
  const [frameExtrusionAmount, setFrameExtrusionAmount] = useState('')
  const [loadingFrameExtrusion, setLoadingFrameExtrusion] = useState(false)

  // Lock Option
  const [lockOption, setLockOption] = useState([])
  const [lockOptionValue, setLockOptionValue] = useState('')
  const [lockOptionAmount, setLockOptionAmount] = useState('')
  const [loadingLockOption, setLoadingLockOption] = useState(false)

  // Door Color
  const [doorColor, setDoorColor] = useState([])
  const [doorColorValue, setDoorColorValue] = useState('')
  const [doorColorAmount, setDoorColorAmount] = useState('')
  const [loadingDoorColor, setLoadingDoorColor] = useState(false)

  // Width Frame
  const [widthFrame, setWidthFrame] = useState([])
  const [widthFrameValue, setWidthFrameValue] = useState('')
  const [widthFrameAmount, setWidthFrameAmount] = useState('')
  const [loadingWidthFrame, setLoadingWidthFrame] = useState(false)

  // Jamb Size
  const [jambSize, setJambSize] = useState([])
  const [jambSizeValue, setJambSizeValue] = useState('')
  const [jambSizeAmount, setJambSizeAmount] = useState('')
  const [loadingJambSize, setLoadingJambSize] = useState(false)

  // Door Shoe
  const [doorShoe, setDoorShoe] = useState([])
  const [doorShoeValue, setDoorShoeValue] = useState('')
  const [doorShoeAmount, setDoorShoeAmount] = useState('')
  const [loadingDoorShoe, setLoadingDoorShoe] = useState(false)

  // Door Weatherstrip
  const [doorWeatherstrip, setDoorWeatherstrip] = useState([])
  const [doorWeatherstripValue, setDoorWeatherstripValue] = useState('')
  const [doorWeatherstripAmount, setDoorWeatherstripAmount] = useState('')
  const [loadingDoorWeatherstrip, setLoadingDoorWeatherstrip] = useState(false)

  // Door Hinges
  const [doorHinges, setDoorHinges] = useState([])
  const [doorHingesValue, setDoorHingesValue] = useState('')
  const [doorHingesAmount, setDoorHingesAmount] = useState('')
  const [loadingDoorHinges, setLoadingDoorHinges] = useState(false)

  // Bore Options
  const [boreOptions, setBoreOptions] = useState([])
  const [boreOptionValue, setBoreOptionValue] = useState('')
  const [boreOptionAmount, setBoreOptionAmount] = useState('')
  const [loadingBoreOptions, setLoadingBoreOptions] = useState(false)

  // Installation Availability
  const [installationAvailability, setInstallationAvailability] = useState([])
  const [installationAvailabilityValue, setInstallationAvailabilityValue] = useState('')
  const [installationAvailabilityAmount, setInstallationAvailabilityAmount] = useState('')
  const [loadingInstallationAvailability, setLoadingInstallationAvailability] = useState(false)

  // Side Window Opens
  const [sideWindowOpens, setSideWindowOpens] = useState([])
  const [sideWindowOpensValue, setSideWindowOpensValue] = useState('')
  const [sideWindowOpensAmount, setSideWindowOpensAmount] = useState('')
  const [loadingSideWindowOpens, setLoadingSideWindowOpens] = useState(false)

  const [error, setError] = useState(null)
  const { productIdfordet } = useLocation().state || {}

  // ---------- Fraction Converter ----------
  const fractionMap = {
    "1/2": "½",
    "1/4": "¼",
    "3/4": "¾",
    "1/3": "⅓",
    "2/3": "⅔",
    "1/5": "⅕",
    "2/5": "⅖",
    "3/5": "⅗",
    "4/5": "⅘",
    "1/6": "⅙",
    "5/6": "⅚",
    "1/8": "⅛",
    "3/8": "⅜",
    "5/8": "⅝",
    "7/8": "⅞"
  }

  function convertFraction(input) {
    return input.replace(/(\d+)?(1\/2|1\/4|3\/4|1\/3|2\/3|1\/5|2\/5|3\/5|4\/5|1\/6|5\/6|1\/8|3\/8|5\/8|7\/8)/g, (match, number, fraction) => {
      return (number ? number + fractionMap[fraction] : fractionMap[fraction]);
    });
  }

  useEffect(() => {
    if (!productIdfordet) return
    fetchEntries()
    fetchPreHungOptions()
    fetchPreFinishingOptions()
    fetchFrameOptions()
    fetchSwingDirection()
    fetchPeepView()
    fetchHingeColor()
    fetchSillOptions()
    fetchWeatherStripColor()
    fetchGridOptions()
    fetchFrameExtrusion()
    fetchLockOption()
    fetchDoorColor()
    fetchWidthFrame()
    fetchJambSize()
    fetchDoorShoe()
    fetchDoorWeatherstrip()
    fetchDoorHinges()
    fetchBoreOptions()
    fetchInstallationAvailability()
    fetchSideWindowOpens()
  }, [productIdfordet])


  // Door Dimensions
  const fetchEntries = async () => {
    setLoadingDimensions(true)
    try {
      const response = await axios.get(`https://www.discountdoorandwindow.com/api/DimDoor/DoorWidthHeight/${productIdfordet}`)
      setEntries(Array.isArray(response.data) ? response.data : [])
    } catch (err) {
      console.error('Fetch Dimensions Error:', err)
      setError('Error fetching dimensions.')
    } finally {
      setLoadingDimensions(false)
    }
  }
  const handleAddDimension = async () => {
    if (!dimensionValue || !dimensionAmount || !productIdfordet) {
      setError('Please provide all details for dimensions.')
      return
    }
    setLoadingDimensions(true)
    try {
      await axios.post('https://www.discountdoorandwindow.com/api/DimDoor/DoorWidthHeight', {
        DoorWidthHeight: dimensionValue,
        amount: parseFloat(dimensionAmount),
        productId: productIdfordet,
      })
      setDimensionValue('')
      setDimensionAmount('')
      fetchEntries()
    } catch (err) {
      console.error('Add Dimension Error:', err)
      setError('Error adding dimension.')
    } finally {
      setLoadingDimensions(false)
    }
  }
  const handleDeleteDimension = async (id) => {
    try {
      await axios.delete(`https://www.discountdoorandwindow.com/api/DimDoor/DoorWidthHeight/${id}`)
      setEntries(entries.filter(entry => entry._id !== id))
    } catch (err) {
      console.error('Delete Dimension Error:', err)
      setError('Error deleting dimension.')
    }
  }

  // Pre Hung Options
  const fetchPreHungOptions = async () => {
    setLoadingPreHung(true)
    try {
      const response = await axios.get(`https://www.discountdoorandwindow.com/api/DimDoor/DoorPreHungOptions/${productIdfordet}`)
      setPreHungOptions(Array.isArray(response.data) ? response.data : [])
    } catch (err) {
      console.error('Fetch Pre Hung Error:', err)
      setError('Error fetching pre-hung options.')
    } finally {
      setLoadingPreHung(false)
    }
  }
  const handleAddPreHungOption = async () => {
    if (!preHungValue || !preHungAmount || !productIdfordet) {
      setError('Please provide all details for pre-hung option.')
      return
    }
    setLoadingPreHung(true)
    try {
      await axios.post('https://www.discountdoorandwindow.com/api/DimDoor/DoorPreHungOptions', {
        DoorPreHungOptions: preHungValue,
        amount: parseFloat(preHungAmount),
        productId: productIdfordet,
      })
      setPreHungValue('')
      setPreHungAmount('')
      fetchPreHungOptions()
    } catch (err) {
      console.error('Add Pre Hung Error:', err)
      setError('Error adding pre-hung option.')
    } finally {
      setLoadingPreHung(false)
    }
  }
  const handleDeletePreHungOption = async (id) => {
    try {
      await axios.delete(`https://www.discountdoorandwindow.com/api/DimDoor/DoorPreHungOptions/${id}`)
      setPreHungOptions(preHungOptions.filter(option => option._id !== id))
    } catch (err) {
      console.error('Delete Pre Hung Error:', err)
      setError('Error deleting pre-hung option.')
    }
  }

  // Pre Finishing Options
  const fetchPreFinishingOptions = async () => {
    setLoadingPreFinishing(true)
    try {
      const response = await axios.get(`https://www.discountdoorandwindow.com/api/DimDoor/DoorPreFinishingOptions/${productIdfordet}`)
      setPreFinishingOptions(Array.isArray(response.data) ? response.data : [])
    } catch (err) {
      console.error('Fetch Pre-finishing Error:', err)
      setError('Error fetching pre-finishing options.')
    } finally {
      setLoadingPreFinishing(false)
    }
  }
  const handleAddPreFinishingOptions = async () => {
    if (!preFinishingValue || !preFinishingAmount || !productIdfordet) {
      setError('Please provide all details for pre-finishing option.')
      return
    }
    setLoadingPreFinishing(true)
    try {
      await axios.post('https://www.discountdoorandwindow.com/api/DimDoor/DoorPreFinishingOptions', {
        DoorPreFinishingOptions: preFinishingValue,
        amount: parseFloat(preFinishingAmount),
        productId: productIdfordet,
      })
      setPreFinishingValue('')
      setPreFinishingAmount('')
      fetchPreFinishingOptions()
    } catch (err) {
      console.error('Add Pre-finishing Error:', err)
      setError('Error adding pre-finishing option.')
    } finally {
      setLoadingPreFinishing(false)
    }
  }
  const handleDeleteFinishingOption = async (id) => {
    try {
      await axios.delete(`https://www.discountdoorandwindow.com/api/DimDoor/DoorPreFinishingOptions/${id}`)
      setPreFinishingOptions(preFinishingOptions.filter(option => option._id !== id))
    } catch (err) {
      console.error('Delete Pre-finishing Error:', err)
      setError('Error deleting pre-finishing option.')
    }
  }

  // Frame Options
  const fetchFrameOptions = async () => {
    setLoadingFrameOptions(true)
    try {
      const response = await axios.get(`https://www.discountdoorandwindow.com/api/DimDoor/DoorFrameOptions/${productIdfordet}`)
      setFrameOptions(Array.isArray(response.data) ? response.data : [])
    } catch (err) {
      console.error('Fetch Frame Options Error:', err)
      setError('Error fetching frame options.')
    } finally {
      setLoadingFrameOptions(false)
    }
  }
  const handleAddFrameOptions = async () => {
    if (!frameOptionValue || !frameOptionAmount || !productIdfordet) {
      setError('Please provide all details for frame option.')
      return
    }
    setLoadingFrameOptions(true)
    try {
      await axios.post('https://www.discountdoorandwindow.com/api/DimDoor/DoorFrameOptions', {
        DoorFrameOptions: frameOptionValue,
        amount: parseFloat(frameOptionAmount),
        productId: productIdfordet,
      })
      setFrameOptionValue('')
      setFrameOptionAmount('')
      fetchFrameOptions()
    } catch (err) {
      console.error('Add Frame Options Error:', err)
      setError('Error adding frame option.')
    } finally {
      setLoadingFrameOptions(false)
    }
  }
  const handleDeleteFrameOption = async (id) => {
    try {
      await axios.delete(`https://www.discountdoorandwindow.com/api/DimDoor/DoorFrameOptions/${id}`)
      setFrameOptions(frameOptions.filter(option => option._id !== id))
    } catch (err) {
      console.error('Delete Frame Options Error:', err)
      setError('Error deleting frame option.')
    }
  }

  // Swing Direction
  const fetchSwingDirection = async () => {
    setLoadingSwingDirection(true)
    try {
      const response = await axios.get(`https://www.discountdoorandwindow.com/api/DimDoor/DoorSwingDirection/${productIdfordet}`)
      setSwingDirection(Array.isArray(response.data) ? response.data : [])
    } catch (err) {
      console.error('Fetch Swing Direction Error:', err)
      setError('Error fetching swing direction.')
    } finally {
      setLoadingSwingDirection(false)
    }
  }
  const handleAddSwingDirection = async () => {
    if (!swingDirectionValue || !swingDirectionAmount || !productIdfordet) {
      setError('Please provide all details for swing direction.')
      return
    }
    setLoadingSwingDirection(true)
    try {
      await axios.post('https://www.discountdoorandwindow.com/api/DimDoor/DoorSwingDirection', {
        DoorSwingDirection: swingDirectionValue,
        amount: parseFloat(swingDirectionAmount),
        productId: productIdfordet,
      })
      setSwingDirectionValue('')
      setSwingDirectionAmount('')
      fetchSwingDirection()
    } catch (err) {
      console.error('Add Swing Direction Error:', err)
      setError('Error adding swing direction.')
    } finally {
      setLoadingSwingDirection(false)
    }
  }
  const handleDeleteSwingDirection = async (id) => {
    try {
      await axios.delete(`https://www.discountdoorandwindow.com/api/DimDoor/DoorSwingDirection/${id}`)
      setSwingDirection(swingDirection.filter(option => option._id !== id))
    } catch (err) {
      console.error('Delete Swing Direction Error:', err)
      setError('Error deleting swing direction.')
    }
  }

  // Peep View
  const fetchPeepView = async () => {
    setLoadingPeepView(true)
    try {
      const response = await axios.get(`https://www.discountdoorandwindow.com/api/DimDoor/DoorPeepView/${productIdfordet}`)
      setPeepView(Array.isArray(response.data) ? response.data : [])
    } catch (err) {
      console.error('Fetch Peep View Error:', err)
      setError('Error fetching peep view.')
    } finally {
      setLoadingPeepView(false)
    }
  }
  const handleAddPeepView = async () => {
    if (!peepViewValue || !peepViewAmount || !productIdfordet) {
      setError('Please provide all details for peep view.')
      return
    }
    setLoadingPeepView(true)
    try {
      await axios.post('https://www.discountdoorandwindow.com/api/DimDoor/DoorPeepView', {
        DoorPeepView: peepViewValue,
        amount: parseFloat(peepViewAmount),
        productId: productIdfordet,
      })
      setPeepViewValue('')
      setPeepViewAmount('')
      fetchPeepView()
    } catch (err) {
      console.error('Add Peep View Error:', err)
      setError('Error adding peep view.')
    } finally {
      setLoadingPeepView(false)
    }
  }
  const handleDeletePeepView = async (id) => {
    try {
      await axios.delete(`https://www.discountdoorandwindow.com/api/DimDoor/DoorPeepView/${id}`)
      setPeepView(peepView.filter(option => option._id !== id))
    } catch (err) {
      console.error('Delete Peep View Error:', err)
      setError('Error deleting peep view.')
    }
  }

  // Hinge Color
  const fetchHingeColor = async () => {
    setLoadingHingeColor(true)
    try {
      const response = await axios.get(`https://www.discountdoorandwindow.com/api/DimDoor/DoorHingeColor/${productIdfordet}`)
      setHingeColor(Array.isArray(response.data) ? response.data : [])
    } catch (err) {
      console.error('Fetch Hinge Color Error:', err)
      setError('Error fetching hinge color.')
    } finally {
      setLoadingHingeColor(false)
    }
  }
  const handleAddHingeColor = async () => {
    if (!hingeColorValue || !hingeColorAmount || !productIdfordet) {
      setError('Please provide all details for hinge color.')
      return
    }
    setLoadingHingeColor(true)
    try {
      await axios.post('https://www.discountdoorandwindow.com/api/DimDoor/DoorHingeColor', {
        DoorHingeColor: hingeColorValue,
        amount: parseFloat(hingeColorAmount),
        productId: productIdfordet,
      })
      setHingeColorValue('')
      setHingeColorAmount('')
      fetchHingeColor()
    } catch (err) {
      console.error('Add Hinge Color Error:', err)
      setError('Error adding hinge color.')
    } finally {
      setLoadingHingeColor(false)
    }
  }
  const handleDeleteHingeColor = async (id) => {
    try {
      await axios.delete(`https://www.discountdoorandwindow.com/api/DimDoor/DoorHingeColor/${id}`)
      setHingeColor(hingeColor.filter(option => option._id !== id))
    } catch (err) {
      console.error('Delete Hinge Color Error:', err)
      setError('Error deleting hinge color.')
    }
  }

  // Door Sill
  const fetchSillOptions = async () => {
    setLoadingSill(true)
    try {
      const response = await axios.get(`https://www.discountdoorandwindow.com/api/DimDoor/DoorSill/${productIdfordet}`)
      setSillOptions(Array.isArray(response.data) ? response.data : [])
    } catch (err) {
      console.error('Fetch Sill Error:', err)
      setError('Error fetching sill options.')
    } finally {
      setLoadingSill(false)
    }
  }
  const handleAddSill = async () => {
    if (!sillValue || !sillAmount || !productIdfordet) {
      setError('Please provide all details for sill.')
      return
    }
    setLoadingSill(true)
    try {
      await axios.post('https://www.discountdoorandwindow.com/api/DimDoor/DoorSill', {
        DoorSill: sillValue,
        amount: parseFloat(sillAmount),
        productId: productIdfordet,
      })
      setSillValue('')
      setSillAmount('')
      fetchSillOptions()
    } catch (err) {
      console.error('Add Sill Error:', err)
      setError('Error adding sill option.')
    } finally {
      setLoadingSill(false)
    }
  }
  const handleDeleteSill = async (id) => {
    try {
      await axios.delete(`https://www.discountdoorandwindow.com/api/DimDoor/DoorSill/${id}`)
      setSillOptions(sillOptions.filter(option => option._id !== id))
    } catch (err) {
      console.error('Delete Sill Error:', err)
      setError('Error deleting sill option.')
    }
  }

  // Weather Strip Color
  const fetchWeatherStripColor = async () => {
    setLoadingWeatherStripColor(true)
    try {
      const response = await axios.get(`https://www.discountdoorandwindow.com/api/DimDoor/DoorWeatherStripColor/${productIdfordet}`)
      setWeatherStripColor(Array.isArray(response.data) ? response.data : [])
    } catch (err) {
      console.error('Fetch Weather Strip Color Error:', err)
      setError('Error fetching weather strip color.')
    } finally {
      setLoadingWeatherStripColor(false)
    }
  }
  const handleAddWeatherStripColor = async () => {
    if (!weatherStripColorValue || !weatherStripColorAmount || !productIdfordet) {
      setError('Please provide all details for weather strip color.')
      return
    }
    setLoadingWeatherStripColor(true)
    try {
      await axios.post('https://www.discountdoorandwindow.com/api/DimDoor/DoorWeatherStripColor', {
        DoorWeatherStripColor: weatherStripColorValue,
        amount: parseFloat(weatherStripColorAmount),
        productId: productIdfordet,
      })
      setWeatherStripColorValue('')
      setWeatherStripColorAmount('')
      fetchWeatherStripColor()
    } catch (err) {
      console.error('Add Weather Strip Color Error:', err)
      setError('Error adding weather strip color.')
    } finally {
      setLoadingWeatherStripColor(false)
    }
  }
  const handleDeleteWeatherStripColor = async (id) => {
    try {
      await axios.delete(`https://www.discountdoorandwindow.com/api/DimDoor/DoorWeatherStripColor/${id}`)
      setWeatherStripColor(weatherStripColor.filter(option => option._id !== id))
    } catch (err) {
      console.error('Delete Weather Strip Color Error:', err)
      setError('Error deleting weather strip color.')
    }
  }

  // Grid Options
  const fetchGridOptions = async () => {
    setLoadingGridOptions(true)
    try {
      const response = await axios.get(`https://www.discountdoorandwindow.com/api/DimDoor/DoorGridOptions/${productIdfordet}`)
      setGridOptions(Array.isArray(response.data) ? response.data : [])
    } catch (err) {
      console.error('Fetch Grid Options Error:', err)
      setError('Error fetching grid options.')
    } finally {
      setLoadingGridOptions(false)
    }
  }
  const handleAddGridOptions = async () => {
    if (!gridOptionValue || !gridOptionAmount || !productIdfordet) {
      setError('Please provide all details for grid options.')
      return
    }
    setLoadingGridOptions(true)
    try {
      await axios.post('https://www.discountdoorandwindow.com/api/DimDoor/DoorGridOptions', {
        DoorGridOptions: gridOptionValue,
        amount: parseFloat(gridOptionAmount),
        productId: productIdfordet,
      })
      setGridOptionValue('')
      setGridOptionAmount('')
      fetchGridOptions()
    } catch (err) {
      console.error('Add Grid Options Error:', err)
      setError('Error adding grid options.')
    } finally {
      setLoadingGridOptions(false)
    }
  }
  const handleDeleteGridOptions = async (id) => {
    try {
      await axios.delete(`https://www.discountdoorandwindow.com/api/DimDoor/DoorGridOptions/${id}`)
      setGridOptions(gridOptions.filter(option => option._id !== id))
    } catch (err) {
      console.error('Delete Grid Options Error:', err)
      setError('Error deleting grid options.')
    }
  }

  // Frame Extrusion
  const fetchFrameExtrusion = async () => {
    setLoadingFrameExtrusion(true)
    try {
      const response = await axios.get(`https://www.discountdoorandwindow.com/api/DimDoor/DoorFrameExtrusion/${productIdfordet}`)
      setFrameExtrusion(Array.isArray(response.data) ? response.data : [])
    } catch (err) {
      console.error('Fetch Frame Extrusion Error:', err)
      setError('Error fetching frame extrusion options.')
    } finally {
      setLoadingFrameExtrusion(false)
    }
  }
  const handleAddFrameExtrusion = async () => {
    if (!frameExtrusionValue || !frameExtrusionAmount || !productIdfordet) {
      setError('Please provide all details for frame extrusion.')
      return
    }
    setLoadingFrameExtrusion(true)
    try {
      await axios.post('https://www.discountdoorandwindow.com/api/DimDoor/DoorFrameExtrusion', {
        DoorFrameExtrusion: frameExtrusionValue,
        amount: parseFloat(frameExtrusionAmount),
        productId: productIdfordet,
      })
      setFrameExtrusionValue('')
      setFrameExtrusionAmount('')
      fetchFrameExtrusion()
    } catch (err) {
      console.error('Add Frame Extrusion Error:', err)
      setError('Error adding frame extrusion.')
    } finally {
      setLoadingFrameExtrusion(false)
    }
  }
  const handleDeleteFrameExtrusion = async (id) => {
    try {
      await axios.delete(`https://www.discountdoorandwindow.com/api/DimDoor/DoorFrameExtrusion/${id}`)
      setFrameExtrusion(frameExtrusion.filter(option => option._id !== id))
    } catch (err) {
      console.error('Delete Frame Extrusion Error:', err)
      setError('Error deleting frame extrusion.')
    }
  }

  // Lock Option
  const fetchLockOption = async () => {
    setLoadingLockOption(true)
    try {
      const response = await axios.get(`https://www.discountdoorandwindow.com/api/DimDoor/DoorLockOption/${productIdfordet}`)
      setLockOption(Array.isArray(response.data) ? response.data : [])
    } catch (err) {
      console.error('Fetch Lock Option Error:', err)
      setError('Error fetching lock options.')
    } finally {
      setLoadingLockOption(false)
    }
  }
  const handleAddLockOption = async () => {
    if (!lockOptionValue || !lockOptionAmount || !productIdfordet) {
      setError('Please provide all details for lock option.')
      return
    }
    setLoadingLockOption(true)
    try {
      await axios.post('https://www.discountdoorandwindow.com/api/DimDoor/DoorLockOption', {
        DoorLockOption: lockOptionValue,
        amount: parseFloat(lockOptionAmount),
        productId: productIdfordet,
      })
      setLockOptionValue('')
      setLockOptionAmount('')
      fetchLockOption()
    } catch (err) {
      console.error('Add Lock Option Error:', err)
      setError('Error adding lock option.')
    } finally {
      setLoadingLockOption(false)
    }
  }
  const handleDeleteLockOption = async (id) => {
    try {
      await axios.delete(`https://www.discountdoorandwindow.com/api/DimDoor/DoorLockOption/${id}`)
      setLockOption(lockOption.filter(option => option._id !== id))
    } catch (err) {
      console.error('Delete Lock Option Error:', err)
      setError('Error deleting lock option.')
    }
  }

  // Door Color
  const fetchDoorColor = async () => {
    setLoadingDoorColor(true)
    try {
      const response = await axios.get(`https://www.discountdoorandwindow.com/api/DimDoor/DoorColor/${productIdfordet}`)
      setDoorColor(Array.isArray(response.data) ? response.data : [])
    } catch (err) {
      console.error('Fetch Door Color Error:', err)
      setError('Error fetching door color options.')
    } finally {
      setLoadingDoorColor(false)
    }
  }
  const handleAddDoorColor = async () => {
    if (!doorColorValue || !doorColorAmount || !productIdfordet) {
      setError('Please provide all details for door color.')
      return
    }
    setLoadingDoorColor(true)
    try {
      await axios.post('https://www.discountdoorandwindow.com/api/DimDoor/DoorColor', {
        DoorColor: doorColorValue,
        amount: parseFloat(doorColorAmount),
        productId: productIdfordet,
      })
      setDoorColorValue('')
      setDoorColorAmount('')
      fetchDoorColor()
    } catch (err) {
      console.error('Add Door Color Error:', err)
      setError('Error adding door color.')
    } finally {
      setLoadingDoorColor(false)
    }
  }
  const handleDeleteDoorColor = async (id) => {
    try {
      await axios.delete(`https://www.discountdoorandwindow.com/api/DimDoor/DoorColor/${id}`)
      setDoorColor(doorColor.filter(option => option._id !== id))
    } catch (err) {
      console.error('Delete Door Color Error:', err)
      setError('Error deleting door color.')
    }
  }

  // Width Frame
  const fetchWidthFrame = async () => {
    setLoadingWidthFrame(true)
    try {
      const response = await axios.get(`https://www.discountdoorandwindow.com/api/DimDoor/DoorWidthFrame/${productIdfordet}`)
      setWidthFrame(Array.isArray(response.data) ? response.data : [])
    } catch (err) {
      console.error('Fetch Width Frame Error:', err)
      setError('Error fetching width frame options.')
    } finally {
      setLoadingWidthFrame(false)
    }
  }
  const handleAddWidthFrame = async () => {
    if (!widthFrameValue || !widthFrameAmount || !productIdfordet) {
      setError('Please provide all details for width frame.')
      return
    }
    setLoadingWidthFrame(true)
    try {
      await axios.post('https://www.discountdoorandwindow.com/api/DimDoor/DoorWidthFrame', {
        DoorWidthFrame: widthFrameValue,
        amount: parseFloat(widthFrameAmount),
        productId: productIdfordet,
      })
      setWidthFrameValue('')
      setWidthFrameAmount('')
      fetchWidthFrame()
    } catch (err) {
      console.error('Add Width Frame Error:', err)
      setError('Error adding width frame.')
    } finally {
      setLoadingWidthFrame(false)
    }
  }
  const handleDeleteWidthFrame = async (id) => {
    try {
      await axios.delete(`https://www.discountdoorandwindow.com/api/DimDoor/DoorWidthFrame/${id}`)
      setWidthFrame(widthFrame.filter(option => option._id !== id))
    } catch (err) {
      console.error('Delete Width Frame Error:', err)
      setError('Error deleting width frame.')
    }
  }

  // Jamb Size
  const fetchJambSize = async () => {
    setLoadingJambSize(true)
    try {
      const response = await axios.get(`https://www.discountdoorandwindow.com/api/DimDoor/DoorJambSize/${productIdfordet}`)
      setJambSize(Array.isArray(response.data) ? response.data : [])
    } catch (err) {
      console.error('Fetch Jamb Size Error:', err)
      setError('Error fetching jamb size options.')
    } finally {
      setLoadingJambSize(false)
    }
  }
  const handleAddJambSize = async () => {
    if (!jambSizeValue || !jambSizeAmount || !productIdfordet) {
      setError('Please provide all details for jamb size.')
      return
    }
    setLoadingJambSize(true)
    try {
      await axios.post('https://www.discountdoorandwindow.com/api/DimDoor/DoorJambSize', {
        DoorJambSize: jambSizeValue,
        amount: parseFloat(jambSizeAmount),
        productId: productIdfordet,
      })
      setJambSizeValue('')
      setJambSizeAmount('')
      fetchJambSize()
    } catch (err) {
      console.error('Add Jamb Size Error:', err)
      setError('Error adding jamb size.')
    } finally {
      setLoadingJambSize(false)
    }
  }
  const handleDeleteJambSize = async (id) => {
    try {
      await axios.delete(`https://www.discountdoorandwindow.com/api/DimDoor/DoorJambSize/${id}`)
      setJambSize(jambSize.filter(option => option._id !== id))
    } catch (err) {
      console.error('Delete Jamb Size Error:', err)
      setError('Error deleting jamb size.')
    }
  }

  // Door Shoe
  const fetchDoorShoe = async () => {
    setLoadingDoorShoe(true)
    try {
      const response = await axios.get(`https://www.discountdoorandwindow.com/api/DimDoor/DoorShoe/${productIdfordet}`)
      setDoorShoe(Array.isArray(response.data) ? response.data : [])
    } catch (err) {
      console.error('Fetch Door Shoe Error:', err)
      setError('Error fetching door shoe options.')
    } finally {
      setLoadingDoorShoe(false)
    }
  }
  const handleAddDoorShoe = async () => {
    if (!doorShoeValue || !doorShoeAmount || !productIdfordet) {
      setError('Please provide all details for door shoe.')
      return
    }
    setLoadingDoorShoe(true)
    try {
      await axios.post('https://www.discountdoorandwindow.com/api/DimDoor/DoorShoe', {
        DoorShoe: doorShoeValue,
        amount: parseFloat(doorShoeAmount),
        productId: productIdfordet,
      })
      setDoorShoeValue('')
      setDoorShoeAmount('')
      fetchDoorShoe()
    } catch (err) {
      console.error('Add Door Shoe Error:', err)
      setError('Error adding door shoe.')
    } finally {
      setLoadingDoorShoe(false)
    }
  }
  const handleDeleteDoorShoe = async (id) => {
    try {
      await axios.delete(`https://www.discountdoorandwindow.com/api/DimDoor/DoorShoe/${id}`)
      setDoorShoe(doorShoe.filter(option => option._id !== id))
    } catch (err) {
      console.error('Delete Door Shoe Error:', err)
      setError('Error deleting door shoe.')
    }
  }

  // Door Weatherstrip
  const fetchDoorWeatherstrip = async () => {
    setLoadingDoorWeatherstrip(true)
    try {
      const response = await axios.get(`https://www.discountdoorandwindow.com/api/DimDoor/DoorWeatherstrip/${productIdfordet}`)
      setDoorWeatherstrip(Array.isArray(response.data) ? response.data : [])
    } catch (err) {
      console.error('Fetch Door Weatherstrip Error:', err)
      setError('Error fetching door weatherstrip options.')
    } finally {
      setLoadingDoorWeatherstrip(false)
    }
  }
  const handleAddDoorWeatherstrip = async () => {
    if (!doorWeatherstripValue || !doorWeatherstripAmount || !productIdfordet) {
      setError('Please provide all details for door weatherstrip.')
      return
    }
    setLoadingDoorWeatherstrip(true)
    try {
      await axios.post('https://www.discountdoorandwindow.com/api/DimDoor/DoorWeatherstrip', {
        DoorWeatherstrip: doorWeatherstripValue,
        amount: parseFloat(doorWeatherstripAmount),
        productId: productIdfordet,
      })
      setDoorWeatherstripValue('')
      setDoorWeatherstripAmount('')
      fetchDoorWeatherstrip()
    } catch (err) {
      console.error('Add Door Weatherstrip Error:', err)
      setError('Error adding door weatherstrip.')
    } finally {
      setLoadingDoorWeatherstrip(false)
    }
  }
  const handleDeleteDoorWeatherstrip = async (id) => {
    try {
      await axios.delete(`https://www.discountdoorandwindow.com/api/DimDoor/DoorWeatherstrip/${id}`)
      setDoorWeatherstrip(doorWeatherstrip.filter(option => option._id !== id))
    } catch (err) {
      console.error('Delete Door Weatherstrip Error:', err)
      setError('Error deleting door weatherstrip.')
    }
  }

  // Door Hinges
  const fetchDoorHinges = async () => {
    setLoadingDoorHinges(true)
    try {
      const response = await axios.get(`https://www.discountdoorandwindow.com/api/DimDoor/DoorHinges/${productIdfordet}`)
      setDoorHinges(Array.isArray(response.data) ? response.data : [])
    } catch (err) {
      console.error('Fetch Door Hinges Error:', err)
      setError('Error fetching door hinges options.')
    } finally {
      setLoadingDoorHinges(false)
    }
  }
  const handleAddDoorHinges = async () => {
    if (!doorHingesValue || !doorHingesAmount || !productIdfordet) {
      setError('Please provide all details for door hinges.')
      return
    }
    setLoadingDoorHinges(true)
    try {
      await axios.post('https://www.discountdoorandwindow.com/api/DimDoor/DoorHinges', {
        DoorHinges: doorHingesValue,
        amount: parseFloat(doorHingesAmount),
        productId: productIdfordet,
      })
      setDoorHingesValue('')
      setDoorHingesAmount('')
      fetchDoorHinges()
    } catch (err) {
      console.error('Add Door Hinges Error:', err)
      setError('Error adding door hinges.')
    } finally {
      setLoadingDoorHinges(false)
    }
  }
  const handleDeleteDoorHinges = async (id) => {
    try {
      await axios.delete(`https://www.discountdoorandwindow.com/api/DimDoor/DoorHinges/${id}`)
      setDoorHinges(doorHinges.filter(option => option._id !== id))
    } catch (err) {
      console.error('Delete Door Hinges Error:', err)
      setError('Error deleting door hinges.')
    }
  }

  // Bore Options
  const fetchBoreOptions = async () => {
    setLoadingBoreOptions(true)
    try {
      const response = await axios.get(`https://www.discountdoorandwindow.com/api/DimDoor/DoorBoreOptions/${productIdfordet}`)
      setBoreOptions(Array.isArray(response.data) ? response.data : [])
    } catch (err) {
      console.error('Fetch Bore Options Error:', err)
      setError('Error fetching bore options.')
    } finally {
      setLoadingBoreOptions(false)
    }
  }
  const handleAddBoreOptions = async () => {
    if (!boreOptionValue || !boreOptionAmount || !productIdfordet) {
      setError('Please provide all details for bore options.')
      return
    }
    setLoadingBoreOptions(true)
    try {
      await axios.post('https://www.discountdoorandwindow.com/api/DimDoor/DoorBoreOptions', {
        DoorBoreOptions: boreOptionValue,
        amount: parseFloat(boreOptionAmount),
        productId: productIdfordet,
      })
      setBoreOptionValue('')
      setBoreOptionAmount('')
      fetchBoreOptions()
    } catch (err) {
      console.error('Add Bore Options Error:', err)
      setError('Error adding bore options.')
    } finally {
      setLoadingBoreOptions(false)
    }
  }
  const handleDeleteBoreOptions = async (id) => {
    try {
      await axios.delete(`https://www.discountdoorandwindow.com/api/DimDoor/DoorBoreOptions/${id}`)
      setBoreOptions(boreOptions.filter(option => option._id !== id))
    } catch (err) {
      console.error('Delete Bore Options Error:', err)
      setError('Error deleting bore options.')
    }
  }

  // Installation Availability
  const fetchInstallationAvailability = async () => {
    setLoadingInstallationAvailability(true)
    try {
      const response = await axios.get(`https://www.discountdoorandwindow.com/api/DimDoor/DoorInstallationAvailability/${productIdfordet}`)
      setInstallationAvailability(Array.isArray(response.data) ? response.data : [])
    } catch (err) {
      console.error('Fetch Installation Availability Error:', err)
      setError('Error fetching installation availability options.')
    } finally {
      setLoadingInstallationAvailability(false)
    }
  }
  const handleAddInstallationAvailability = async () => {
    if (!installationAvailabilityValue || !installationAvailabilityAmount || !productIdfordet) {
      setError('Please provide all details for installation availability.')
      return
    }
    setLoadingInstallationAvailability(true)
    try {
      await axios.post('https://www.discountdoorandwindow.com/api/DimDoor/DoorInstallationAvailability', {
        DoorInstallationAvailability: installationAvailabilityValue,
        amount: parseFloat(installationAvailabilityAmount),
        productId: productIdfordet,
      })
      setInstallationAvailabilityValue('')
      setInstallationAvailabilityAmount('')
      fetchInstallationAvailability()
    } catch (err) {
      console.error('Add Installation Availability Error:', err)
      setError('Error adding installation availability.')
    } finally {
      setLoadingInstallationAvailability(false)
    }
  }
  const handleDeleteInstallationAvailability = async (id) => {
    try {
      await axios.delete(`https://www.discountdoorandwindow.com/api/DimDoor/DoorInstallationAvailability/${id}`)
      setInstallationAvailability(installationAvailability.filter(option => option._id !== id))
    } catch (err) {
      console.error('Delete Installation Availability Error:', err)
      setError('Error deleting installation availability.')
    }
  }

  // Side Window Opens
  const fetchSideWindowOpens = async () => {
    setLoadingSideWindowOpens(true)
    try {
      const response = await axios.get(`https://www.discountdoorandwindow.com/api/DimDoor/DoorSideWindowOpens/${productIdfordet}`)
      setSideWindowOpens(Array.isArray(response.data) ? response.data : [])
    } catch (err) {
      console.error('Fetch Side Window Opens Error:', err)
      setError('Error fetching side window opens options.')
    } finally {
      setLoadingSideWindowOpens(false)
    } 
  }
  const handleAddSideWindowOpens = async () => {
    if (!sideWindowOpensValue || !sideWindowOpensAmount || !productIdfordet) {
      setError('Please provide all details for side window opens.')
      return
    }  
    setLoadingSideWindowOpens(true)
    try {
      await axios.post('https://www.discountdoorandwindow.com/api/DimDoor/DoorSideWindowOpens', {
        DoorSideWindowOpens: sideWindowOpensValue,
        amount: parseFloat(sideWindowOpensAmount),
        productId: productIdfordet,
      })
      setSideWindowOpensValue('')
      setSideWindowOpensAmount('')
      fetchSideWindowOpens()
    } catch (err) {
      console.error('Add Side Window Opens Error:', err)
      setError('Error adding side window opens.')
    } finally {
      setLoadingSideWindowOpens(false)
    }
  }
  const handleDeleteSideWindowOpens = async (id) => {
    try {
      await axios.delete(`https://www.discountdoorandwindow.com/api/DimDoor/DoorSideWindowOpens/${id}`)
      setSideWindowOpens(sideWindowOpens.filter(option => option._id !== id))
    } catch (err) {
      console.error('Delete Side Window Opens Error:', err)
      setError('Error deleting side window opens.')
    }
  }

  return (
    <div className="container">
      <h1 className="text-primary fw-bold text-center mt-4">Door Configurations</h1>
      {error && <CAlert color="danger">{error}</CAlert>}

      {/* Door Dimensions */}
      <div className="card my-4">
        <div className="card-body">
          <div className="form-design-dimension">
            <h3 className="mt-4">Door Dimensions</h3>
            <div>
              <CFormInput
                type="text"
                placeholder="Width x Height"
                value={dimensionValue}
                onChange={(e) => setDimensionValue(convertFraction(e.target.value))}
              />
              <CFormInput
                type="number"
                placeholder="Amount"
                value={dimensionAmount}
                onChange={(e) => setDimensionAmount(e.target.value)}
              />
              <CButton color="primary" onClick={handleAddDimension} disabled={loadingDimensions}>
                {loadingDimensions ? <CSpinner size="sm" /> : '+ Add Dimension'}
              </CButton>
            </div>
          </div>
          {entries.length > 0 ? (
            entries.map((entry) => (
              <div key={entry._id} className="my-4">
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <span className="fw-bold fs-6">{entry.DoorWidthHeight} - ${entry.amount}</span>
                  <button className="btn btn-danger" onClick={() => handleDeleteDimension(entry._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <CAlert color="info">No dimensions found.</CAlert>
          )}
        </div>
      </div>

      {/* Pre Hung Options */}
      <div className="card my-4">
        <div className="card-body">
          <div className="form-design-dimension">
            <h3 className="mt-4">Pre Hung Options</h3>
            <div>
              <CFormInput
                type="text"
                placeholder="Pre Hung Option"
                value={preHungValue}
                onChange={(e) => setPreHungValue(convertFraction(e.target.value))}
              />
              <CFormInput
                type="number"
                placeholder="Amount"
                value={preHungAmount}
                onChange={(e) => setPreHungAmount(e.target.value)}
              />
              <CButton color="primary" onClick={handleAddPreHungOption} disabled={loadingPreHung}>
                {loadingPreHung ? <CSpinner size="sm" /> : '+ Add Pre Hung'}
              </CButton>
            </div>
          </div>
          {preHungOptions.length > 0 ? (
            preHungOptions.map((option) => (
              <div key={option._id} className="my-4">
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <span className="fw-bold fs-6">{option.DoorPreHungOptions} - ${option.amount}</span>
                  <button className="btn btn-danger" onClick={() => handleDeletePreHungOption(option._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <CAlert color="info">No pre-hung options found.</CAlert>
          )}
        </div>
      </div>

      {/* Pre-finishing Options */}
      <div className="card my-4">
        <div className="card-body">
          <div className="form-design-dimension">
            <h3 className="mt-4">Pre-finishing Options</h3>
            <div>
              <CFormInput
                type="text"
                placeholder="Pre-finishing Option"
                value={preFinishingValue}
                onChange={(e) => setPreFinishingValue(convertFraction(e.target.value))}
              />
              <CFormInput
                type="number"
                placeholder="Amount"
                value={preFinishingAmount}
                onChange={(e) => setPreFinishingAmount(e.target.value)}
              />
              <CButton color="primary" onClick={handleAddPreFinishingOptions} disabled={loadingPreFinishing}>
                {loadingPreFinishing ? <CSpinner size="sm" /> : '+ Add Pre-finishing'}
              </CButton>
            </div>
          </div>
          {preFinishingOptions.length > 0 ? (
            preFinishingOptions.map((option) => (
              <div key={option._id} className="my-4">
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <span className="fw-bold fs-6">{option.DoorPreFinishingOptions} - ${option.amount}</span>
                  <button className="btn btn-danger" onClick={() => handleDeleteFinishingOption(option._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <CAlert color="info">No pre-finishing options found.</CAlert>
          )}
        </div>
      </div>

      {/* Frame Options */}
      <div className="card my-4">
        <div className="card-body">
          <div className="form-design-dimension">
            <h3 className="mt-4">Frame Options</h3>
            <div>
              <CFormInput
                type="text"
                placeholder="Frame Option"
                value={frameOptionValue}
                onChange={(e) => setFrameOptionValue(convertFraction(e.target.value))}
              />
              <CFormInput
                type="number"
                placeholder="Amount"
                value={frameOptionAmount}
                onChange={(e) => setFrameOptionAmount(e.target.value)}
              />
              <CButton color="primary" onClick={handleAddFrameOptions} disabled={loadingFrameOptions}>
                {loadingFrameOptions ? <CSpinner size="sm" /> : '+ Add Frame Option'}
              </CButton>
            </div>
          </div>
          {frameOptions.length > 0 ? (
            frameOptions.map((option) => (
              <div key={option._id} className="my-4">
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <span className="fw-bold fs-6">{option.DoorFrameOptions} - ${option.amount}</span>
                  <button className="btn btn-danger" onClick={() => handleDeleteFrameOption(option._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <CAlert color="info">No frame options found.</CAlert>
          )}
        </div>
      </div>

      {/* Swing Direction */}
      <div className="card my-4">
        <div className="card-body">
          <div className="form-design-dimension">
            <h3 className="mt-4">Swing Direction</h3>
            <div>
              <CFormInput
                type="text"
                placeholder="Swing Direction"
                value={swingDirectionValue}
                onChange={(e) => setSwingDirectionValue(convertFraction(e.target.value))}
              />
              <CFormInput
                type="number"
                placeholder="Amount"
                value={swingDirectionAmount}
                onChange={(e) => setSwingDirectionAmount(e.target.value)}
              />
              <CButton color="primary" onClick={handleAddSwingDirection} disabled={loadingSwingDirection}>
                {loadingSwingDirection ? <CSpinner size="sm" /> : '+ Add Swing Direction'}
              </CButton>
            </div>
          </div>
          {swingDirection.length > 0 ? (
            swingDirection.map((option) => (
              <div key={option._id} className="my-4">
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <span className="fw-bold fs-6">{option.DoorSwingDirection} - ${option.amount}</span>
                  <button className="btn btn-danger" onClick={() => handleDeleteSwingDirection(option._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <CAlert color="info">No swing direction options found.</CAlert>
          )}
        </div>
      </div>

      {/* Peep View */}
      <div className="card my-4">
        <div className="card-body">
          <div className="form-design-dimension">
            <h3 className="mt-4">Peep View</h3>
            <div>
              <CFormInput
                type="text"
                placeholder="Peep View"
                value={peepViewValue}
                onChange={(e) => setPeepViewValue(convertFraction(e.target.value))}
              />
              <CFormInput
                type="number"
                placeholder="Amount"
                value={peepViewAmount}
                onChange={(e) => setPeepViewAmount(e.target.value)}
              />
              <CButton color="primary" onClick={handleAddPeepView} disabled={loadingPeepView}>
                {loadingPeepView ? <CSpinner size="sm" /> : '+ Add Peep View'}
              </CButton>
            </div>
          </div>
          {peepView.length > 0 ? (
            peepView.map((option) => (
              <div key={option._id} className="my-4">
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <span className="fw-bold fs-6">{option.DoorPeepView} - ${option.amount}</span>
                  <button className="btn btn-danger" onClick={() => handleDeletePeepView(option._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <CAlert color="info">No peep view options found.</CAlert>
          )}
        </div>
      </div>

      {/* Hinge Color */}
      <div className="card my-4">
        <div className="card-body">
          <div className="form-design-dimension">
            <h3 className="mt-4">Hinge Color</h3>
            <div>
              <CFormInput
                type="text"
                placeholder="Hinge Color"
                value={hingeColorValue}
                onChange={(e) => setHingeColorValue(convertFraction(e.target.value))}
              />
              <CFormInput
                type="number"
                placeholder="Amount"
                value={hingeColorAmount}
                onChange={(e) => setHingeColorAmount(e.target.value)}
              />
              <CButton color="primary" onClick={handleAddHingeColor} disabled={loadingHingeColor}>
                {loadingHingeColor ? <CSpinner size="sm" /> : '+ Add Hinge Color'}
              </CButton>
            </div>
          </div>
          {hingeColor.length > 0 ? (
            hingeColor.map((option) => (
              <div key={option._id} className="my-4">
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <span className="fw-bold fs-6">{option.DoorHingeColor} - ${option.amount}</span>
                  <button className="btn btn-danger" onClick={() => handleDeleteHingeColor(option._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <CAlert color="info">No hinge color options found.</CAlert>
          )}
        </div>
      </div>

      {/* Door Sill */}
      <div className="card my-4">
        <div className="card-body">
          <div className="form-design-dimension">
            <h3 className="mt-4">Door Sill</h3>
            <div>
              <CFormInput
                type="text"
                placeholder="Sill Option"
                value={sillValue}
                onChange={(e) => setSillValue(convertFraction(e.target.value))}
              />
              <CFormInput
                type="number"
                placeholder="Amount"
                value={sillAmount}
                onChange={(e) => setSillAmount(e.target.value)}
              />
              <CButton color="primary" onClick={handleAddSill} disabled={loadingSill}>
                {loadingSill ? <CSpinner size="sm" /> : '+ Add Sill'}
              </CButton>
            </div>
          </div>
          {sillOptions.length > 0 ? (
            sillOptions.map((option) => (
              <div key={option._id} className="my-4">
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <span className="fw-bold fs-6">{option.DoorSill} - ${option.amount}</span>
                  <button className="btn btn-danger" onClick={() => handleDeleteSill(option._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <CAlert color="info">No sill options found.</CAlert>
          )}
        </div>
      </div>

      {/* Weather Strip Color */}
      <div className="card my-4">
        <div className="card-body">
          <div className="form-design-dimension">
            <h3 className="mt-4">Weather Strip Color</h3>
            <div>
              <CFormInput
                type="text"
                placeholder="Weather Strip Color"
                value={weatherStripColorValue}
                onChange={(e) => setWeatherStripColorValue(convertFraction(e.target.value))}
              />
              <CFormInput
                type="number"
                placeholder="Amount"
                value={weatherStripColorAmount}
                onChange={(e) => setWeatherStripColorAmount(e.target.value)}
              />
              <CButton color="primary" onClick={handleAddWeatherStripColor} disabled={loadingWeatherStripColor}>
                {loadingWeatherStripColor ? <CSpinner size="sm" /> : '+ Add Weather Strip Color'}
              </CButton>
            </div>
          </div>
          {weatherStripColor.length > 0 ? (
            weatherStripColor.map((option) => (
              <div key={option._id} className="my-4">
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <span className="fw-bold fs-6">{option.DoorWeatherStripColor} - ${option.amount}</span>
                  <button className="btn btn-danger" onClick={() => handleDeleteWeatherStripColor(option._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <CAlert color="info">No weather strip color options found.</CAlert>
          )}
        </div>
      </div>

      {/* Grid Options */}
      <div className="card my-4">
        <div className="card-body">
          <div className="form-design-dimension">
            <h3 className="mt-4">Grid Options</h3>
            <div>
              <CFormInput
                type="text"
                placeholder="Grid Option"
                value={gridOptionValue}
                onChange={(e) => setGridOptionValue(convertFraction(e.target.value))}
              />
              <CFormInput
                type="number"
                placeholder="Amount"
                value={gridOptionAmount}
                onChange={(e) => setGridOptionAmount(e.target.value)}
              />
              <CButton color="primary" onClick={handleAddGridOptions} disabled={loadingGridOptions}>
                {loadingGridOptions ? <CSpinner size="sm" /> : '+ Add Grid Option'}
              </CButton>
            </div>
          </div>
          {gridOptions.length > 0 ? (
            gridOptions.map((option) => (
              <div key={option._id} className="my-4">
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <span className="fw-bold fs-6">{option.DoorGridOptions} - ${option.amount}</span>
                  <button className="btn btn-danger" onClick={() => handleDeleteGridOptions(option._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <CAlert color="info">No grid options found.</CAlert>
          )}
        </div>
      </div>

      {/* Frame Extrusion */}
      <div className="card my-4">
        <div className="card-body">
          <div className="form-design-dimension">
            <h3 className="mt-4">Frame Extrusion</h3>
            <div>
              <CFormInput
                type="text"
                placeholder="Frame Extrusion"
                value={frameExtrusionValue}
                onChange={(e) => setFrameExtrusionValue(convertFraction(e.target.value))}
              />
              <CFormInput
                type="number"
                placeholder="Amount"
                value={frameExtrusionAmount}
                onChange={(e) => setFrameExtrusionAmount(e.target.value)}
              />
              <CButton color="primary" onClick={handleAddFrameExtrusion} disabled={loadingFrameExtrusion}>
                {loadingFrameExtrusion ? <CSpinner size="sm" /> : '+ Add Frame Extrusion'}
              </CButton>
            </div>
          </div>
          {frameExtrusion.length > 0 ? (
            frameExtrusion.map((option) => (
              <div key={option._id} className="my-4">
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <span className="fw-bold fs-6">{option.DoorFrameExtrusion} - ${option.amount}</span>
                  <button className="btn btn-danger" onClick={() => handleDeleteFrameExtrusion(option._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <CAlert color="info">No frame extrusion options found.</CAlert>
          )}
        </div>
      </div>

      {/* Lock Option */}
      <div className="card my-4">
        <div className="card-body">
          <div className="form-design-dimension">
            <h3 className="mt-4">Lock Option</h3>
            <div>
              <CFormInput
                type="text"
                placeholder="Lock Option"
                value={lockOptionValue}
                onChange={(e) => setLockOptionValue(convertFraction(e.target.value))}
              />
              <CFormInput
                type="number"
                placeholder="Amount"
                value={lockOptionAmount}
                onChange={(e) => setLockOptionAmount(e.target.value)}
              />
              <CButton color="primary" onClick={handleAddLockOption} disabled={loadingLockOption}>
                {loadingLockOption ? <CSpinner size="sm" /> : '+ Add Lock Option'}
              </CButton>
            </div>
          </div>
          {lockOption.length > 0 ? (
            lockOption.map((option) => (
              <div key={option._id} className="my-4">
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <span className="fw-bold fs-6">{option.DoorLockOption} - ${option.amount}</span>
                  <button className="btn btn-danger" onClick={() => handleDeleteLockOption(option._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <CAlert color="info">No lock options found.</CAlert>
          )}
        </div>
      </div>

      {/* Door Color */}
      <div className="card my-4">
        <div className="card-body">
          <div className="form-design-dimension">
            <h3 className="mt-4">Door Color</h3>
            <div>
              <CFormInput
                type="text"
                placeholder="Door Color"
                value={doorColorValue}
                onChange={(e) => setDoorColorValue(convertFraction(e.target.value))}
              />
              <CFormInput
                type="number"
                placeholder="Amount"
                value={doorColorAmount}
                onChange={(e) => setDoorColorAmount(e.target.value)}
              />
              <CButton color="primary" onClick={handleAddDoorColor} disabled={loadingDoorColor}>
                {loadingDoorColor ? <CSpinner size="sm" /> : '+ Add Door Color'}
              </CButton>
            </div>
          </div>
          {doorColor.length > 0 ? (
            doorColor.map((option) => (
              <div key={option._id} className="my-4">
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <span className="fw-bold fs-6">{option.DoorColor} - ${option.amount}</span>
                  <button className="btn btn-danger" onClick={() => handleDeleteDoorColor(option._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <CAlert color="info">No door color options found.</CAlert>
          )}
        </div>
      </div>

      {/* Width Frame */}
      <div className="card my-4">
        <div className="card-body">
          <div className="form-design-dimension">
            <h3 className="mt-4">Width Frame</h3>
            <div>
              <CFormInput
                type="text"
                placeholder="Width Frame"
                value={widthFrameValue}
                onChange={(e) => setWidthFrameValue(convertFraction(e.target.value))}
              />
              <CFormInput
                type="number"
                placeholder="Amount"
                value={widthFrameAmount}
                onChange={(e) => setWidthFrameAmount(e.target.value)}
              />
              <CButton color="primary" onClick={handleAddWidthFrame} disabled={loadingWidthFrame}>
                {loadingWidthFrame ? <CSpinner size="sm" /> : '+ Add Width Frame'}
              </CButton>
            </div>
          </div>
          {widthFrame.length > 0 ? (
            widthFrame.map((option) => (
              <div key={option._id} className="my-4">
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <span className="fw-bold fs-6">{option.DoorWidthFrame} - ${option.amount}</span>
                  <button className="btn btn-danger" onClick={() => handleDeleteWidthFrame(option._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <CAlert color="info">No width frame options found.</CAlert>
          )}
        </div>
      </div>

      {/* Jamb Size */}
      <div className="card my-4">
        <div className="card-body">
          <div className="form-design-dimension">
            <h3 className="mt-4">Jamb Size</h3>
            <div>
              <CFormInput
                type="text"
                placeholder="Jamb Size"
                value={jambSizeValue}
                onChange={(e) => setJambSizeValue(convertFraction(e.target.value))}
              />
              <CFormInput
                type="number"
                placeholder="Amount"
                value={jambSizeAmount}
                onChange={(e) => setJambSizeAmount(e.target.value)}
              />
              <CButton color="primary" onClick={handleAddJambSize} disabled={loadingJambSize}>
                {loadingJambSize ? <CSpinner size="sm" /> : '+ Add Jamb Size'}
              </CButton>
            </div>
          </div>
          {jambSize.length > 0 ? (
            jambSize.map((option) => (
              <div key={option._id} className="my-4">
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <span className="fw-bold fs-6">{option.DoorJambSize} - ${option.amount}</span>
                  <button className="btn btn-danger" onClick={() => handleDeleteJambSize(option._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <CAlert color="info">No jamb size options found.</CAlert>
          )}
        </div>
      </div>

      {/* Door Shoe */}
      <div className="card my-4">
        <div className="card-body">
          <div className="form-design-dimension">
            <h3 className="mt-4">Door Shoe</h3>
            <div>
              <CFormInput
                type="text"
                placeholder="Door Shoe"
                value={doorShoeValue}
                onChange={(e) => setDoorShoeValue(convertFraction(e.target.value))}
              />
              <CFormInput
                type="number"
                placeholder="Amount"
                value={doorShoeAmount}
                onChange={(e) => setDoorShoeAmount(e.target.value)}
              />
              <CButton color="primary" onClick={handleAddDoorShoe} disabled={loadingDoorShoe}>
                {loadingDoorShoe ? <CSpinner size="sm" /> : '+ Add Door Shoe'}
              </CButton>
            </div>
          </div>
          {doorShoe.length > 0 ? (
            doorShoe.map((option) => (
              <div key={option._id} className="my-4">
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <span className="fw-bold fs-6">{option.DoorShoe} - ${option.amount}</span>
                  <button className="btn btn-danger" onClick={() => handleDeleteDoorShoe(option._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <CAlert color="info">No door shoe options found.</CAlert>
          )}
        </div>
      </div>

      {/* Door Weatherstrip */}
      <div className="card my-4">
        <div className="card-body">
          <div className="form-design-dimension">
            <h3 className="mt-4">Door Weatherstrip</h3>
            <div>
              <CFormInput
                type="text"
                placeholder="Door Weatherstrip"
                value={doorWeatherstripValue}
                onChange={(e) => setDoorWeatherstripValue(convertFraction(e.target.value))}
              />
              <CFormInput
                type="number"
                placeholder="Amount"
                value={doorWeatherstripAmount}
                onChange={(e) => setDoorWeatherstripAmount(e.target.value)}
              />
              <CButton color="primary" onClick={handleAddDoorWeatherstrip} disabled={loadingDoorWeatherstrip}>
                {loadingDoorWeatherstrip ? <CSpinner size="sm" /> : '+ Add Door Weatherstrip'}
              </CButton>
            </div>
          </div>
          {doorWeatherstrip.length > 0 ? (
            doorWeatherstrip.map((option) => (
              <div key={option._id} className="my-4">
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <span className="fw-bold fs-6">{option.DoorWeatherstrip} - ${option.amount}</span>
                  <button className="btn btn-danger" onClick={() => handleDeleteDoorWeatherstrip(option._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <CAlert color="info">No door weatherstrip options found.</CAlert>
          )}
        </div>
      </div>

      {/* Door Hinges */}
      <div className="card my-4">
        <div className="card-body">
          <div className="form-design-dimension">
            <h3 className="mt-4">Door Hinges</h3>
            <div>
              <CFormInput
                type="text"
                placeholder="Door Hinges"
                value={doorHingesValue}
                onChange={(e) => setDoorHingesValue(convertFraction(e.target.value))}
              />
              <CFormInput
                type="number"
                placeholder="Amount"
                value={doorHingesAmount}
                onChange={(e) => setDoorHingesAmount(e.target.value)}
              />
              <CButton color="primary" onClick={handleAddDoorHinges} disabled={loadingDoorHinges}>
                {loadingDoorHinges ? <CSpinner size="sm" /> : '+ Add Door Hinges'}
              </CButton>
            </div>
          </div>
          {doorHinges.length > 0 ? (
            doorHinges.map((option) => (
              <div key={option._id} className="my-4">
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <span className="fw-bold fs-6">{option.DoorHinges} - ${option.amount}</span>
                  <button className="btn btn-danger" onClick={() => handleDeleteDoorHinges(option._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <CAlert color="info">No door hinges options found.</CAlert>
          )}
        </div>
      </div>

      {/* Bore Options */}
      <div className="card my-4">
        <div className="card-body">
          <div className="form-design-dimension">
            <h3 className="mt-4">Bore Options</h3>
            <div>
              <CFormInput
                type="text"
                placeholder="Bore Option"
                value={boreOptionValue}
                onChange={(e) => setBoreOptionValue(convertFraction(e.target.value))}
              />
              <CFormInput
                type="number"
                placeholder="Amount"
                value={boreOptionAmount}
                onChange={(e) => setBoreOptionAmount(e.target.value)}
              />
              <CButton color="primary" onClick={handleAddBoreOptions} disabled={loadingBoreOptions}>
                {loadingBoreOptions ? <CSpinner size="sm" /> : '+ Add Bore Option'}
              </CButton>
            </div>
          </div>
          {boreOptions.length > 0 ? (
            boreOptions.map((option) => (
              <div key={option._id} className="my-4">
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <span className="fw-bold fs-6">{option.DoorBoreOptions} - ${option.amount}</span>
                  <button className="btn btn-danger" onClick={() => handleDeleteBoreOptions(option._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <CAlert color="info">No bore options found.</CAlert>
          )}
        </div>
      </div>

      {/* Installation Availability */}
      <div className="card my-4">
        <div className="card-body">
          <div className="form-design-dimension">
            <h3 className="mt-4">Installation Availability</h3>
            <div>
              <CFormInput
                type="text"
                placeholder="Installation Availability"
                value={installationAvailabilityValue}
                onChange={(e) => setInstallationAvailabilityValue(convertFraction(e.target.value))}
              />
              <CFormInput
                type="number"
                placeholder="Amount"
                value={installationAvailabilityAmount}
                onChange={(e) => setInstallationAvailabilityAmount(e.target.value)}
              />
              <CButton color="primary" onClick={handleAddInstallationAvailability} disabled={loadingInstallationAvailability}>
                {loadingInstallationAvailability ? <CSpinner size="sm" /> : '+ Add Installation Availability'}
              </CButton>
            </div>
          </div>
          {installationAvailability.length > 0 ? (
            installationAvailability.map((option) => (
              <div key={option._id} className="my-4">
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <span className="fw-bold fs-6">{option.DoorInstallationAvailability} - ${option.amount}</span>
                  <button className="btn btn-danger" onClick={() => handleDeleteInstallationAvailability(option._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <CAlert color="info">No installation availability options found.</CAlert>
          )}
        </div>
      </div>

      {/* Side Window Opens */}
      <div className="card my-4">
        <div className="card-body">
          <div className="form-design-dimension">
            <h3 className="mt-4">Side Window Opens</h3>
            <div>
              <CFormInput
                type="text"
                placeholder="Side Window Opens"
                value={sideWindowOpensValue}
                onChange={(e) => setSideWindowOpensValue(convertFraction(e.target.value))}
              />
              <CFormInput
                type="number"
                placeholder="Amount"
                value={sideWindowOpensAmount}
                onChange={(e) => setSideWindowOpensAmount(e.target.value)}
              />
              <CButton color="primary" onClick={handleAddSideWindowOpens} disabled={loadingSideWindowOpens}>
                {loadingSideWindowOpens ? <CSpinner size="sm" /> : '+ Add Side Window Opens'}
              </CButton>
            </div>
          </div>
          {sideWindowOpens.length > 0 ? (
            sideWindowOpens.map((option) => (
              <div key={option._id} className="my-4">
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <span className="fw-bold fs-6">{option.DoorSideWindowOpens} - ${option.amount}</span>
                  <button className="btn btn-danger" onClick={() => handleDeleteSideWindowOpens(option._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <CAlert color="info">No side window opens options found.</CAlert>
          )}
        </div>
      </div>
    </div>
  )
}

export default DimensionsProductDoors
