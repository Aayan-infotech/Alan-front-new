import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DimensionsProductDoors = () => {
  const { productId, categoryName } = useParams();

  useEffect(() => {
    // You can fetch data based on productId or categoryName if needed
  }, [productId, categoryName]);

  return (
    <div>
    <h1>erstdtfgyjhkl;'</h1>
      <h1>{productId}</h1>
      <h2>{categoryName}</h2>
    </div>
  );
};

export default DimensionsProductDoors;
