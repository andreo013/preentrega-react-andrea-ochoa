# Caja Didáctica

## Entrega Final - React

Caja Didáctica es un e-commerce desarrollado con React orientado a la comercialización de materiales didácticos destinados a docentes y estudiantes de profesorados.

El proyecto fue desarrollado como trabajo final integrador de la asignatura React, aplicando los principales conceptos trabajados durante la cursada, entre ellos componentes reutilizables, navegación con React Router, manejo de estado mediante Context API, autenticación de usuarios, base de datos en Firebase y operaciones CRUD.

---

## Demo del proyecto

**Sitio publicado (Vercel)**

https://preentrega-react-andrea-ochoa.vercel.app/

**Repositorio en GitHub**

https://github.com/andreo013/preentrega-react-andrea-ochoa

---

## Objetivo

Desarrollar una aplicación web completa utilizando React y Firebase, simulando un e-commerce real orientado a un público específico: docentes y estudiantes de profesorados.

Además de permitir la navegación y compra simulada de materiales didácticos, el proyecto incorpora un panel de administración para gestionar los productos mediante operaciones CRUD.

---

## Funcionalidades principales

* Catálogo organizado por categorías.
* Productos destacados en la página principal.
* Buscador de materiales.
* Búsqueda sin distinguir mayúsculas, minúsculas ni tildes.
* Paginación de productos.
* Vista de detalle de cada material.
* Carrito de compras con control de cantidades.
* Eliminación individual de productos.
* Vaciado completo del carrito.
* Finalización de compra simulada.
* Formulario de contacto con validaciones y mensaje de confirmación.
* Registro e inicio de sesión mediante Firebase Authentication.
* Ruta protegida para el acceso al panel de administración.
* Panel de gestión con operaciones CRUD:
* Alta de productos.
* Modificación de productos.
* Eliminación de productos.
* Buscador de productos para facilitar la administración.
* Carga de imágenes mediante ImgBB.
* Diseño responsive para distintos tamaños de pantalla.
* Optimización SEO básica utilizando React Helmet.
* Gestión de cupones de descuento desde el panel de administración.
* Aplicación de cupones de descuento en el carrito con recálculo automático del total.

---

## Tecnologías utilizadas

* React
* Vite
* React Router DOM
* Context API
* Firebase Authentication
* Cloud Firestore
* React Bootstrap
* React Toastify
* React Helmet Async
* React Icons
* ImgBB API
* CSS Modules
* Vercel
* Git y GitHub

---

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/andreo013/preentrega-react-andrea-ochoa.git
```

Ingresar al proyecto:

```bash
cd preentrega-react-andrea-ochoa
```

Instalar dependencias:

```bash
npm install
```

Ejecutar el proyecto:

```bash
npm run dev
```

Generar la versión de producción:

```bash
npm run build
```

---

## Variables de entorno

El proyecto utiliza variables de entorno para proteger la configuración de Firebase y la API de ImgBB.

Ejemplo:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_IMGBB_API_KEY=
```

---

## Panel de administración

El panel de administración permite gestionar los materiales almacenados en Firebase.

Entre sus funcionalidades se incluyen:

* Alta de productos.
* Edición de productos.
* Eliminación de productos.
* Buscador para localizar rápidamente un material.
* Gestión de cupones de descuento (alta y eliminación).
* Actualización automática del listado luego de cada modificación.

El acceso a esta sección se encuentra protegido mediante autenticación.
---

## Diseño responsive

La aplicación fue desarrollada utilizando un diseño adaptable a distintos dispositivos, permitiendo una correcta visualización tanto en computadoras como en tablets y teléfonos móviles.

---

## Posibles mejoras

Como evolución futura del proyecto podrían incorporarse nuevas funcionalidades, tales como:

* Pasarela de pago real.
* Gestión de pedidos.
* Lista de favoritos.
* Historial de compras.
* Filtros avanzados por categoría y precio.
* Valoraciones y comentarios de usuarios.

---

## Autora

**Andrea Ochoa**

Proyecto desarrollado como trabajo final de la asignatura React.

