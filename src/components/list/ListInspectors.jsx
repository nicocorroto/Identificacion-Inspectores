import { useState } from 'react'
import './ListInspectors.css'

function ListInspectors() {

    const [ qr, setQr ] = useState()

    function Generar() {
        let url = 'http://localhost:5173/QR'
    
        fetch(url).then(res=>res.text())
            .then(text=> setQr("data:image/png;base64,"+text))
    }

  return (
    <div className="Content-List">
        <h1>Listado de inspectores</h1>
        <div className='List'>
            <div className='card-list'>
                <img src={qr} alt="" />
                <h3>Nombre</h3>
                <h3>DNI</h3>
            </div>
            <button onClick={Generar}>Mostrar QR</button>
        </div>
    </div>
  )
}

export default ListInspectors