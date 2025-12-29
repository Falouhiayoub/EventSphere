import React, { useEffect, useState } from 'react'
// import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import './styles/Events.css'
import api from "../services/api"
const Events = () => {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()
    // const dispatch = useDispatch()

    const categoryFilter = searchParams.get('category')
    const [activeCategory, setActiveCategory] = useState(categoryFilter)

    useEffect(() => {
        setActiveCategory(categoryFilter || 'All')
    }, [categoryFilter])

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get('/events')
                setEvents(response.data)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching Events:", error)
                setLoading(false)
            }
        }
        fetchEvents()
    }, [])

    const handleCategoryChange = (category) => {
        setActiveCategory(category)
        if(category === 'All') {
            searchParams.delete('category')
            setSearchParams(searchParams)
        } else {
            setSearchParams({category})
        }
    }

    const filteredEvents = activeCategory === 'All' ? events : events.filter(event => event.category === activeCategory)

    const categories = ['All', ...new Set(events.map(e => e.category))]

    if(loading) return <div className="events-loading">Chargement....</div>
  return (
    <div className='fade-in'>
        <h2 className='section-title'>Evenement A venir</h2>

        <div className="filters-container">
            {categories.map(cat => (
                <button key={cat} onClick={() => handleCategoryChange(cat)}
                className= {activeCategory === cat ? 'btn' : 'btn-secondary'}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* Grid */}
        <div className="events-grid">
            {filteredEvents.map(event => (
                <div key={event.id} className="event-card">
                    <div className="event-image-container">
                        <img src= {event.image} alt= {event.name}  className="event-image"/>
                    </div>

                    <div className="event-details">
                        <div className="event-category">{event.category}</div>
                        <h3 className="event-name">{event.name}</h3>

                        <div className="event-footer">
                            <span className="event-price">{event.price} $</span>
                            <button className="btn">Ajouter Au panier</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Events
