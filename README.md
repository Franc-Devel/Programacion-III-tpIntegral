# Trabajo Práctico Integrador - Backend

Este proyecto es la entrega del Trabajo Práctico Integrador, enfocado en el diseño e implementación de un modelo de datos relacional utilizando **Node.js, Express, Prisma ORM y MariaDB/MySQL**.

## 🧱 Modelo de Datos y Entidades

El sistema simula un escenario de compras en línea. Se partió de dos entidades base (`Category` y `Product`) y se expandió el esquema agregando el flujo de compras con las siguientes entidades:

1. **User**: Representa a los clientes del sistema.
2. **Order**: Representa la compra general o "carrito" de un usuario en un momento dado.
3. **OrderItem**: Es la tabla intermedia que guarda el detalle de la compra (cantidad y precio congelado al momento de la adquisición).

## 🔗 Relaciones entre Entidades

El modelo lógico implementado respeta las siguientes relaciones:

* **Category 1 → N Product**: Una categoría agrupa múltiples productos. Un producto pertenece a una sola categoría.
* **User 1 → N Order**: Un usuario puede realizar múltiples órdenes de compra a lo largo del tiempo.
* **Order 1 → N OrderItem**: Una orden tiene múltiples detalles (ítems), uno por cada producto diferente comprado.
* **Product 1 → N OrderItem**: Un mismo producto puede estar presente en muchas órdenes diferentes de distintos usuarios.

Esta estructura resuelve la relación de *Muchos a Muchos* (N:N) entre `Order` y `Product` a través de la entidad intermedia `OrderItem`.

## 🚀 Pasos para ejecutar el proyecto

### 1. Configuración Inicial
Asegúrate de tener un servidor de base de datos MySQL/MariaDB corriendo (ej: a través de XAMPP).
Crea una base de datos vacía llamada `tp_sprint2_db`.

### 2. Instalación de dependencias
Abre la terminal en la raíz del proyecto y ejecuta:
```bash
npm install