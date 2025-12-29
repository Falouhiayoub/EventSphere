import React from 'react'
import AdminLayout from './components/layout/AdminLayout'
import { BrowserRouter } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
        <AdminLayout/>
    </BrowserRouter>
  )
}

export default App
