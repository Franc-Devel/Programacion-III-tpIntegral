const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export async function login(email, password) {
    try{
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        if (!response.ok) throw new Error('Error during login')
        const result = await response.json()
        localStorage.setItem('token', result?.token)
        return result
    } catch (error) {
        console.error('Error during login:', error)
        return null
    }
}

export async function register(name, email, password) {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        })
        if (!response.ok) throw new Error('Error during registration')
        return await response.json()
    } catch (error) {
        console.error('Error during registration:', error)
        return null
    }
}

export function logout() {
    localStorage.removeItem('token')
    window.location.href = '/index.html'
}