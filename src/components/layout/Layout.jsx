import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import './styles/Layout.css'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='layout-container'>
        <Navbar/>
        <main className="main-content">
            <div className="container">
                <Outlet/>
            </div>
        </main>
        <Footer/>
    </div>
  )
}

export default Layout
