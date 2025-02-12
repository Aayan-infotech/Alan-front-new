import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CCard, CCardBody, CCardTitle, CCardText, CFormInput, CButton, CSpinner, CAlert } from '@coreui/react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';

const DimensionsProductDoors = () => {
    const [entries, setEntries] = useState([]);
    const [frameSize, setFrameSize] = useState('');
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [product, setProduct] = useState(null);

    const location = useLocation();
    const { productIdfordet } = location.state || {};

    // ✅ Fetch product details
    useEffect(() => {
        if (!productIdfordet) return;

        const fetchEntries = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://44.196.64.110:7878/api/DimDoorW_H/getAllDimDoorWidthHeights/${productIdfordet}`
                );

                console.log("🔍 Full API Response:", response);
                console.log("📌 Expected Data:", response.data);

                if (Array.isArray(response.data)) {
                    setEntries(response.data); // ✅ Correctly setting state
                } else {
                    setEntries([]); // Fallback in case of unexpected structure
                    console.error("❌ Unexpected Data Structure:", response.data);
                }
            } catch (err) {
                console.error("Fetch Dimensions Error:", err);
                setError("Error fetching dimensions");
            } finally {
                setLoading(false);
            }
        };

        fetchEntries();
    }, [productIdfordet]);


    // ✅ Log state to check re-renders
    useEffect(() => {
        console.log("Updated Entries:", entries);
    }, [entries]);


    const fetchEntries = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://44.196.64.110:7878/api/DimDoorW_H/getAllDimDoorWidthHeights/${productIdfordet}`);
            setEntries(response.data.data || []);
        } catch (err) {
            console.error("Fetch Dimensions Error:", err);
            setError('Error fetching dimensions');
        } finally {
            setLoading(false);
        }
    };
    // ✅ Fetch dimensions
    useEffect(() => {
        if (!productIdfordet) {
            fetchEntries();
        }
    }, [productIdfordet]);

    // ✅ Handle Add Entry
    const handleAdd = async () => {
        if (!frameSize || !price || !productIdfordet) {
            setError("Please provide all details.");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post('http://44.196.64.110:7878/api/DimDoorW_H/createDimDoorWidthHeight', {
                widthHeight: frameSize,
                price: parseFloat(price),
                productId: productIdfordet,
            });

            console.log("Added Dimension:", response.data); // Debugging log
            setEntries([...entries, response.data.data]);
            setFrameSize('');
            setPrice('');
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
            await axios.delete(`http://44.196.64.110:7878/api/DimDoorW_H/deleteDimDoorWidthHeight/${id}`);
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
                                Add Dimension
                            </CCardTitle>
                            <hr />
                            <CFormInput type="text" placeholder="Width x Height" value={frameSize} onChange={(e) => setFrameSize(e.target.value)} className="mb-3" />
                            <CFormInput type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="mb-3" />
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
                                            {entry.widthHeight}
                                        </div>
                                        <div className='d-flex flex-column gap-2 text-start fw-semibold'>
                                            <span className='fw-bold'>Price</span>
                                            ${entry.price}
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
