import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { clearCart } from '../store/slices/cartSlice'
import './styles/Checkout.css'

const Checkout = () => {
    const {items, totalPrice} = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: ''
    })

    const [status, setStatus] = useState('idle')

    const handleChange =(e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus("submitting")

        const orderData = {
            ...formData,
            items,
            totalPrice,
            date: new Date().toISOString(),
            status: 'Confirmed'
        }

        try {
            await api.post('/orders', orderData)
            console.log('Validation order via n8n....', orderData)
            setStatus('success')
            setTimeout(() => {
                dispatch(clearCart())
                navigate('/', {state: {orderSuccess: true}})
            }, 3000)
        } catch (error) {
            console.error('Checkout error: ', error)
            setStatus("error")
        }
    }

    if(items.length === 0 && status != 'success') {
        return <div style={{ textAlign: 'center', padding: '5rem' }}>Votre panier est vide. <button onClick={() => navigate('/events')}>Retour</button></div>;
    }

    if(status === 'success') {
        return (
            <div className="fade-in checkout-success">
                <div className="success-icon">✅</div>
                <h2>Commande Validée !</h2>
                <p>Un email de confirmation a été envoyé a {formData.email}.</p>
                <p>Redirection vers l'accueil...</p>
            </div>
        )
    }
  return (
    <div className='fade-in'>
        <h2 className="section-title">Validation de la Commande</h2>

        <div className="checkout-grid">
            <div className="checkout-form-container">
                <h3 className="form-section-title">Vos Coordonnées</h3>
                <form onSubmit= {handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Nom Complet</label>
                        <input type="text" 
                            name='fullName'
                            required
                            value={formData.fullName}
                            onChange={handleChange}
                            className='form-input'
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input type="email" 
                            name='email'
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className='form-input'
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Téléphone</label>
                        <input type="tel" 
                            name='phone'
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className='form-input'
                        />
                    </div>

                    <button type='submit' className='btn pay-btn'
                    disabled= {status === 'submitting'}>
                        {status === 'submitting' ? 'Traitement...' : `Payer ${totalPrice} $`}
                    </button>
                    {status === 'error' && <p className='error-msg'>Un erreur est servenue.</p>}
                </form>
            </div>

            {/* order Summary */}
            <div className="order-summary-container">
                <h3 className="form-section-title">Récapitulatif</h3>
                <ul className="order-items-list">
                    {items.map(item => (
                        <li key={item.id} className="order-item">
                            <span> {item.name} x {item.quantity} </span>
                            <span>{item.totalPrice} $</span>
                        </li>
                    ))}
                </ul>
                <div className="order-total-row">
                    <span>Total a payer</span>
                    <span className="order-total-amount">{totalPrice} $</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Checkout
