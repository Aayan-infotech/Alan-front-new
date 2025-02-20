import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
        e.preventDefault();
      
        // Check for both valid sets of credentials
        if (
          (email === 'admin@gmail.com' && password === 'admin') ||
          (email === 'aayaninfotech@gmail.com' && password === 'aayaninfotech')
        ) {
          console.log('Login successful');
          
          // Simulate token storage
          const token = 'mockToken123456'; // Mock token
          localStorage.setItem('token', token); // Store mock token
          
          navigate('/dashboard'); // Navigate to the dashboard (make sure this route exists)
        } else {
          console.error('Login Error: Invalid credentials');
          setError('Failed to login. Please check your credentials.');
        }
      };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4 shadow-lg rounded-lg">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    {/* Login Heading and Subheading */}
                    <h1 className="text-center" style={{ color: '#333' }}>Login</h1>
                    <p className="text-center" style={{ color: '#666' }}>Sign in to your account</p>

                    {/* Error Message */}
                    {error && <p className="text-danger text-center">{error}</p>}

                    {/* Email Input */}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </CInputGroup>

                    {/* Password Input */}
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </CInputGroup>

                    {/* Login Button */}
                    <CRow>
                      <CCol className="text-center">
                        <CButton type="submit" color="primary" className="px-4 py-2" style={{ width: '100%' }}>
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCardGroup,
//   CCol,
//   CContainer,
//   CForm,
//   CFormInput,
//   CInputGroup,
//   CInputGroupText,
//   CRow,
// } from '@coreui/react';
// import CIcon from '@coreui/icons-react';
// import { cilLockLocked, cilUser } from '@coreui/icons';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // API call for user authentication
//       const response = await fetch('http://54.236.98.193:7878/api/AdminUsers');
      
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const users = await response.json();
      
//       // Check if the entered credentials match any user in the database
//       const validUser = users.find(user => user.email === email && user.password === password);

//       if (validUser) {
//         console.log('Login successful');

//         // Simulate token storage
//         const token = 'mockToken123456'; // Mock token
//         localStorage.setItem('token', token);

//         navigate('/dashboard');
//       } else {
//         console.error('Login Error: Invalid credentials');
//         setError('Failed to login. Please check your credentials.');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       setError('Something went wrong. Please try again.');
//     }
//   };

//   return (
//     <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
//       <CContainer>
//         <CRow className="justify-content-center">
//           <CCol md={6}>
//             <CCardGroup>
//               <CCard className="p-4 shadow-lg rounded-lg">
//                 <CCardBody>
//                   <CForm onSubmit={handleSubmit}>
//                     <h1 className="text-center" style={{ color: '#333' }}>Login</h1>
//                     <p className="text-center" style={{ color: '#666' }}>Sign in to your account</p>

//                     {error && <p className="text-danger text-center">{error}</p>}

//                     <CInputGroup className="mb-3">
//                       <CInputGroupText>
//                         <CIcon icon={cilUser} />
//                       </CInputGroupText>
//                       <CFormInput
//                         type="email"
//                         placeholder="Email"
//                         autoComplete="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                       />
//                     </CInputGroup>

//                     <CInputGroup className="mb-4">
//                       <CInputGroupText>
//                         <CIcon icon={cilLockLocked} />
//                       </CInputGroupText>
//                       <CFormInput
//                         type="password"
//                         placeholder="Password"
//                         autoComplete="current-password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                       />
//                     </CInputGroup>

//                     <CRow>
//                       <CCol className="text-center">
//                         <CButton type="submit" color="primary" className="px-4 py-2" style={{ width: '100%' }}>
//                           Login
//                         </CButton>
//                       </CCol>
//                     </CRow>
//                   </CForm>
//                 </CCardBody>
//               </CCard>
//             </CCardGroup>
//           </CCol>
//         </CRow>
//       </CContainer>
//     </div>
//   );
// };

// export default Login;
