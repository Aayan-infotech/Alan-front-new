import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const UserManagement = React.lazy(() => import('./views/User_Management/UserManagement'))
const CustomerManagement = React.lazy(() => import('./views/CustomerManagement/CustomerManagement'))
const CategoriesManagement = React.lazy(() => import('./views/Categories_Management/CategoriesManagement'))
const SubCategory = React.lazy(() => import('./views/Categories_Management/SubCategory'))
const SubSubCategory = React.lazy(() => import('./views/Categories_Management/SubSubCategory'))
const AddProduct = React.lazy(() => import('./views/Product_Management/AddProduct'))
const ManageProduct = React.lazy(() => import('./views/Product_Management/ManageProduct'))

const ManageOrders = React.lazy(() => import('./views/Order Management/ManageOrders'))
const CancelledOrders = React.lazy(() => import('./views/Order Management/CancelledOrders'))
const DimensionsProduct = React.lazy(() => import('./views/Product_Management/DimensionsProduct'))
const DimensionsProductDoors = React.lazy(() => import('./views/Product_Management/DimensionsProductDoors'))


const StaticContentManagement = React.lazy(() => import('./views/Static Content Management/StaticContentManagement'))



const routes = [
  { path: '/Dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/UserManagement', name: 'UserManagement', element: UserManagement },
  { path: '/CustomerManagement', name: 'CustomerManagement', element : CustomerManagement},
  { path: '/CategoriesManagement', name: 'CategoriesManagement', element: CategoriesManagement },
  { path: '/SubCategory', name: 'SubCategory', element: SubCategory },
  { path: '/SubSubCategory', name: 'SubSubCategory', element: SubSubCategory },
  { path: '/AddProduct', name: 'AddProduct', element: AddProduct },
  { path: '/ManageProduct', name: 'ManageProduct', element: ManageProduct },
  // Orders
  { path: '/ManageOrders', name: 'ManageOrders', element: ManageOrders },
  { path: '/CancelledOrders', name: 'CancelledOrders', element: CancelledOrders },
  { path: '/DimensionsProduct', name: 'DimensionsProduct', element: DimensionsProduct },
  { path: '/DimensionsProductDoors', name: 'DimensionsProductDoors', element: DimensionsProductDoors },


  { path: '/StaticContentManagement', name: 'StaticContentManagement', element: StaticContentManagement },

]

export default routes
