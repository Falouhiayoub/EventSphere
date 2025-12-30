import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';
import './styles/Cart.css'
const Cart = () => {
    const {items, totalQuantity, totalPrice} = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    if(items.length === 0) {
        return(
            <div className="fade-in cart-empty">
                <h2>Votre Panier est vide</h2>
                <p>Découvrez nos événements et trouvez votre prochaine expérience.</p>
                <Link to="/events" className='btn'>Parcourir les événements</Link>
            </div>
        )
    }
    return (
        <div>
            <div className="fade-in">
                <h2 className='section-title'>Votre Panier</h2>

                <div className="cart-grid">
                    <div>
                        {items.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt= {item.name} className='cart-item-image'/>
                                <div className="cart-item-details">
                                    <h3 className="cart-item-title">{item.name}</h3>
                                    <p className="cart-item-price">{item.price} $</p>
                                </div>

                                <div className="cart-item-actions">
                                    <button 
                                    className="btn-secondary quantity-btn"
                                    disabled = {item.quantity <= 1}
                                    onClick={() => dispatch(updateQuantity({id: item.id, quantity: item.quantity - 1}))}>
                                        -
                                    </button>
                                    <span className="quantity-display">{item.quantity}</span>

                                    <button 
                                    className="btn-secondary quantity-btn"
                                    onClick={() => dispatch(updateQuantity({id: item.id, quantity: item.quantity + 1}))}>
                                        +
                                    </button>
                                </div>

                                <button 
                                    className="remove-btn" 
                                    aria-label='Remove'
                                    onClick={() => dispatch(removeFromCart(item.id))}>&times;</button>
                            </div>
                        ))}

                        <button className="clear-cart-btn" onClick={() => dispatch(clearCart())}>
                            Vider le Panier
                        </button>
                    </div>

                    {/* summary */}
                    <div>
                        <div className="cartsummary">
                            <h3 className="summary-title">Récapitulatif</h3>
                            <div className="summary-row">
                                <span>Total Articles</span>
                                <span>{totalQuantity}</span>
                            </div>
                            <div className="summary-total">
                                <span>Total</span>
                                <span>{totalPrice} $</span>
                            </div>
                            <button className="btn checkout-btn"
                            onClick={() => navigate('/checkout')}>
                                Passer a la caisse
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
