const express = require("express")
const { verificarToken } = require("../middlewares/authMiddleware") // Comprueba que haya un token válido
const { verificarRol } = require("../middlewares/rolMiddleware") // Comprueba el rol del usuario
    // const alumnosController = require("../controllers/alumnos.controller")
const {
    obtenerDocentes,
    obtenerDocente,
    crearDocente,
    actualizarDocente,
    eliminarDocente
} = require("../controllers/docentes.controller")
const router = express.Router()

// Consultas: cualquier usuario logueado
router.get("/", verificarToken, obtenerDocentes)

router.get("/:id", verificarToken, obtenerDocente)

// Alta, modificación y baja: solo el admin
router.post("/", verificarToken, verificarRol("admin"), crearDocente)

router.put("/:id", verificarToken, verificarRol("admin"), actualizarDocente)

router.delete("/:id", verificarToken, verificarRol("admin"), eliminarDocente)

module.exports = router