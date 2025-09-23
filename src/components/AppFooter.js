import React from 'react'
import { CFooter } from '@coreui/react'
import Logo from '../assets/images/Adobe Express - file (8).png' // Adjust path as needed

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div className="d-flex justify-content-between align-items-center w-100">
        {/* Left side */}
        <div>
          <span className="me-1">Developed by</span>
          <a
            href="https://aayaninfotech.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="me-3"
          >
            Aayan Infotech
          </a>
        </div>

        {/* Center image */}
        <div>
          <img
            src={Logo}
            alt="Company Logo"
            style={{ width: '80px',    objectFit: 'contain'}}
          />
        </div>

        {/* Right side */}
        <div>
          <a
            href="https://www.discountdoorandwindow.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discount Doors and Windows
          </a>
        </div>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
