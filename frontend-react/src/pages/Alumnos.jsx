import { ListaAlumnos } from "../components/ListaAlumnos"
import { useState } from "react"
import FormularioA from "../components/FormularioA"
import { useAuth } from "../context/useAuth" // Para saber el rol del usuario

export default function Alumnos() {
const [actualizar, setActualizar] = useState(0)
const [alumnoEditar, setAlumnoEditar] = useState(null)
const { usuario } = useAuth() // Trae el usuario logueado del contexto

function alumnoCreado() {
  setActualizar(valor => valor + 1)
  setAlumnoEditar(null)
}

function seleccionarAlumno(alumno) {
  setAlumnoEditar(alumno)
}

return (
   <>
   {/* Solo el admin ve el formulario de alta/edición */}
   {usuario?.rol === "admin" && (
   <FormularioA key={alumnoEditar?.legajo ?? "nuevo"}
   onAlumnoCreado={alumnoCreado}
   alumnoEditar={alumnoEditar}
   onCancelar={() => setAlumnoEditar(null)}
   />
  )}
   <ListaAlumnos 
   actualizar={actualizar} 
   onAlumnoCreado={alumnoCreado}
   onEditarAlumno={seleccionarAlumno} 
   /> 
  </>
  )
}