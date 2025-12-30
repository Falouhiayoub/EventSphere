import {useState, useEffect} from 'react'
import api from '../services/api'
import './styles/AdminOrders.css'


const AdminOrders = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get('/orders')
                setOrders(response.data)
            } catch (error) {
                console.error("Error fetching orders: ", error)
            }
        }

        fetchOrders()
    }, [])

    const getStatusClass = (status) => {
        if(!status) return ''
        switch  (status.toLowerCase()) {
            case 'confirmed' : return 'status-confirmed'
            case 'pending' : return 'status-pending'
            case 'cancelled' : return 'status-cancelled'
            default : return ''
        }
    }
  return (
    <div className="fade-in admin-orders-container"> 
        <h2 className="section-title orders-title">Commandes Clients</h2>

        <div className="orders-table-wrapper">
            <table className="orders-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Client</th>
                        <th>Contact</th>
                        <th>Total</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.length === 0 ? (
                        <tr><td colSpan="6" className='empty-message'>Aucune Commande</td></tr>
                    ) : (
                        orders.map(order => (
                            <tr key={order.id}>
                                <td>#{order.id.toString().slice(0, 8)}</td>
                                <td>{new Date(order.date).toLocaleDateString()}</td>
                                <td>{order.fullName}</td>
                                <td>
                                    <div>{order.email}</div>
                                    <div className="contact-phone">{order.phone}</div>
                                </td>
                                <td className='order-price'>{order.totalPrice} $</td>
                                <td>
                                    <span className={`status-badge ${getStatusClass(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default AdminOrders
