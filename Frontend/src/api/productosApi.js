import {parseResponse} from '../utils/http.js'
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
let token = localStorage.getItem('token') || null

export async function getProductos() {
  try {
    const response = await fetch(`${API_URL}/products`)
    return await response.json()
  } catch (error) {
    console.error('Error fetching productos:', error)
    return []
  }
}

export async function getCategorias() {
  try {
    const response = await fetch(`${API_URL}/categories`)
    return await response.json()
  } catch (error) {
    console.error('Error fetching categorías:', error)
    return []
  }
}

export async function postProducto(producto) {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','x-token' : token },
      body: JSON.stringify(producto)
    })
    return await parseResponse(response)
}

export async function deleteProducto(id) {
  try {
    await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' })
    alert('Producto eliminado exitosamente.')
    return true
  } catch (error) {
    console.error('Error deleting producto:', error)
    return false
  }
}

export async function updateProducto(id, productoEditado) {
  try {
    await fetch(`${API_URL}/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productoEditado)
    })
    alert('Producto editado exitosamente.')
    return true
  } catch (error) {
    console.error('Error updating producto:', error)
    return false
  }
}

export async function getProductoById(id) {
  try {
    const response = await fetch(`${API_URL}/products/${id}`)
    return await response.json()
  } catch (error) {
    console.error('Error fetching producto by ID:', error)
    return null
  }
}