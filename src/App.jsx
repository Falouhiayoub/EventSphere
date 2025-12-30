import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard'
import Events from './pages/Events'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import './index.css'

const App = () => {
  return (
    
        <Routes>
          <Route path='/admin/dashboard' element = {<AdminDashboard/>}/>
          <Route path='/events' element= {<Events/>}/>
          <Route path= '/cart' element = {<Cart/>}/>
          <Route path="/checkout" element={<Checkout />} />

        </Routes>
  )
}

export default App
