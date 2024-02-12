import { Route, Routes } from "react-router-dom"
import GenerateQR from "./components/generate/GenerateQR"
import CardAgente from "./components/card/CardAgente"
import ViewAgentes from "./components/scanner/ViewAgentes"
import ListInspectors from "./components/list/ListInspectors"

function App() {
  

  return (
    <Routes>
      <Route path='/generar' element={ <GenerateQR /> } />
      <Route path='/agentes/:id' element={ <CardAgente /> } />
      <Route path='/scaner' element={ <ViewAgentes /> } />
      <Route path='/lista' element={ <ListInspectors /> } />
    </Routes>
  )
}

export default App
