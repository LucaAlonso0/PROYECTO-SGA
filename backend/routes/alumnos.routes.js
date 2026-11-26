const express = require("express")
const { verificarToken } = require("../middlewares/authMiddleware") // Comprueba que haya un token válido
const { verificarRol } = require("../middlewares/rolMiddleware") // NUEVO: comprueba el rol del usuario

const {
    obtenerAlumnos,
    obtenerAlumno,
    crearAlumno,
    actualizarAlumno,
    eliminarAlumno
} = require("../controllers/alumnos.controller")
const router = express.Router()

// Consultas: cualquier usuario logueado
router.get("/", verificarToken, obtenerAlumnos)
router.get("/:id", verificarToken, obtenerAlumno)

// Alta, modificación y baja: solo el admin
router.post("/", verificarToken, verificarRol("admin"), crearAlumno)
router.put("/:id", verificarToken, verificarRol("admin"), actualizarAlumno)
router.delete("/:id", verificarToken, verificarRol("admin"), eliminarAlumno)

module.exports = router