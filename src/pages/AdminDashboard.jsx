import { useEffect, useState } from 'react'
import axios from 'axios'
import { uploadImage } from "../utils/cloudinary"
import "./styles/AdminDashboard.css"

const AdminDashboard = () => {
    const [events, setEvents] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [currentEvent, setCurrentEvent] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [uploading, setUploading] = useState(false)

    const initialFormState = {
        name: '',
        category: '',
        image: '',
        price: '',
        description: ''
    }

    const [formData, setFormData] = useState(initialFormState);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:3001/events');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events', error);
        }
    }

    useEffect(() => {
        fetchEvents();
    }, [])


    const handleDelete = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
            try {
                await axios.delete(`http://localhost:3001/events/${id}`);
                fetchEvents();
            } catch (error) {
                console.error('Error deleting event', error);
            }
        }
    }

    const handleEdit = (event) => {
        setCurrentEvent(event)
        setFormData(event)
        setIsEditing(true)
        setShowForm(true)
    }

    const handleAddNew = () => {
        setCurrentEvent(null)
        setFormData(initialFormState)
        setIsEditing(false)
        setShowForm(true)
    }

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        if(!file) return

        setUploading(true)

        try {
            const url = await uploadImage(file)
            setFormData(prev => ({...prev, image: url}))
        } catch (error) {
            alert("Error uploading image", error)
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault

        try {
            if(isEditing && currentEvent) {
                await axios.put(`http://localhost:3001/events/${currentEvent.id}`, formData)
            } else {
                await axios.post('http://localhost:3001/events', formData)
            }
            setShowForm(false)
            fetchEvents()
        } catch (error) {
            console.error("error Saving Event", error)
        }
    }

  return (
    <div className='fade-in'>
        <div className="dashboard-header">
            <h2 className="dashboard-title">Gestion de Événemnts</h2>
            <button className="btn" onClick={handleAddNew}> + Ajouter un évenemnt</button>
        </div>

        {showForm && (
            <div className="event-form-container">
                <h3 className="form-title">{isEditing ? 'Modifier l\'évenement' : 'Nouveau l\'évenement'}</h3>
                <form onSubmit= {handleSubmit} className="event-form">
                    <div>
                        <label className="form-label">Nom</label>
                        <input type="text" required value = {formData.name} onChange={e => setFormData({...formData, name: e.target.value})}/>
                    </div>
                    <div>
                        <label className="form-label">Catégorie</label>
                        <input type="text" required value = {formData.category} onChange={e => setFormData({...formData, category: e.target.value})}/>
                    </div>
                    <div>
                        <label className="form-label">Prix ($)</label>
                        <input type="number" required value = {formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})}/>
                    </div>
                    <div>
                        <label className="form-label">Image</label>
                        <input 
                            type="file" 
                            onChange={handleImageUpload} 
                            className='form-input' 
                            accept='image/*'
                        />
                        
                        {uploading && <p style={{fontSize: '0.8rem', color: '#666'}}>Chargement de l'image....</p>}
                        <input type="text"
                            placeholder="URL de l'image"
                            readOnly
                            value={formData.image}
                            className='form-input'
                            style={{marginTop: '5px', backgroundColor: '#f5f5f5'}}
                        />

                        {formData.image && (
                            <img src={formData.image} alt="apercu" style={{maxWidth: '180px', maxHeight: '100px', objectFit: 'cover', marginTop: '10px', borderRadius: '4px'}}/>
                        )}
                    </div>

                    <div style={{gridColumn: 'span 2'}}>
                        <label className="form-label">Description</label>
                        <textarea rows="4" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className='form-input' style={{fontFamily: 'inherit'}}></textarea>
                    </div>
                    <div className="form-actions">
                        <button type='submit' className='btn'>{isEditing ? 'Mettre a jour': 'Créer'}</button>
                        <button className="btn-secondary" onClick={() => setFormData(false)}>Annuler</button>
                    </div>
                </form>
            </div>
        )}

        {/* Events List */}
        <div className="admin-events-list">
            {events.map(event => (
                <div key={event.id} className="admin-event-item">
                    <div className="admin-event-info">
                        <img src= {event.image} alt= {event.name} className='admin-event-img' />
                        <div className="admin-event-details">
                            <h4>{event.name}</h4>
                            <p>{event.category} - {event.price} $</p>
                        </div>
                    </div>

                    <div className="admin-event-actions">
                        <button className="btn-secondary btn-edit" onClick={() => handleEdit(event)} title="Modifier">✏️</button>
                        <button className="btn-secondary btn-delete" onClick={() => handleDelete(event.id)} title="Supprimer">🗑️</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default AdminDashboard
