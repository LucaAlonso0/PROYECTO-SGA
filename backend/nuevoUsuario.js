// Fuerza DNS públicos, igual que en tu server.js, para que conecte a Atlas
const dns = require("dns")
dns.setServers(["8.8.8.8", "1.1.1.1"])

const mongoose = require("mongoose")
const bcrypt = require("bcrypt") // Para hashear la contraseña
require("dotenv").config() // Carga MONGO_URI del .env

const Usuario = require("./models/Usuario")

async function nuevoUsuario() {
    try {
        await mongoose.connect(process.env.MONGO_URI) // Conecta a la BD
        const email = "consulta@sga.com"
        const password = "claveUsuario123"

        const hash = await bcrypt.hash(password, 10) // Hashea la clave

        const usuario = new Usuario({
            nombre: "Usuario de consulta",
            email: email,
            password: hash,
            rol: "usuario" // Rol sin permisos de admin
        })
        await usuario.save() // Lo guarda en Mongo

        console.log("Usuario de consulta creado correctamente")
        console.log("Email:", email)
    } catch (error) {
        console.error("Error al crear el usuario: ", error.message)
    } finally {
        await mongoose.disconnect() // Cierra la conexión
    }
}

nuevoUsuario()