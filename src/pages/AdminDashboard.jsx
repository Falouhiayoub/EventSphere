import React, { useEffect, useState } from 'react'
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


    const handleAddNew = () => {
        setCurrentEvent(null)
        setFormData(initialFormState)
        setIsEditing(false)
        setShowForm(true)
    }

  return (
    <div className='fade-in'>
        <div className="dashboard-header">
            <h2 className="dashboard-title">Gestion de Événemnts</h2>
            <button className="btn" onClick={handleAddNew}> + Ajouter un évenemnt</button>
        </div>
    </div>
  )
}

export default AdminDashboard
