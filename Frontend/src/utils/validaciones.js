export function validarFormulario(name, price, quantity) {
  return name && !isNaN(price) && !isNaN(quantity) && name.trim() !== '' && price > 0 && quantity >= 0
}

export function validarLogin(email, password) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && password.trim() !== ''
}