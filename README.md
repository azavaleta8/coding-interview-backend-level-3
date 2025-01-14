# Dorado - API RESTful

Este proyecto implementa una API RESTful para la gestión de ítems. La API permite crear, leer, actualizar y eliminar ítems.

## Configuracion y Ejecucion del Proyecto

### Prerrequisitos

- Node.js (v14 o superior)
- MongoDB

### Instalacion

1. Clonar el repositorio:

   ```
   git clone https://github.com/azavaleta8/coding-interview-backend-level-3.git
   cd coding-interview-backend-level-3
   ```

2. Instalar dependencias:

   ```
   npm install
   ```

3. Crear un archivo `.env` en la raiz del proyecto y configurar las variables de entorno necesarias (ver seccion de Variables de Entorno).

4. Iniciar el servidor:
   ```
   npm run dev
   ```

El servidor estara corriendo en `http://localhost:3000` (o el puerto especificado en las variables de entorno).

### Ejecución con Docker Compose

Para ejecutar el proyecto utilizando Docker Compose, sigue estos pasos:

1. Asegúrate de tener Docker y Docker Compose instalados en tu sistema.

2. Construye y levanta los contenedores:

   ```
   docker-compose up --build
   ```

El servidor estará corriendo en `http://localhost:3000` (o el puerto especificado en las variables de entorno).

## Estructura del Proyecto y Decisiones de Diseño

```
/src
  /config
  /controllers
  /middlewares
  /models
  /routes
  /services
  /types
  /utils
  /validators
/e2e
```

### Arquitectura

- Se implemento una arquitectura en capas (rutas, controladores, servicios, modelos).
- Se utilizo el patron repositorio para el acceso a datos, encapsulando la logica de la base de datos en los servicios.

## Ejecucion de Tests

Para ejecutar los tests:

```
npm test
```

Para ejecutar los tests con cobertura:

## Variables de Entorno

Crear un archivo `.env` en la raiz del proyecto con las siguientes variables: (.env expuesto con propositos demostrativos)

```
NODE_ENV =dev
HOST=localhost
PORT=3000
MONGODB_URI=mongodb+srv://abelzavaleta08:LM144a2KgXkgmwNX@cluster0.0kcpi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
MONGODB_URI_TEST=mongodb+srv://abelzavaleta08:azavaleta@cluster0.0na6s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

## Endpoints de la API

Documentacion completa de la API disponible en Swagger UI:

- DEV: `http://localhost:3000/api-docs`
- PROD: `https://coding-interview-backend-level-3.onrender.com/api-docs/`

Endpoints principales:

### Ping:

- GET /ping
  - Descripción: Obtiene status del servidor.

### Items:

- POST /items
  - Descripción: Crea un nuevo ítem.
- GET /items
  - Descripción: Obtiene la lista de todos los ítems.
- GET /items/:id
  - Descripción: Obtiene detalles de un ítem específico.
- PUT /items/:id
  - Descripción: Actualiza la información de un ítem.
- DELETE /items/:id
  - Descripción: Elimina un ítem del sistema.

## Buenas Practicas Implementadas

- Uso de async/await para manejar operaciones asincronas.
- Implementacion de logging para facilitar el debugging y monitoreo.
- Uso de ESLint para mantener un estilo de codigo consistente.

## Comentarios adicionales

- Con el fin de mantener la integridad del archivo e2e y no modificarlo. Implemente un funcionalidad para mockear las peticiones provenientes de happi server al servidor de express.
- Timpo total empleado 18h
