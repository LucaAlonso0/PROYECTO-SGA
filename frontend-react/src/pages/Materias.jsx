import { ListaMaterias } from "../components/ListaMaterias"
import { useState } from "react"
import { Alert } from "@mui/material"
import FormularioMateria from "../components/FormularioMateria"

export default function Materias() {
const [actualizar, setActualizar] = useState(0)
const [materiaEditar, setMateriaEditar] = useState(null)
const [mensaje, setMensaje] = useState("")

function materiaGuardada(texto) {
  setActualizar(valor => valor + 1)
  setMateriaEditar(null)
  setMensaje(texto)
}

function seleccionarMateria(materia) {
  setMateriaEditar(materia)
  setMensaje("")
}

function cancelarEdicion() {
  setMateriaEditar(null)
  setMensaje("")
}

return (
   <>
   {mensaje && (
     <Alert severity="success" role="status" sx={{ mb: 3 }}>
       {mensaje}
     </Alert>
   )}
   <FormularioMateria key={materiaEditar?.codigo ?? "nuevo"}
   onMateriaGuardada={materiaGuardada}
   materiaEditar={materiaEditar}
   onCancelar={cancelarEdicion}
   />
   <ListaMaterias
   actualizar={actualizar}
   onMateriaGuardada={materiaGuardada}
   onEditarMateria={seleccionarMateria}
   />
  </>
  )
}
