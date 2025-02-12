import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilExternalLink,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilUser,
  cilRoom,
  cilGift
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle, } from '@coreui/react'

const _nav = [

  // Dashboard

  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" style={{ color: 'blue' }} />,
    badge: {
      color: 'info',
    },
  },

  // User Management
  {
    component: CNavItem,
    name: 'User Management',
    to: '/UserManagement',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },

  {
    component: CNavItem,
    name: 'Customer Management',
    to: '/CustomerManagement',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },

  // Categories

  {
    component: CNavGroup,
    name: 'Categories Management',
    to: '/categoriesManagement',
    icon: <CIcon icon={cilRoom} customClassName="nav-icon" />,
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
    icon: <CIcon icon={cilGift} customClassName="nav-icon" />,
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
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
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
    name: 'Static Content Management',
    to: '/StaticContentManagement',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
]

export default _nav
