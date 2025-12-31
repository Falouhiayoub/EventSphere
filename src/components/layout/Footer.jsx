import React from 'react'
import './styles/Footer.css'

const Footer = () => {
    return (
        <footer className='footer'>
            <div className="container">
                <p className="footer-text">
                    © {new Date().getFullYear()} <span className='footer-brand'>EventSphere</span>. Tous droits Réserves
                </p>
            </div>
        </footer>
    )
}

export default Footer
