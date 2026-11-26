// Recibe los roles permitidos, por ejemplo verificarRol("admin")
const verificarRol = (...rolesPermitidos) => {
    return (req, res, next) => {
        // Si no hay usuario, verificarToken no se ejecutó antes
        if (!req.usuario) {
            return res.status(401).json({
                mensaje: "Primero debés autenticarte"
            })
        }
        // Si el rol del token no está entre los permitidos, responde 403
        if (!rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({
                mensaje: "No tenés permisos para esta operación"
            })
        }

        next() // Si tiene el rol, sigue al controlador
    }
}

module.exports = { verificarRol }