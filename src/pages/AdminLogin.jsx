import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../store/slices/authSlice'

const AdminLogin = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const dispatch =  useDispatch()
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        if(username === 'admin' && password === 'password123') {
            const user = {username: 'admin', role: 'admin'}
            dispatch(login(user))
            navigate('admin/dashboard')
        } else {
            setError('Identifiants Incorrectes')
        }
    }
  return (
    <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh',
        backgroundColor: 'var(--color-bg)'
    }}>
        <div style={{
            backgroundColor: 'var(--color-card-bg)',
            padding: '3rem',
            borderRadius: '12px',
            border: '1px solid var(--color-border)',
            width: '100%',
            maxWidth: '400px'
        }}>
        
        <h2 style={{textAlign: 'center', marginBottom: '2rem'}}>Admin Connexion</h2>
        <form onSubmit= {handleLogin}>
            <div style={{marginBottom: '1.5rem'}}>
                <label style= {{display: 'block', marginBottom: '0.5rem'}}>Utilisateur</label>
                <input 
                    type="text" 
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{
                    width:'100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg)', color: 'white'
                }}
                />
            </div>

            <div style={{marginBottom: '2rem'}}>
                <label style= {{display: 'block', marginBottom: '0.5rem'}}>Mot de Passe</label>
                <input type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                    width: '100%', padding: '10px',borderRadius: '6px', border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg)', color: 'white'
                }}/>
            </div>
            {error && <p style={{color : '#ff4d4d', marginBottom: '1rem', textAlign: 'center'}}>{error}</p>}
            <button type='submit' className="btn" style={{width: '100%'}}>Se Connecter</button>
        </form>
        </div>
    </div>
  )
}

export default AdminLogin
