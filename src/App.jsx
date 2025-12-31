import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard'
import Events from './pages/Events'
import AdminLayout from './components/layout/AdminLayout'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import AdminLogin from './pages/AdminLogin'
import AdminOrders from './pages/AdminOrders'
import './index.css'
import Home from './pages/Home'


// Protected Route 
const PrivateRoute = ({children}) => {
  const user = JSON.parse(localStorage.getItem('user'))
  return user && user.username === 'admin' ? children : <Navigate to= '/admin'/>
}
const App = () => {
  return (
    
        <Routes>
          {/* user Routes */}
          <Route index element = {<Home/>}/>
          <Route path='/events' element= {<Events/>}/>
          <Route path= '/cart' element = {<Cart/>}/>
          <Route path="/checkout" element={<Checkout />} />

          {/* admin Routes */}
          <Route path='/admin' element = {<AdminLogin/>}/>
          <Route path='/admin/dashboard' element = {
            <PrivateRoute>
              <AdminLayout>
                <AdminDashboard/>
              </AdminLayout>
            </PrivateRoute>
          }/>

          <Route path='/admin/orders' element = {
            <PrivateRoute>
              <AdminLayout>
                <AdminOrders/>
              </AdminLayout>
            </PrivateRoute>
          }/>
        </Routes>
  )
}

export default App
