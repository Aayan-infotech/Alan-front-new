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
    const [preFinishingOptions, setPreFinishingOptions] = useState([]); // ✅ Correct state initialization


    useEffect(() => {
        if (!productIdfordet) return;
        fetchEntries();
        fetchPreHungOptions();
        fetchPreFinishingOptions();
    }, [productIdfordet]);

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

        </div>
    );
};

export default DimensionsProductDoors;
