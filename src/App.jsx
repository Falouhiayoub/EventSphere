import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard'
import Events from './pages/Events'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/admin/dashboard' element = {<AdminDashboard/>}/>
          <Route path='/events' element= {<Events/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
