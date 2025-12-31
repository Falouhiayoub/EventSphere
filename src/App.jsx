import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from './components/layout/AdminLayout'
import AdminDashboard from './pages/AdminDashboard'
import AdminOrders from './pages/AdminOrders'
import AdminLogin from './pages/AdminLogin'
import Events from './pages/Events'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Contact from './pages/Contact'
import './index.css'


// Protected Route 
const PrivateRoute = ({children}) => {
  const user = JSON.parse(localStorage.getItem('user'))
  return user && user.username === 'admin' ? children : <Navigate to= '/admin'/>
}
const App = () => {
  return (
    
        <Routes>
          {/* user Routes */}
          <Route path='/' element = {<Layout/>}/>
          <Route index element = {<Home/>}/>
          <Route path='/events' element= {<Events/>}/>
          <Route path= '/cart' element = {<Cart/>}/>
          <Route path="/checkout" element={<Checkout />} />
          <Route path='/contact' element = {<Contact/>}/>

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
