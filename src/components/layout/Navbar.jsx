import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './styles/Navbar.css'


const Navbar = () => {
    const totalQuantity = useSelector((state) => state.cart.totalQuantity)
  return (
    <nav className='navbar'>
        <div className="containernavbar-container">
            <Link to = "/" className='navbar-logo'>
                Event <span>Spher</span>
            </Link>
            <div className="navbar-links">
                <NavLink to = '/' className={({isActive}) => isActive ? 'nav-link active': 'nav-link'}>Acceuil</NavLink>
                <NavLink to = '/events' className={({isActive}) => isActive ? 'nav-link active': 'nav-link'}>Evénements</NavLink>
                <NavLink to = '/contact' className={({isActive}) => isActive ? 'nav-link active': 'nav-link'}>Contact</NavLink>
                
                <Link to= '/cart' className='nav-link cart-link'>
                    <span>Panier</span>
                    {totalQuantity > 0 && (
                        <span className='cart-badge'>
                            {totalQuantity}
                        </span>
                    )}
                </Link>
            </div>
        </div>
    </nav>
    )
}

export default Navbar
