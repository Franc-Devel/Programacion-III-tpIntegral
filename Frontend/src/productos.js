import { getProductos, getCategorias } from './api/productosApi.js'
import { logout } from './api/authApi.js'
import { setProductos, renderProductos, llenarCategorias, inicializarListeners } from './ui/productosUI.js'

async function inicializarApp() {
  try {
    const logoutBtn = document.getElementById('logout-btn')
    if (logoutBtn) logoutBtn.addEventListener('click', logout)
    const categorias = await getCategorias()
    llenarCategorias(categorias)
    const productos = await getProductos()
    setProductos(productos)
    renderProductos()
    inicializarListeners()
  } catch (error) {
    console.error('Error al inicializar la aplicación:', error)
  }
}

inicializarApp()