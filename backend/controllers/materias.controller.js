const Materia = require("../models/Materia")

function validarMateria({ codigo, nombre, descripcion, cargaHoraria, estado }) {
    if (codigo === undefined || nombre === undefined || cargaHoraria === undefined || estado === undefined) {
        return "Código, nombre, carga horaria y estado son obligatorios"
    }
    if (typeof codigo !== "string" || codigo.trim() === "") {
        return "El código no puede estar vacío"
    }
    if (typeof nombre !== "string" || nombre.trim() === "") {
        return "El nombre no puede estar vacío"
    }
    if (descripcion !== undefined && typeof descripcion !== "string") {
        return "La descripción debe ser un texto"
    }
    if (descripcion && descripcion.trim() === "") {
        return "La descripción no puede contener solo espacios"
    }
    if (typeof cargaHoraria !== "number") {
        return "La carga horaria debe ser un número"
    }
    if (!Number.isInteger(cargaHoraria) || cargaHoraria <= 0) {
        return "La carga horaria debe ser un número entero mayor que cero"
    }
    if (estado !== "activa" && estado !== "inactiva") {
        return "El estado solo puede ser activa o inactiva"
    }
    return null
}

function manejarError(error, res) {
    if (error.code === 11000) {
        return res.status(400).json({
            mensaje: "Ya existe una materia con ese código"
        })
    }
    if (error.name === "ValidationError") {
        const primerError = Object.values(error.errors)[0]
        return res.status(400).json({
            mensaje: primerError.message
        })
    }
    console.error("Error en materias: ", error)
    return res.status(500).json({
        mensaje: "Error interno del servidor"
    })
}

async function obtenerMaterias(req, res) {
    try {
        const materias = await Materia.find()
        res.json(materias)
    } catch (error) {
        manejarError(error, res)
    }
}

async function obtenerMateria(req, res) {
    try {
        const materia = await Materia.findOne({
            codigo: req.params.codigo
        })
        if (!materia) {
            return res.status(404).json({
                mensaje: "Materia no encontrada"
            })
        }
        res.json(materia)
    } catch (error) {
        manejarError(error, res)
    }
}

async function crearMateria(req, res) {
    try {
        const mensajeError = validarMateria(req.body)
        if (mensajeError) {
            return res.status(400).json({
                mensaje: mensajeError
            })
        }
        const { codigo, nombre, descripcion, cargaHoraria, estado } = req.body
        const existe = await Materia.findOne({
            codigo: codigo.trim()
        })
        if (existe) {
            return res.status(400).json({
                mensaje: "Ya existe una materia con ese código"
            })
        }
        const nuevaMateria = await Materia.create({
            codigo,
            nombre,
            descripcion,
            cargaHoraria,
            estado
        })
        res.status(201).json(nuevaMateria)
    } catch (error) {
        manejarError(error, res)
    }
}

async function actualizarMateria(req, res) {
    try {
        const mensajeError = validarMateria(req.body)
        if (mensajeError) {
            return res.status(400).json({
                mensaje: mensajeError
            })
        }
        const materia = await Materia.findOne({
            codigo: req.params.codigo
        })
        if (!materia) {
            return res.status(404).json({
                mensaje: "Materia no encontrada"
            })
        }
        const { codigo, nombre, descripcion, cargaHoraria, estado } = req.body
        if (codigo.trim() !== materia.codigo) {
            const existe = await Materia.findOne({
                codigo: codigo.trim()
            })
            if (existe) {
                return res.status(400).json({
                    mensaje: "Ya existe una materia con ese código"
                })
            }
        }
        const materiaActualizada = await Materia.findOneAndUpdate(
            { codigo: req.params.codigo },
            { codigo, nombre, descripcion, cargaHoraria, estado },
            { returnDocument: "after", runValidators: true }
        )
        if (!materiaActualizada) {
            return res.status(404).json({
                mensaje: "Materia no encontrada"
            })
        }
        res.json(materiaActualizada)
    } catch (error) {
        manejarError(error, res)
    }
}

async function eliminarMateria(req, res) {
    try {
        const materia = await Materia.findOneAndDelete({
            codigo: req.params.codigo
        })
        if (!materia) {
            return res.status(404).json({
                mensaje: "Materia no encontrada"
            })
        }
        res.json({ mensaje: "Materia eliminada correctamente" })
    } catch (error) {
        manejarError(error, res)
    }
}

module.exports = {
    obtenerMaterias,
    obtenerMateria,
    crearMateria,
    actualizarMateria,
    eliminarMateria
}
