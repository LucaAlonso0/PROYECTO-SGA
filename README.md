# Sistema de Gestión Académica (SGA)

Proyecto desarrollado por **Luca Alonso** para la materia Programación IV.

## Descripción

El Sistema de Gestión Académica (SGA) es una aplicación web para administrar alumnos, docentes, cursos y materias.

El proyecto va creciendo de forma progresiva: empezó como un frontend en HTML, CSS y JavaScript con persistencia en `localStorage`, pasó a tener un backend propio con Express y MongoDB, y hoy cuenta además con un frontend en React.

## Objetivos

- Gestionar alumnos.
- Gestionar docentes.
- Gestionar cursos.
- Gestionar materias.
- Implementar autenticación de usuarios.
- Consumir una API REST.
- Persistir la información en MongoDB.

## Tecnologías

**Frontend**
- HTML5, CSS y JavaScript
- React + Vite
- Material UI
- React Router

**Backend**
- Node.js
- Express
- MongoDB + Mongoose
- bcrypt (hash de contraseñas)
- dotenv y cors

## Estructura del proyecto

```
SGA/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── alumnos.controller.js
│   │   ├── docentes.controller.js
│   │   └── authController.js
│   ├── models/
│   │   ├── Alumno.js
│   │   ├── Docente.js
│   │   └── Usuario.js
│   ├── routes/
│   │   ├── alumnos.routes.js
│   │   ├── docentes.routes.js
│   │   └── authRoutes.js
│   ├── crearUsuario.js
│   └── server.js
├── frontend/
│   ├── index.html
│   ├── alumnos.html
│   ├── docentes.html
│   ├── CSS/
│   │   └── estilos.css
│   └── JS/
│       ├── alumnos.js
│       ├── docentes.js
│       ├── storage.js
│       └── ui.js
└── frontend-react/
    └── src/
        ├── components/
        ├── layouts/
        ├── pages/
        └── styles/
```

## Funcionalidades

- Página de inicio y navegación entre módulos.
- Módulos de alumnos y docentes con CRUD completo.
- Validaciones de formularios.
- Persistencia mediante `localStorage` (versión inicial).
- Separación entre Frontend y Backend.
- API REST con Express.
- Validación de los datos recibidos mediante `req.body`.
- Manejo de códigos de estado: `400` para datos inválidos, `404` para registros no encontrados y `201` para altas.
- Manejo de errores en las operaciones del CRUD.
- Conexión a MongoDB con Mongoose (`config/database.js`).
- Schemas y modelos para Alumno, Docente y Usuario.
- Autenticación de usuarios.
- Frontend en React con Material UI y selector de tema claro/oscuro.

## Cómo ejecutarlo

**Backend**
```bash
cd backend
npm install
npm run dev
```
Requiere un archivo `.env` con la cadena de conexión a MongoDB.

**Frontend React**
```bash
cd frontend-react
npm install
npm run dev
```

## Autor

**Luca Alonso**

Programación IV
