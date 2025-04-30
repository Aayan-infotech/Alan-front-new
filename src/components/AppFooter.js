import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div className="d-flex justify-content-between align-items-center w-100">
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

        <a href="https://www.discountdoorandwindow.com/" target="_blank" rel="noopener noreferrer">
          Discount Doors and Windows
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
