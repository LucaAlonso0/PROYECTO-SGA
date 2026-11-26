import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import API_URL from "../config/api" // URL del backend (.env)

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem("token"))
    const [cargando, setCargando] = useState(true)
        // Guarda los datos del usuario logueado (nombre, email, rol)
    const [usuario, setUsuario] = useState(() => {
        const guardado = localStorage.getItem("usuario")
        return guardado ? JSON.parse(guardado) : null
    })

     const cerrarSesion = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("usuario") // También borra el usuario guardado
        setToken(null)
        setUsuario(null)
    }
    }

    useEffect(() => {
        const verificarSesion = async () => {
            const tokenGuardado = localStorage.getItem("token")
            
            if (!tokenGuardado) {
                setToken(null)
                setCargando(false)
                return
            }
            try {
                const respuesta = await fetch(`${API_URL}/alumnos`, 
                    {headers: {Authorization: `Bearer ${tokenGuardado}`}}
                )
            if (!respuesta.ok) {
                throw new Error("Sesión inválida")
            }
            setToken(tokenGuardado)
            } catch (error){
                console.error("Error al iniciar sesión", error)
                cerrarSesion()
            } finally {
                setCargando(false)
            }
        }
        verificarSesion()
    }, [])

    return (
        <AuthContext.Provider
        value={{token, setToken, cerrarSesion, cargando}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider