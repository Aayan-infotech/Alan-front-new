// import React, { useState, useEffect } from 'react';
// import { CCard, CCardHeader, CCardBody, CForm, CFormLabel, CFormSelect, CFormInput, CButton, CRow, CCol } from '@coreui/react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import '../Categories_Management/CategoriesManagement.css';

// const AddProductForm = () => {
//   const [images, setImage] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [subSubCategories, setSubSubCategories] = useState([]);
//   const [productData, setProductData] = useState({
//     category: '',
//     subCategory: '',
//     subSubCategory: '',
//     productName: '',
//     productDescription: '',
//     price: '',
//     productFormulaAdded:'',
//   });

//   // Fetch data for categories, subcategories, and subsubcategories
//   useEffect(() => {
//     fetch('http://18.221.196.222:7878/api/categories')
//       .then((response) => response.json())
//       .then((data) => setCategories(data))
//       .catch((error) => console.error('Error fetching categories:', error));

//     fetch('http://18.221.196.222:7878/api/subcategory')
//       .then((response) => response.json())
//       .then((data) => setSubCategories(data))
//       .catch((error) => console.error('Error fetching subcategories:', error));

//     fetch('http://18.221.196.222:7878/api/subSubCategories')
//       .then((response) => response.json())
//       .then((data) => setSubSubCategories(data))
//       .catch((error) => console.error('Error fetching subsubcategories:', error));
//   }, []);

//   // Handle category change
//   const handleCategoryChange = (e) => {
//     const selectedCategory = e.target.value;
//     setProductData({ ...productData, category: selectedCategory, subCategory: '', subSubCategory: '' });

//     fetch(`http://18.221.196.222:7878/api/subcategory?category=${selectedCategory}`)
//       .then((response) => response.json())
//       .then((data) => setSubCategories(data))
//       .catch((error) => console.error('Error fetching subcategories for category:', error));
//   };

//   // Handle subcategory change
//   const handleSubCategoryChange = (e) => {
//     const selectedSubCategory = e.target.value;
//     setProductData({ ...productData, subCategory: selectedSubCategory, subSubCategory: '' });

//     fetch(`http://18.221.196.222:7878/api/subSubCategories?subcategory=${selectedSubCategory}`)
//       .then((response) => response.json())
//       .then((data) => setSubSubCategories(data))
//       .catch((error) => console.error('Error fetching subsubcategories for subcategory:', error));
//   };

//   // Handle change in form fields
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProductData({ ...productData, [name]: value });
//   };

//   // Handle description change (for ReactQuill)
//   const handleDescriptionChange = (value) => {
//     setProductData({ ...productData, productDescription: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const { productFormulaAdded,category, subCategory, subSubCategory, productName, productDescription, price } = productData;
//     const formData = new FormData();

//     formData.append('images', images); // Ensure `images` is the correct file input
//     formData.append('category_id', category);
//     formData.append('sub_category_id', subCategory);
//     formData.append('sub_sub_category_id', subSubCategory);
//     formData.append('name', productName);
//     formData.append('Description', productDescription);
//     formData.append('price', price);
//     formData.append('ins_date', new Date().toISOString());
//     formData.append('ins_ip', '127.0.0.1');
//     formData.append('ins_by', '');
//     formData.append('productFormulaAdded',productFormulaAdded);
   
//     fetch('http://18.221.196.222:7878/api/products', {
//       method: 'POST',
//       body: formData,
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.message === 'Product created successfully') {
//           alert('Product added successfully!');
//           setProductData({
//             category: '',
//             subCategory: '',
//             subSubCategory: '',
//             productName: '',
//             productDescription: '',
//             price: '',
//           });
//           setImage(null);
//         } else {
//           alert('Error adding product');
//         }
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//         alert('Error occurred while adding product');
//       });
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]); // Get the selected file
//   };
//   return (
//     <CCard>
//       <CCardHeader>Add Product</CCardHeader>
//       <CCardBody>
//         <CForm onSubmit={handleSubmit}>
//           <CRow>
//             <CCol md={6}>
//               <CFormLabel htmlFor="category">Category</CFormLabel>
//               <CFormSelect
//                 id="category"
//                 name="category"
//                 value={productData.category}
//                 onChange={handleCategoryChange}
//               >
//                 <option value="">Select Category</option>
//                 {categories.map((category, index) => (
//                   <option key={index} value={category._id}>
//                     {category.name}
//                   </option>
//                 ))}
//               </CFormSelect>
//             </CCol>

//             <CCol md={6}>
//               <CFormLabel htmlFor="subCategory">Sub Category</CFormLabel>
//               <CFormSelect
//                 id="subCategory"
//                 name="subCategory"
//                 value={productData.subCategory}
//                 onChange={handleSubCategoryChange}
//               >
//                 <option value="">Select Subcategory</option>
//                 {subCategories.map((subCategory, index) => (
//                   <option key={index} value={subCategory._id}>
//                     {subCategory.name}
//                   </option>
//                 ))}
//               </CFormSelect>
//             </CCol>
//           </CRow>

//           <CRow>
//             <CCol md={6}>
//               <CFormLabel htmlFor="subSubCategory">Sub Sub Category</CFormLabel>
//               <CFormSelect
//                 id="subSubCategory"
//                 name="subSubCategory"
//                 value={productData.subSubCategory}
//                 onChange={handleChange}
//               >
//                 <option value="">Select Sub-Subcategory</option>
//                 {subSubCategories.map((subSubCategory, index) => (
//                   <option key={index} value={subSubCategory._id}>
//                     {subSubCategory.name}
//                   </option>
//                 ))}
//               </CFormSelect>
//             </CCol>
//           </CRow>

//           <CRow>
//             <CCol md={12}>
//               <CFormLabel htmlFor="productName">Product Name</CFormLabel>
//               <CFormInput
//                 type="text"
//                 id="productName"
//                 name="productName"
//                 value={productData.productName}
//                 onChange={handleChange}
//                 placeholder="Enter product name"
//               />
//             </CCol>
//           </CRow>
//           <CRow>
//             <CCol md={12}>
//               <CFormLabel htmlFor="images">Product Image</CFormLabel>
//               <CFormInput
//                 type="file"
//                 id="images"
//                 name="images"
//                 onChange={handleImageChange}
//               />
//             </CCol>
//           </CRow>

//           {/* Price Field */}
//           <CRow>
//             <CCol md={6}>
//               <CFormLabel htmlFor="price">Price</CFormLabel>
//               <CFormInput
//                 type="number"
//                 id="price"
//                 name="price"
//                 value={productData.price}
//                 onChange={handleChange}
//                 placeholder="Enter product price"
//               />
//             </CCol>
//           </CRow>
          
//           {/* productFormulaAdded  */}
//           <CRow>
//             <CCol md={6}>
//               <CFormLabel htmlFor="productFormulaAdded">Formula Apply</CFormLabel>
//               <CFormSelect
//                 id="productFormulaAdded"
//                 name="productFormulaAdded"
//                 value={productData.productFormulaAdded}
//                 onChange={handleChange}
//               >
//                 <option value="No">No</option>
//                 <option value="Yes">Yes</option>
//               </CFormSelect>
//             </CCol>
//           </CRow>

//           {/* Product Description using ReactQuill */}
//           <CRow>
//             <CCol md={12}>
//               <CFormLabel htmlFor="productDescription">Product Description</CFormLabel>
//               <ReactQuill
//                 value={productData.productDescription}
//                 onChange={handleDescriptionChange}
//                 placeholder="Enter product description"
//               />
//             </CCol>
//           </CRow>

//           <CButton type="submit" color="primary" className="mt-3">
//             Add Product
//           </CButton>
//         </CForm>
//       </CCardBody>
//     </CCard>
//   );
// };

// export default AddProductForm;


import React, { useState, useEffect } from 'react';
import { CCard, CCardHeader, CCardBody, CForm, CFormLabel, CFormSelect, CFormInput, CButton, CRow, CCol } from '@coreui/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../Categories_Management/CategoriesManagement.css';

const AddProductForm = () => {
  const [images, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [productData, setProductData] = useState({
    category: '',
    subCategory: '',
    subSubCategory: '',
    productName: '',
    productDescription: '',
    price: '',
    productFormulaAdded:'',
  });

  // Fetch data for categories, subcategories, and subsubcategories
  useEffect(() => {
    fetch('http://18.221.196.222:7878/api/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  // Handle category change
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setProductData({
      ...productData,
      category: selectedCategory,
      subCategory: '',
      subSubCategory: '',
    });
    setSubCategories([]);
    setSubSubCategories([]);

    if (selectedCategory) {
      fetch(`http://18.221.196.222:7878/api/subcategory/categoryid/${selectedCategory}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          const subcategoriesArray = data.data ? data.data : (Array.isArray(data) ? data : []);
          setSubCategories(subcategoriesArray);
        })
        .catch((error) =>
          console.error('Error fetching subcategories for category:', error)
        );
    }
  };

  const handleSubCategoryChange = (e) => {
    const selectedSubCategory = e.target.value;
    setProductData({
      ...productData,
      subCategory: selectedSubCategory,
      subSubCategory: '',
    });
    setSubSubCategories([]);

    if (selectedSubCategory) {
      fetch(`http://18.221.196.222:7878/api/subSubCategories/subcategoryid/${selectedSubCategory}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          const subsubcategoriesArray = data.data ? data.data : (Array.isArray(data) ? data : []);
          setSubSubCategories(subsubcategoriesArray);
        })
        .catch((error) =>
          console.error('Error fetching subsubcategories for subcategory:', error)
        );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleDescriptionChange = (value) => {
    setProductData({ ...productData, productDescription: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { productFormulaAdded,category, subCategory, subSubCategory, productName, productDescription, price, productType } = productData;
    const formData = new FormData();

    formData.append('images', images); // Ensure `images` is the correct file input
    formData.append('category_id', category);
    formData.append('sub_category_id', subCategory);
    formData.append('sub_sub_category_id', subSubCategory);
    formData.append('name', productName);
    formData.append('Description', productDescription);
    formData.append('price', price);
    formData.append('ins_date', new Date().toISOString());
    formData.append('ins_ip', '127.0.0.1');
    formData.append('ins_by', '');
    formData.append('productFormulaAdded',productFormulaAdded);
    formData.append('productType', productType);
   
    fetch('http://18.221.196.222:7878/api/products', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Product created successfully') {
          alert('Product added successfully!');
          setProductData({
            category: '',
            subCategory: '',
            subSubCategory: '',
            productName: '',
            productDescription: '',
            price: '',
            productType: '',
          });
          setImage(null);
        } else {
          alert('Error adding product');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error occurred while adding product');
      });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Get the selected file
  };
  return (
    <CCard>
      <CCardHeader>Add Product</CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <CRow>
            <CCol md={6}>
              <CFormLabel htmlFor="category">Category</CFormLabel>
              <CFormSelect
                id="category"
                name="category"
                value={productData.category}
                onChange={handleCategoryChange}
              >
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>

            <CCol md={6}>
              <CFormLabel htmlFor="subCategory">Sub Category</CFormLabel>
              <CFormSelect
                id="subCategory"
                name="subCategory"
                value={productData.subCategory}
                onChange={handleSubCategoryChange}
              >
                <option value="">Select Subcategory</option>
                {subCategories.map((subCategory, index) => (
                  <option key={index} value={subCategory._id}>
                    {subCategory.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>

          <CRow>
            <CCol md={6}>
              <CFormLabel htmlFor="subSubCategory">Sub Sub Category</CFormLabel>
              <CFormSelect
                id="subSubCategory"
                name="subSubCategory"
                value={productData.subSubCategory}
                onChange={handleChange}
              >
                <option value="">Select Sub-Subcategory</option>
                {subSubCategories.map((subSubCategory, index) => (
                  <option key={index} value={subSubCategory._id}>
                    {subSubCategory.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>

          <CRow>
            <CCol md={12}>
              <CFormLabel htmlFor="productName">Product Name</CFormLabel>
              <CFormInput
                type="text"
                id="productName"
                name="productName"
                value={productData.productName}
                onChange={handleChange}
                placeholder="Enter product name"
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol md={12}>
              <CFormLabel htmlFor="images">Product Image</CFormLabel>
              <CFormInput
                type="file"
                id="images"
                name="images"
                onChange={handleImageChange}
              />
            </CCol>
          </CRow>

          {/* Price Field */}
          <CRow>
            <CCol md={6}>
              <CFormLabel htmlFor="price">Price</CFormLabel>
              <CFormInput
                type="number"
                id="price"
                name="price"
                value={productData.price}
                onChange={handleChange}
                placeholder="Enter product price"
              />
            </CCol>
          </CRow>
          
          {/* productFormulaAdded  */}
          <CRow>
            <CCol md={6}>
              <CFormLabel htmlFor="productFormulaAdded">Formula Apply</CFormLabel>
              <CFormSelect
                id="productFormulaAdded"
                name="productFormulaAdded"
                value={productData.productFormulaAdded}
                onChange={handleChange}
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </CFormSelect>
            </CCol>
          </CRow>


          <CRow>
  <CCol md={6}>
    <CFormLabel htmlFor="productType">Product Type</CFormLabel>
    <CFormSelect
      id="productType"
      name="productType"
      value={productData.productType}
      onChange={handleChange}
      required
    >
      <option value="">Select Product Type</option>
      <option value="Windows">Windows</option>
      <option value="Doors">Doors</option>
      <option value="Hardware">Hardware</option>
    </CFormSelect>
  </CCol>
</CRow>



          {/* Product Description using ReactQuill */}
          <CRow>
            <CCol md={12}>
              <CFormLabel htmlFor="productDescription">Product Description</CFormLabel>
              <ReactQuill
                value={productData.productDescription}
                onChange={handleDescriptionChange}
                placeholder="Enter product description"
              />
            </CCol>
          </CRow>

          <CButton type="submit" color="primary" className="mt-3">
            Add Product
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default AddProductForm;

