import { ListaMaterias } from "../components/ListaMaterias"
import { useState } from "react"
import FormularioM from "../components/FormularioM"
import { useAuth } from "../context/useAuth" // Para saber el rol del usuario

export default function Materias() {
const [actualizar, setActualizar] = useState(0)
const [materiaEditar, setMateriaEditar] = useState(null)
const { usuario } = useAuth() // Trae el usuario logueado del contexto

function materiaCreada() {
  setActualizar(valor => valor + 1)
  setMateriaEditar(null)
}

function seleccionarMateria(materia) {
  setMateriaEditar(materia)
}

return (
   <>
   {/* Solo el admin ve el formulario de alta/edición */}
   {usuario?.rol === "admin" && (
   <FormularioM key={materiaEditar?.codigo ?? "nuevo"}
   onMateriaCreada={materiaCreada}
   materiaEditar={materiaEditar}
   onCancelar={() => setMateriaEditar(null)}
   />
  )}
   <ListaMaterias 
   actualizar={actualizar} 
   onMateriaCreada={materiaCreada}
   onEditarMateria={seleccionarMateria} 
   /> 
  </>
  )
}