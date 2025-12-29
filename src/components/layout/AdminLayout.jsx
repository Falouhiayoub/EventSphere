import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import "./styles/AdminLayout.css"
import { useDispatch } from 'react-redux'

const AdminLayout = ({children}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/admin')
  }
  return (
    <div className='admin-layout'>
        <aside className="admin-sidebar">
            <div className="admin-sidebar-header">
                <h2 className="admin-brand">
                  Event <span>Admin</span>
                </h2>
            </div>

            <nav>
              <NavLink to="admin/dashboard" className={({isActive}) => `admin-link ${isActive ? 'active': ''}`}>Tableau de bord</NavLink>
              <NavLink to= "/admin/orders" className={({isActive}) => `admin-link ${isActive ? 'active': ''}`}>Commandes</NavLink>
              <div className="admin-footer">
                <button onClick={handleLogout} className='logout-btn'>Déconnexion</button>
                <NavLink to="/" className="back-home-link">Retour au Site</NavLink>
              </div>
            </nav>
        </aside>

        <main className="admin-main">
          {children}
        </main>
    </div>
  )
}

export default AdminLayout  