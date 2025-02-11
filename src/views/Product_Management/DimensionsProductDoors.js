import React, { useEffect, useState } from 'react';
import { useParams ,useLocation } from 'react-router-dom';
import axios from 'axios';

const DimensionsProductDoors = () => {
  const { productId, categoryName } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const {productIdfordet}=location.state || [];
  

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://44.196.64.110:7878/api/products/getProductsbyid/${productIdfordet}`);
        setProduct(response.data);
      } catch (err) {
        setError('Error fetching product data');
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <h2>{categoryName}</h2>
      <p>{product.Description}</p>
      <p>Price: ₹{product.price}</p>
      <p>SKU: {product.sku}</p>
      <p>Product Formula Added: {product.productFormulaAdded}</p>
      {/* Render other product details as needed */}
    </div>
  );
};

export default DimensionsProductDoors;