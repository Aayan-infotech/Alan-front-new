import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      {/* <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          CoreUI
        </a>
        <span className="ms-1">&copy; 2024 creativeLabs.</span>
      </div> */}
      <div className="ms-auto">
        <span className="me-1">Aayan infotech</span>
        <a href="http://44.196.64.110:2040/#/dashboard" target="_blank" rel="noopener noreferrer">
        Discount Doors and Windows
        </a>
      </div>
    </CFooter>
  )
}
 

export default React.memo(AppFooter)
