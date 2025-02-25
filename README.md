# Proyecto de Gestión de Alumnos - UJED

Este proyecto es una aplicación web para la gestión de alumnos, desarrollado utilizando React en el frontend y Node.js en el backend. La aplicación incluye funcionalidades como autenticación de usuarios con Auth0, manejo de datos de alumnos, y más.

## Características

- Autenticación de usuarios con Auth0.
- Gestión de datos de alumnos.
- Interfaz de usuario responsiva y moderna.

## Requisitos

- Node.js (versión recomendada: 14.x o superior)
- npm (versión recomendada: 6.x o superior)
- Base de datos MySQL

## Instalación

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

1. Clona el repositorio:

    ```sh
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio
    ```

2. Instala las dependencias del servidor:

    ```sh
    cd backend
    npm install
    ```

3. Configura las variables de entorno para el backend. Crea un archivo `.env` en la carpeta `backend` con las siguientes variables:

    ```env
    AUTH0_DOMAIN=tu-dominio.auth0.com
    AUTH0_CLIENT_ID=tu-client-id
    AUTH0_CLIENT_SECRET=tu-client-secret
    MYSQL_HOST=localhost
    MYSQL_USER=tu-usuario
    MYSQL_PASSWORD=tu-contraseña
    MYSQL_DATABASE=nombre-de-tu-base-de-datos
    ```

4. Inicia el servidor:

    ```sh
    node server.js
    ```

5. Instala las dependencias del frontend:

    ```sh
    cd ../frontend
    npm install
    ```

6. Inicia la aplicación de React:

    ```sh
    npm start
    ```

## Estructura del Proyecto

El proyecto está organizado en dos principales directorios:

- `backend`: Contiene el servidor Node.js y las configuraciones de la base de datos.
- `frontend`: Contiene la aplicación de React y sus componentes.

## Scripts Disponibles

En el directorio del proyecto puedes ejecutar los siguientes comandos:

### `npm start`

Ejecuta la aplicación en modo de desarrollo.  
Abre [http://localhost:3000](http://localhost:3000) para verla en tu navegador.

### `npm test`

Ejecuta los tests configurados en el proyecto.

### `npm run build`

Construye la aplicación para producción en la carpeta `build`.  
Optimiza la construcción para mejor rendimiento.

### `node server.js`

Inicia el servidor Node.js. Asegúrate de ejecutar este comando antes de iniciar la aplicación React.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue para discutir el cambio que deseas realizar.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---
