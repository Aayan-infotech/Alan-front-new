import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilAlignCenter,
  cilPuzzle,
  cilSpeedometer,
  cilChartLine,
  cilStorage,
  cilStar,
  cilUser,
  cilWindow,
  cilRoom,
  cilGift,
  cilList,
  cibReverbnation,
  cilPhone,
  cibOpenstreetmap,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  // Dashboard

  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilChartLine} customClassName="nav-icon" style={{ color: 'White' }} />,
    badge: {
      color: 'info',
    },
  },

  {
    component: CNavItem,
    name: 'Contacts us',
    to: '/contact',
    icon: <CIcon icon={cilPhone} customClassName="nav-icon" style={{ color: 'Gold' }} />,
    badge: {
      color: 'info',
    },
  },

  // User Management
  // {
  //   component: CNavItem,
  //   name: 'User Management',
  //   to: '/UserManagement',
  //   icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //   },
  // },

  {
    component: CNavItem,
    name: 'Customer Management',
    to: '/CustomerManagement',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" style={{ color: 'Magenta' }} />,
    badge: {
      color: 'info',
    },
  },

  // Categories

  {
    component: CNavGroup,
    name: 'Categories Management',
    to: '/categoriesManagement',
    icon: <CIcon icon={cilRoom} customClassName="nav-icon" style={{ color: 'Pink' }} />,
    items: [
      {
        component: CNavItem,
        name: 'Categories',
        to: '/categoriesManagement',
      },
      {
        component: CNavItem,
        name: 'Sub- Category',
        to: '/SubCategory',
      },
      {
        component: CNavItem,
        name: 'Sub-Sub-Category',
        to: '/SubSubCategory',
      },
    ],
  },

  // Dimensions
  // {
  //   component: CNavItem,
  //   name: 'Dimensions Product',
  //   to: '/DimensionsProduct',
  //   // icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" style={{ color: 'blue' }} />,
  //   badge: {
  //     color: 'info',
  //   },
  // },

  // Product

  {
    component: CNavGroup,
    name: 'Product Management',
    to: '/ProductManagement',
    icon: <CIcon icon={cilWindow} customClassName="nav-icon" style={{ color: 'Yellow' }} />,
    items: [
      {
        component: CNavItem,
        name: 'Add Product',
        to: '/AddProduct',
      },
      {
        component: CNavItem,
        name: 'Manage Product',
        to: '/ManageProduct',
      },
      // {
      //   component: CNavItem,
      //   name: 'Dimensions ProductDoors',
      //   to: '/DimensionsProductDoors',
      // },
    ],
  },

  // Order

  {
    component: CNavGroup,
    name: 'Order Management',
    to: '/OrderManagement',
    icon: <CIcon icon={cilGift} customClassName="nav-icon" style={{ color: 'Aqua' }} />,
    items: [
      {
        component: CNavItem,
        name: 'Manage Orders',
        to: '/ManageOrders',
      },
      {
        component: CNavItem,
        name: 'Cancelled Orders',
        to: '/CancelledOrders',
      },
    ],
  },

  // Static Content Management
  {
    component: CNavItem,
    name: 'Managing fixed content',
    to: '/StaticContentManagement',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" style={{ color: 'Green' }} />,
    badge: {
      color: 'info',
    },
  },

  {
    component: CNavItem,
    name: 'Mass Price Adjustment',
    to: '/PriceAdjustment',
    icon: <CIcon icon={cilStorage} customClassName="nav-icon" style={{ color: 'red' }} />,
    badge: {
      color: 'info',
    },
  },

  {
    component: CNavItem,
    name: 'Review Management',
    to: '/rating',
    icon: <CIcon icon={cibReverbnation} customClassName="nav-icon" style={{ color: 'Magenta' }} />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'Address Management',
    to: '/address',
    icon: <CIcon icon={cibOpenstreetmap} customClassName="nav-icon" style={{ color: 'White' }} />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'Formula Management',
    to: '/FormulaManage',
    icon: (
      <div style={{ display: 'flex', gap: '0.25rem' }}>
        <CIcon icon={cilList} customClassName="nav-icon" style={{ color: 'green' }} />
      </div>
    ),
    badge: {
      color: 'info',
    },
  },
]

export default _nav
