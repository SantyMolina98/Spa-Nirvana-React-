# SPA React - Salón de Belleza

Nirvana Spa & Beauty es una plataforma web integral diseñada para gestionar reservas y servicios de un spa exclusivo. Ofrece una experiencia de usuario (UX) relajante, premium y altamente intuitiva, permitiendo a los clientes explorar tratamientos, gestionar su carrito de turnos y administrar sus cuentas.

# Características Principales

- 🛒 **Carrito de Turnos Inteligente:** Sistema de reservas múltiple con validación de horarios, fechas y profesionales en tiempo real.
- 💅 **Diseño UI/UX Premium:** Interfaz completamente responsiva con estética minimalista, maquetada con CSS Grid, Flexbox y animaciones sutiles.
- 🔐 **Autenticación y Recuperación:** Sistema de Login/Registro y recuperación de contraseñas integrados.
- ⚙️ **Panel de Administración:** Gestión de servicios, categorías y control de turnos exclusivos para usuarios con rol Admin.
- 📧 **Notificaciones Automatizadas:** Integración con EmailJS para el envío de correos de bienvenida al registrarse.

## Lenguajes Utilizados

- **JavaScript (ES6+)**: Lenguaje principal para la lógica de la aplicación.
- **HTML**: Estructura de las páginas.
- **CSS**: Estilos y diseño de la interfaz.

## Librerías y Dependencias

### Dependencias Principales
- **React** (v19.2.3): Biblioteca para construir interfaces de usuario.
- **React DOM** (v19.2.3): Para renderizar componentes React en el DOM.
- **React Router DOM** (v7.11.0): Para el enrutamiento de páginas en la SPA.
- **React Bootstrap** (v2.10.10): Componentes de Bootstrap para React.
- **Bootstrap** (v5.3.8): Framework CSS para diseño responsivo.
- **Bootstrap Icons** (v1.13.1): Iconos de Bootstrap.
- **React Datepicker** (v8.10.0): Componente para seleccionar fechas.
- **@emailjs/browser** (v4.4.1): Para enviar correos electrónicos desde el navegador.
- **React Router Hash Link** (v2.4.3): Para navegación con anclas en React Router.
- **AOS** (v2.3.4): Para animaciones básicas.

### Dependencias de Desarrollo
- **Vite** (v7.1.2): Herramienta de construcción y servidor de desarrollo.
- **ESLint**: Para linting del código JavaScript.
- **@vitejs/plugin-react-swc**: Plugin de Vite para React con SWC.

## Modo de Uso 
Si deseas correr este proyecto en tu entorno local, sigue estos pasos:

### Instalación
1. Clona el repositorio o descarga los archivos.
2. Navega al directorio del proyecto: `cd spa-react`
3. Instala las dependencias: `npm install`

### Ejecución desde el link
- "https://spa-nirvana.netlify.app/"
Este proyecto está deployado en Netlify, usando una URL gratuita proporcionada del mismo, también usted podrá navegar desde aquí explorando como un usuario normal o un usuario administrador. También podrá crear un usuario desde cero, completando con sus datos, aclarando que navegará como un usuario común luego de realizar su registro. Si desea navegar con un usuario ya creado, las credenciales serán dadas en el siguiente paso.

## Usuarios de ejemplo
- *USUARIO (común)* : Email : usuario2026@gmail.com
                      Contraseña : 123456

- *USUARIO (Admin)* : Email : nazarenamolina2@gmail.com
                      Contraseña : 123456

### Ejecución en Modo Desarrollo
- Ejecuta `npm run dev` para iniciar el servidor de desarrollo.
- Abre tu navegador y ve a `http://localhost:5173` (o el puerto que indique Vite).

### Construcción para Producción
- Ejecuta `npm run build` para construir la aplicación.
- Los archivos generados estarán en la carpeta `dist`.

### Vista Previa de Producción
- Después de construir, ejecuta `npm run preview` para ver la aplicación en un servidor local.



## Estructura del Proyecto

- `src/components/`: Componentes reutilizables (Header, Footer, Login, etc.).
- `src/pages/`: Páginas principales (HomePage, Servicios, Turnos, etc.).
- `src/context/`: Contextos de React (UserContext).
- `src/helpers/`: Funciones auxiliares para APIs (FetchApi, LoginApi, etc.).
- `src/routes/`: Rutas protegidas (ProtectedAdmin).
- `src/styles/`: Archivos CSS para estilos específicos.
- `public/`: Archivos estáticos.

## Funcionalidades

- Visualización de servicios (faciales, masajes, tratamientos corporales, etc.).
- Sistema de reservas y turnos.
- Autenticación de usuarios (login, registro, recuperación de contraseña).
- Panel de administración.
- Formulario de contacto con envío de emails.
- Diseño responsivo con Bootstrap.


## Licencia

Este proyecto es privado y no tiene licencia específica.
