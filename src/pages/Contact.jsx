import React, { useState } from 'react'
import api from '../services/api'
import './styles/Contact.css'

const Contact = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [status, setStatus] = useState('idle')

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      await api.get('/messages', {
        ...formData, date: new Date().toISOString()
      })

      // simulation n8n email trigger
      console.log('Sending message via n8n...', formData)

      setStatus('success')
      setFormData({name: '', email: '', message: ''})
    } catch (error) {
      console.log("Error sending message :", error)
      setStatus('error')
    }
  }
  return (
    <div className='fade-in contact-container'>
      <h2 className="section-title">Nous Contactez</h2>

      <div className="contact-card">
        {status === 'success' ? (
          <div className="contact-success">
            <h3>Message Envoyé</h3>
            <p>Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais. </p>
            <button onClick={() => setStatus('idle')} className="btn" style={{marginTop: '1.5rem'}}>Envoyer un autre Message</button>
          </div>
        ) : (
          <form onSubmit= {handleSubmit}>
            <div className="contact-form-group">
              <label className="contact-label">Nom</label>
              <input type="text" 
                  name='name'
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className='contact-input'
              />
            </div>
            <div className="contact-form-group">
              <label className="contact-label">Email</label>
              <input type="email" 
                  name='email'
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className='contact-input'
              />
            </div>
            <div className="contact-form-group">
              <label className="contact-label">Message</label>
              <textarea type="message" 
                  name='message'
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className='contact-textarea'
              />
            </div>
            <button 
                className="btn contact-btn"
                type='submit'
                disabled = {status === 'submitting'}>

                {status === 'submitting' ? 'Envoi...' : 'Envoyer'}
            </button>

            {status === 'error' && <p style={{color: 'red', marginTop: '1rem'}}>Erreur lors de l'Envoi.</p>}
          </form>
        )}
      </div>
    </div>
  )
}

export default Contact
