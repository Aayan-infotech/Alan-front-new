import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CCard, CCardBody, CCardTitle, CCardText, CFormInput, CButton, CSpinner, CAlert } from '@coreui/react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';

const DimensionsProductDoors = () => {
    const [entries, setEntries] = useState([]);
    const [frameSize, setFrameSize] = useState('');
    const [amount, setamount] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [product, setProduct] = useState(null);
    const location = useLocation();
    const { productIdfordet } = location.state || {};

    // ✅ Fetch product details
    useEffect(() => {
        if (!productIdfordet) return;
        fetchEntries();
    }, [productIdfordet]);

    const fetchEntries = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://44.196.64.110:7878/api/DimDoor/DoorWidthHeight/${productIdfordet}`
            );

            // console.log("🔍 Full API Response:", response);
            // console.log("📌 Expected Data:", response.data);
            if (Array.isArray(response.data)) {
                setEntries(response.data); // ✅ Correctly setting state
            } else {
                setEntries([]); // Fallback in case of unexpected structure
                console.error("❌ Unexpected Data Structure:", response.data);
            }
        } catch (err) {
            console.error("Fetch Dimensions Error:", err);
            setError("");
        } finally {
            setLoading(false);
        }
    };
    // ✅ Log state to check re-renders
    useEffect(() => {
        console.log("Updated Entries:", entries);
    }, [entries]);

    useEffect(() => {
        if (!productIdfordet) return;

        const fetchProductData = async () => {
            try {
                const response = await axios.get(`http://44.196.64.110:7878/api/products/getProductsbyid/${productIdfordet}`);
                setProduct(response.data);  // Set the product state with fetched data
                console.log("Fetched Product Data:", response.data);
            } catch (err) {
                setError('Error fetching product data');
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, [productIdfordet]);

    // ✅ Handle Add Entry
    const handleAdd = async () => {
        if (!frameSize || !amount || !productIdfordet) {
            setError("Please provide all details.");
            return;
        }
        try {
            setLoading(true);
            const response = await axios.post('http://44.196.64.110:7878/api/DimDoor/DoorWidthHeight', {
                DoorWidthHeight: frameSize,
                amount: parseFloat(amount),
                productId: productIdfordet,
            });
            await fetchEntries();
            setFrameSize('');
            setamount('');
        } catch (err) {
            console.error("Add Entry Error:", err);
            setError('Error adding entry');
        } finally {
            setLoading(false);
        }
    };

    // ✅ Handle Delete Entry
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://44.196.64.110:7878/api/DimDoor/DoorWidthHeight/${id}`);
            setEntries(entries.filter(entry => entry._id !== id));
        } catch (err) {
            console.error("Delete Entry Error:", err);
            setError('Error deleting entry');
        }
    };

    return (
        <div className="d-flex flex-column align-items-center mt-4">
            <h1 className="mb-4 text-primary fw-bold"> Door Dimensions</h1>
            {error && <CAlert color="danger" className="text-center">{error}</CAlert>}
            <div className='row gy-4 gx-3  w-100'>
                <div className='col-6 ms-auto'>
                    <CCard className="shadow-lg border-primary rounded-3 p-3 w-100">
                        <CCardBody>
                            <CCardTitle className="text-center text-uppercase fw-bold text-dark">
                                {product ? product.name : <CSpinner size="sm" />}
                            </CCardTitle>
                            <hr />
                            {/* <CFormInput type="text" placeholder="Width x Height" value={frameSize} onChange={(e) => setFrameSize(e.target.value)} className="mb-3" /> */}
                            <CFormInput
                                type="text"
                                placeholder="Width x Height"
                                value={frameSize}
                                onChange={(e) => {
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
                                    };

                                    let newValue = e.target.value;
                                    Object.keys(fractionMap).forEach((key) => {
                                        newValue = newValue.replace(new RegExp(key, "g"), fractionMap[key]);
                                    });

                                    setFrameSize(newValue);
                                }}
                                className="mb-3"
                            />

                            <CFormInput type="number" placeholder="Amount" value={amount} onChange={(e) => setamount(e.target.value)} className="mb-3" />
                            <CButton color="primary" onClick={handleAdd} disabled={loading}>{loading ? <CSpinner size="sm" /> : '+ Add'}</CButton>
                        </CCardBody>
                    </CCard>
                </div>
                <div className='col-4 me-auto'>
                    <div className=" w-100">
                        {entries.length > 0 ? (
                            entries.map((entry, index) => (
                                <CCard key={entry._id || index} className="mb-2 shadow-sm p-2 d-flex flex-row justify-content-between align-items-center">
                                    <div className="d-flex flex-row justify-content-between w-100 align-items-center">
                                        <div className='d-flex flex-column gap-2 text-start fw-semibold'>
                                            <span className='fw-bold'>Height*Width</span>
                                            {entry.DoorWidthHeight}
                                        </div>
                                        <div className='d-flex flex-column gap-2 text-start fw-semibold'>
                                            <span className='fw-bold'>Amount</span>
                                            ${entry.amount}
                                        </div>
                                        <CButton color="danger" size="sm" onClick={() => handleDelete(entry._id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </CButton>
                                    </div>

                                </CCard>
                            ))
                        ) : (
                            <CAlert color="info" className="text-center">No dimensions found.</CAlert>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DimensionsProductDoors;
