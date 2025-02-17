import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CCard, CCardBody, CCardTitle, CFormInput, CButton, CSpinner, CAlert } from '@coreui/react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';

const DimensionsProductDoors = () => {
    const [entries, setEntries] = useState([]); // For Door Dimensions
    const [preHungOptions, setPreHungOptions] = useState([]);
    const [frameSize, setFrameSize] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const location = useLocation();
    const { productIdfordet } = location.state || {};
    const [preFinishingOptions, setPreFinishingOptions] = useState([]);
    const [FrameOptions, setFrameOptions] = useState([]);
    const [SwingDirection, setSwingDirection] = useState([]);
    const [PeepView, setPeepView] = useState([]);
    const [HingeColor, setHingeColor] = useState([]);
    const [Sill, setSill] = useState([]);
    const [weatherStripColor, setWeatherStripColor] = useState([]);


    useEffect(() => {
        if (!productIdfordet) return;
        fetchEntries();
        fetchPreHungOptions();
        fetchPreFinishingOptions();
        fetchFrameOptions();
        fetchSwingDirection();
        fetchPeepView();
        fetchHingeColor();
        fetchSill();
        fetchWeatherStripColor();
    }, [productIdfordet]);

 // Fetch Weather Strip Color
const fetchWeatherStripColor = async () => {
    setLoading(true);
    try {
        const response = await axios.get(`http://44.196.64.110:7878/api/DimDoor/DoorWeatherStripColor/${productIdfordet}`);
        setWeatherStripColor(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
        setError("Error fetching weather strip options.");
        console.error(err); // Log error
    } finally {
        setLoading(false);
    }
};

// Add Weather Strip Color
const handleAddWeatherStripColor = async () => {
    if (!frameSize.trim() || !amount.trim() || !productIdfordet) {
        setError("Please provide all details.");
        return;
    }
    setLoading(true);
    try {
        await axios.post('http://44.196.64.110:7878/api/DimDoor/DoorWeatherStripColor', {
            DoorWeatherStripColor: frameSize.trim(),
            amount: parseFloat(amount.trim()),
            productId: productIdfordet,
        });
        setFrameSize('');
        setAmount('');
        fetchWeatherStripColor();
    } catch (err) {
        setError("Error adding weather strip option.");
    } finally {
        setLoading(false);
    }
};

// Delete Weather Strip Color
const handleDeleteWeatherStripColor = async (id) => {
    try {
        await axios.delete(`http://44.196.64.110:7878/api/DimDoor/DoorWeatherStripColor/${id}`);
        setWeatherStripColor(weatherStripColor.filter(option => option._id !== id)); // Update state to remove the deleted option
    } catch (err) {
        setError("Error deleting weather strip option.");
        console.error(err); // Log error
    }
};

    // Add Sill
    const fetchSill = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://44.196.64.110:7878/api/DimDoor/DoorSill/${productIdfordet}`);
            console.log('Sill Data:', response.data); // Log response
            setSill(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            setError("Error fetching sill options.");
            console.error(err); // Log error
        } finally {
            setLoading(false);
        }
    };

    // ✅ Add Sill
    const handleAddSill = async () => {
        if (!frameSize.trim() || !amount.trim() || !productIdfordet) {
            setError("Please provide all details.");
            return;
        }
        setLoading(true);
        try {
            await axios.post('http://44.196.64.110:7878/api/DimDoor/DoorSill', {
                DoorSill: frameSize.trim(),
                amount: parseFloat(amount.trim()),
                productId: productIdfordet,
            });
            setFrameSize('');
            setAmount('');
            fetchSill();
        } catch (err) {
            setError("Error adding frame option.");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Delete Sill
    const handleDeleteSill = async (id) => {
        try {
            await axios.delete(`http://44.196.64.110:7878/api/DimDoor/DoorSill/${id}`);
            setSill(Sill.filter(option => option._id !== id)); // Use Sill array here
        } catch (err) {
            setError("Error deleting sill option.");
            console.error(err); // Log error
        }
    };

    // Add Hinge Color  
    const fetchHingeColor = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://44.196.64.110:7878/api/DimDoor/DoorHingeColor/${productIdfordet}`
            );
            setHingeColor(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            setError("Error Hinge Color.");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Add Peep View
    const handleAddHingeColor = async () => {
        if (!frameSize || !amount || !productIdfordet) {
            setError("Please provide all details.");
            return;
        }
        setLoading(true);
        try {
            await axios.post('http://44.196.64.110:7878/api/DimDoor/DoorHingeColor', {
                DoorHingeColor: frameSize,
                amount: parseFloat(amount),
                productId: productIdfordet,
            });
            setFrameSize('');
            setAmount('');
            fetchHingeColor();
        } catch (err) {
            setError("Error adding frame option.");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Delete Peep View
    const handleDeleteHingeColor = async (id) => {
        try {
            await axios.delete(`http://44.196.64.110:7878/api/DimDoor/DoorHingeColor/${id}`);
            setHingeColor(FrameOptions.filter(option => option._id !== id));
        } catch (err) {
            console.error("Delete Frame Options Error:", err);
            setError("Error deleting frame option.");
        }
    };

    // ✅ Fetch Door Dimensions
    const fetchEntries = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://44.196.64.110:7878/api/DimDoor/DoorWidthHeight/${productIdfordet}`
            );
            setEntries(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            console.error("Fetch Dimensions Error:", err);
            setError("Error fetching dimensions.");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Fetch Pre Hung Options
    const fetchPreHungOptions = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://44.196.64.110:7878/api/DimDoor/DoorPreHungOptions/${productIdfordet}`
            );
            setPreHungOptions(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            console.error("Fetch Pre Hung Error:", err);
            setError("Error fetching pre-hung options.");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Add Door Dimension
    const handleAddDimension = async () => {
        if (!frameSize || !amount || !productIdfordet) {
            setError("Please provide all details.");
            return;
        }
        setLoading(true);
        try {
            await axios.post('http://44.196.64.110:7878/api/DimDoor/DoorWidthHeight', {
                DoorWidthHeight: frameSize,
                amount: parseFloat(amount),
                productId: productIdfordet,
            });
            setFrameSize('');
            setAmount('');
            fetchEntries();
        } catch (err) {
            console.error("Add Dimension Error:", err);
            setError("Error adding dimension.");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Add Pre Hung Option
    const handleAddPreHungOption = async () => {
        if (!frameSize || !amount || !productIdfordet) {
            setError("Please provide all details.");
            return;
        }
        setLoading(true);
        try {
            await axios.post('http://44.196.64.110:7878/api/DimDoor/DoorPreHungOptions', {
                DoorPreHungOptions: frameSize,
                amount: parseFloat(amount),
                productId: productIdfordet,
            });
            setFrameSize('');
            setAmount('');
            fetchPreHungOptions(); // ✅ Refresh Pre Hung Options
        } catch (err) {
            console.error("Add Pre Hung Error:", err);
            setError("Error adding pre-hung option.");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Delete Door Dimension
    const handleDeleteDimension = async (id) => {
        try {
            await axios.delete(`http://44.196.64.110:7878/api/DimDoor/DoorWidthHeight/${id}`);
            setEntries(entries.filter(entry => entry._id !== id));
        } catch (err) {
            console.error("Delete Dimension Error:", err);
            setError("Error deleting dimension.");
        }
    };

    // ✅ Delete Pre Hung Option
    const handleDeletePreHungOption = async (id) => {
        try {
            await axios.delete(`http://44.196.64.110:7878/api/DimDoor/DoorPreHungOptions/${id}`);
            setPreHungOptions(preHungOptions.filter(option => option._id !== id));
        } catch (err) {
            console.error("Delete Pre Hung Error:", err);
            setError("Error deleting pre-hung option.");
        }
    };

    // ✅ Fetch Pre-finishing Options
    const fetchPreFinishingOptions = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://44.196.64.110:7878/api/DimDoor/DoorPreFinishingOptions/${productIdfordet}`
            );
            console.log("🔍 Pre-finishing API Response:", response.data); // ✅ Debugging log

            setPreFinishingOptions(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            console.error("Fetch Pre-finishing Error:", err);
            setError("Error fetching pre-finishing options.");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Add Pre-finishing Option
    const handleAddPreFinishingOptions = async () => {
        if (!frameSize || !amount || !productIdfordet) {
            setError("Please provide all details.");
            return;
        }
        setLoading(true);
        try {
            await axios.post('http://44.196.64.110:7878/api/DimDoor/DoorPreFinishingOptions', {
                DoorPreFinishingOptions: frameSize,
                amount: parseFloat(amount),
                productId: productIdfordet,
            });
            console.log("✅ Added Pre-finishing Option:", frameSize, amount);
            setFrameSize('');
            setAmount('');
            fetchPreFinishingOptions(); // ✅ Refresh Pre-Finishing Options
        } catch (err) {
            console.error("Add Pre-finishing Error:", err);
            setError("Error adding pre-finishing option.");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Delete Pre-finishing Option
    const handleDeleteFinishingOption = async (id) => {
        try {
            await axios.delete(`http://44.196.64.110:7878/api/DimDoor/DoorPreFinishingOptions/${id}`); // ✅ Fixed API endpoint
            setPreFinishingOptions(preFinishingOptions.filter(option => option._id !== id));
        } catch (err) {
            console.error("Delete Pre-finishing Error:", err);
            setError("Error deleting pre-finishing option.");
        }
    };

    // ✅ Fetch Select Frame Options
    const fetchFrameOptions = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://44.196.64.110:7878/api/DimDoor/DoorFrameOptions/${productIdfordet}`
            );
            console.log("🔍 Frame Options API Response:", response.data); // ✅ Debugging log
            setFrameOptions(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            console.error("Fetch Frame Options Error:", err);
            setError("Error fetching frame options.");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Add Select Frame Options
    const handleAddFrameOptions = async () => {
        if (!frameSize || !amount || !productIdfordet) {
            setError("Please provide all details.");
            return;
        }
        setLoading(true);
        try {
            await axios.post('http://44.196.64.110:7878/api/DimDoor/DoorFrameOptions', {
                DoorFrameOptions: frameSize,
                amount: parseFloat(amount),
                productId: productIdfordet,
            });
            console.log("✅ Added Frame Option:", frameSize, amount); // ✅ Debugging log
            setFrameSize('');
            setAmount('');
            fetchFrameOptions(); // ✅ Refresh Frame Options
        } catch (err) {
            console.error("Add Frame Options Error:", err);
            setError("Error adding frame option.");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Delete Select Frame Options
    const handleDeleteFrameOption = async (id) => {
        try {
            await axios.delete(`http://44.196.64.110:7878/api/DimDoor/DoorFrameOptions/${id}`);
            setFrameOptions(FrameOptions.filter(option => option._id !== id)); // ✅ Fixed state update
        } catch (err) {
            console.error("Delete Frame Options Error:", err);
            setError("Error deleting frame option.");
        }
    };

    // ✅ Fetch Select Door Swing Direction
    const fetchSwingDirection = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://44.196.64.110:7878/api/DimDoor/DoorSwingDirection/${productIdfordet}`
            );
            setSwingDirection(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            console.error("Fetch Frame Options Error:", err);
            setError("Error fetching frame options.");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Add Select Door Swing Direction
    const handleAddSwingDirection = async () => {
        if (!frameSize || !amount || !productIdfordet) {
            setError("Please provide all details.");
            return;
        }
        setLoading(true);
        try {
            await axios.post('http://44.196.64.110:7878/api/DimDoor/DoorSwingDirection', {
                DoorSwingDirection: frameSize,
                amount: parseFloat(amount),
                productId: productIdfordet,
            });
            console.log("✅ Added Frame Option:", frameSize, amount); // ✅ Debugging log
            setFrameSize('');
            setAmount('');
            fetchSwingDirection();
        } catch (err) {
            console.error("Add Frame Options Error:", err);
            setError("Error adding frame option.");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Delete Select Door Swing Direction
    const handleDeleteSwingDirection = async (id) => {
        try {
            await axios.delete(`http://44.196.64.110:7878/api/DimDoor/DoorSwingDirection/${id}`);
            setSwingDirection(FrameOptions.filter(option => option._id !== id));
        } catch (err) {
            console.error("Delete Frame Options Error:", err);
            setError("Error deleting frame option.");
        }
    };

    // ✅ Fetch Peep View 
    const fetchPeepView = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://44.196.64.110:7878/api/DimDoor/DoorPeepView/${productIdfordet}`
            );
            setPeepView(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            setError("Error fetching Peep View.");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Add Peep View
    const handleAddPeepView = async () => {
        if (!frameSize || !amount || !productIdfordet) {
            setError("Please provide all details.");
            return;
        }
        setLoading(true);
        try {
            await axios.post('http://44.196.64.110:7878/api/DimDoor/DoorPeepView', {
                DoorPeepView: frameSize,
                amount: parseFloat(amount),
                productId: productIdfordet,
            });
            setFrameSize('');
            setAmount('');
            fetchPeepView();
        } catch (err) {
            setError("Error adding frame option.");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Delete Peep View
    const handleDeletePeepView = async (id) => {
        try {
            await axios.delete(`http://44.196.64.110:7878/api/DimDoor/DoorPeepView/${id}`);
            setPeepView(FrameOptions.filter(option => option._id !== id));
        } catch (err) {
            console.error("Delete Frame Options Error:", err);
            setError("Error deleting frame option.");
        }
    };

    return (
        <div className="container">
            <h1 className="text-primary fw-bold text-center mt-4">Door Configurations</h1>
            {error && <CAlert color="danger">{error}</CAlert>}

            {/* 🔹 Door Dimensions */}
            <h3 className="mt-4">Door Dimensions</h3>
            <CFormInput type="text" placeholder="Width x Height" value={frameSize} onChange={(e) => setFrameSize(e.target.value)} />
            <CFormInput type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <CButton color="primary" onClick={handleAddDimension} disabled={loading}>
                {loading ? <CSpinner size="sm" /> : '+ Add Dimension'}
            </CButton>

            {entries.length > 0 ? (
                entries.map((entry) => (
                    <CCard key={entry._id} className="mt-2 p-3">
                        <CCardBody>
                            <CCardTitle>{entry.DoorWidthHeight} - ${entry.amount}</CCardTitle>
                            <CButton color="danger" size="sm" onClick={() => handleDeleteDimension(entry._id)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </CButton>
                        </CCardBody>
                    </CCard>
                ))
            ) : (
                <CAlert color="info">No dimensions found.</CAlert>
            )}

            {/* 🔹 Pre Hung Options */}
            <h3 className="mt-4">Pre Hung Options</h3>
            <CFormInput type="text" placeholder="Pre Hung Option" value={frameSize} onChange={(e) => setFrameSize(e.target.value)} />
            <CFormInput type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <CButton color="primary" onClick={handleAddPreHungOption} disabled={loading}>
                {loading ? <CSpinner size="sm" /> : '+ Add Pre Hung'}
            </CButton>

            {preHungOptions.length > 0 ? (
                preHungOptions.map((option) => (
                    <CCard key={option._id} className="mt-2 p-3">
                        <CCardBody>
                            <CCardTitle>{option.DoorPreHungOptions} - ${option.amount}</CCardTitle>
                            <CButton color="danger" size="sm" onClick={() => handleDeletePreHungOption(option._id)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </CButton>
                        </CCardBody>
                    </CCard>
                ))
            ) : (
                <CAlert color="info">No pre-hung options found.</CAlert>
            )}

            {/* 🔹 Pre-finishing Options */}
            <h3 className="mt-4">Pre-finishing Options</h3>
            <CFormInput
                type="text"
                placeholder="Pre-finishing Option"
                value={frameSize}
                onChange={(e) => setFrameSize(e.target.value)}
            />
            <CFormInput
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <CButton color="primary" onClick={handleAddPreFinishingOptions} disabled={loading}>
                {loading ? <CSpinner size="sm" /> : '+ Add Pre-finishing'}
            </CButton>

            {preFinishingOptions.length > 0 ? (
                preFinishingOptions.map((option) => (
                    <CCard key={option._id} className="mt-2 p-3">
                        <CCardBody>
                            <CCardTitle>{option.DoorPreFinishingOptions} - ${option.amount}</CCardTitle>
                            <CButton color="danger" size="sm" onClick={() => handleDeleteFinishingOption(option._id)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </CButton>
                        </CCardBody>
                    </CCard>
                ))
            ) : (
                <CAlert color="info">No pre-finishing options found.</CAlert>
            )}

            {/* 🔹 Select Frame Options */}
            <h3 className="mt-4">Frame Options</h3>
            <CFormInput
                type="text"
                placeholder="Frame Option"
                value={frameSize}
                onChange={(e) => setFrameSize(e.target.value)}
            />
            <CFormInput
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <CButton color="primary" onClick={handleAddFrameOptions} disabled={loading}>
                {loading ? <CSpinner size="sm" /> : '+ Add Frame Option'}
            </CButton>

            {FrameOptions.length > 0 ? (
                FrameOptions.map((option) => (
                    <CCard key={option._id} className="mt-2 p-3">
                        <CCardBody>
                            <CCardTitle>{option.DoorFrameOptions} - ${option.amount}</CCardTitle> {/* ✅ Fixed field name */}
                            <CButton color="danger" size="sm" onClick={() => handleDeleteFrameOption(option._id)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </CButton>
                        </CCardBody>
                    </CCard>
                ))
            ) : (
                <CAlert color="info">No frame options found.</CAlert>
            )}

            {/* 🔹 Select Door Swing Direction */}
            <h3 className="mt-4">Swing Direction</h3>
            <CFormInput
                type="text"
                placeholder="Swing Direction"
                value={frameSize}
                onChange={(e) => setFrameSize(e.target.value)}
            />
            <CFormInput
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <CButton color="primary" onClick={handleAddSwingDirection} disabled={loading}>
                {loading ? <CSpinner size="sm" /> : '+ Add Swing Direction'}
            </CButton>

            {SwingDirection.length > 0 ? (
                SwingDirection.map((option) => (
                    <CCard key={option._id} className="mt-2 p-3">
                        <CCardBody>
                            <CCardTitle>{option.DoorSwingDirection} - ${option.amount}</CCardTitle>
                            <CButton color="danger" size="sm" onClick={() => handleDeleteSwingDirection(option._id)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </CButton>
                        </CCardBody>
                    </CCard>
                ))
            ) : (
                <CAlert color="info">No frame options found.</CAlert>
            )}

            {/* 🔹 Peep View  */}
            <h3 className="mt-4">Peep View </h3>
            <CFormInput
                type="text"
                placeholder="Peep View"
                value={frameSize}
                onChange={(e) => setFrameSize(e.target.value)}
            />
            <CFormInput
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <CButton color="primary" onClick={handleAddPeepView} disabled={loading}>
                {loading ? <CSpinner size="sm" /> : '+ Add Peep View'}
            </CButton>

            {PeepView.length > 0 ? (
                PeepView.map((option) => (
                    <CCard key={option._id} className="mt-2 p-3">
                        <CCardBody>
                            <CCardTitle>{option.DoorPeepView} - ${option.amount}</CCardTitle>
                            <CButton color="danger" size="sm" onClick={() => handleDeletePeepView(option._id)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </CButton>
                        </CCardBody>
                    </CCard>
                ))
            ) : (
                <CAlert color="info">No frame options found.</CAlert>
            )}
            {/* 🔹 Hinge Color  */}
            <h3 className="mt-4">Hinge Color</h3>
            <CFormInput
                type="text"
                placeholder="Hinge Color"
                value={frameSize}
                onChange={(e) => setFrameSize(e.target.value)}
            />
            <CFormInput
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <CButton color="primary" onClick={handleAddHingeColor} disabled={loading}>
                {loading ? <CSpinner size="sm" /> : '+ Add Hinge Color'}
            </CButton>

            {HingeColor.length > 0 ? (
                HingeColor.map((option) => (
                    <CCard key={option._id} className="mt-2 p-3">
                        <CCardBody>
                            <CCardTitle>{option.DoorHingeColor} - ${option.amount}</CCardTitle>
                            <CButton color="danger" size="sm" onClick={() => handleDeleteHingeColor(option._id)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </CButton>
                        </CCardBody>
                    </CCard>
                ))
            ) : (
                <CAlert color="info">No pre-finishing options found.</CAlert>
            )}

            {/* 🔹 sill  */}
            <h3 className="mt-4">Sill</h3>
            <CFormInput
                type="text"
                placeholder="Sill"
                value={frameSize}
                onChange={(e) => setFrameSize(e.target.value)}
            />
            <CFormInput
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <CButton color="primary" onClick={handleAddSill} disabled={loading}>
                {loading ? <CSpinner size="sm" /> : '+ Add Sill'}
            </CButton>

            {Sill.length > 0 ? (
                Sill.map((option) => (
                    <CCard key={option._id} className="mt-2 p-3">
                        <CCardBody>
                            <CCardTitle>{option.DoorSill} - ${option.amount}</CCardTitle>
                            <CButton color="danger" size="sm" onClick={() => handleDeleteSill(option._id)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </CButton>
                        </CCardBody>
                    </CCard>
                ))
            ) : (
                <CAlert color="info">No pre-finishing options found.</CAlert>
            )}


<h3 className="mt-4">Weather Strip Color</h3>
        <CFormInput
            type="text"
            placeholder="Weather Strip Color"
            value={frameSize}
            onChange={(e) => setFrameSize(e.target.value)}
        />
        <CFormInput
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
        />
        <CButton color="primary" onClick={handleAddWeatherStripColor} disabled={loading}>
            {loading ? <CSpinner size="sm" /> : '+ Add Weather Strip Color'}
        </CButton>

        {weatherStripColor.length > 0 ? (
            weatherStripColor.map((option) => (
                <CCard key={option._id} className="mt-2 p-3">
                    <CCardBody>
                        <CCardTitle>{option.DoorWeatherStripColor} - ${option.amount}</CCardTitle>
                        <CButton color="danger" size="sm" onClick={() => handleDeleteWeatherStripColor(option._id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </CButton>
                    </CCardBody>
                </CCard>
            ))
        ) : (
            <CAlert color="info">No weather strip colors available.</CAlert>
        )}

        </div>
    );
};

export default DimensionsProductDoors;
