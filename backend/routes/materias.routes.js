const express = require("express")
const { verificarToken } = require("../middlewares/authMiddleware") // Comprueba que haya un token válido
const { verificarRol } = require("../middlewares/rolMiddleware") // Comprueba el rol del usuario
const {
    obtenerMaterias,
    obtenerMateria,
    crearMateria,
    actualizarMateria,
    eliminarMateria
} = require("../controllers/materias.controller")
const router = express.Router()

// Consultas: cualquier usuario logueado
router.get("/", verificarToken, obtenerMaterias)

router.get("/:codigo", verificarToken, obtenerMateria)

// Alta, modificación y baja: solo el admin
router.post("/", verificarToken, verificarRol("admin"), crearMateria)

router.put("/:codigo", verificarToken, verificarRol("admin"), actualizarMateria)

router.delete("/:codigo", verificarToken, verificarRol("admin"), eliminarMateria)

module.exports = router