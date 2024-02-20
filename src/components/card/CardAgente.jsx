import './CardAgente.css'
import logo from '../../assets/logo_municipalidad.webp'
import img1 from '../../assets/img1.webp'
import muni from '../../../public/chala.webp'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAgenteById, getAgenteByNum } from '../../services/servicesAgentes'

//http://localhost:5212/api/inspectores?hashLagajo=3d0ddec1ca8b4863e0618d5527ff6075d9f131960115c8e2a6384f09eb09a272'

function CardAgente() {
  const [dataAgente, setDataAgente] = useState(null)
  const { numeroAfiliado } = useParams()

  // const [activeTab, setactiveTab] = useState(0);
  // const seleccionar = (index) => {
  //   setactiveTab(index);
  // };

  useEffect(() => {
    console.log(numeroAfiliado)
    cargarAgente()
  }, [])

  function cargarAgente() {
    getAgenteById().then(res => setDataAgente(res))
    console.log(dataAgente)
  }

  return (
    <div className='container'>
      <div className='cont-card'>
        <div className="cont-logos">
          <div>
            <img src={logo} alt="imagen perfil " className='logo' />
          </div>
          <div>
            <img src={muni} alt="" className='muni' />
          </div>
        </div>
        {/* <div className='img-User'>
        </div> */}
        <div className='cont-data'>
          <img src={img1} className={`img-logo ${dataAgente != null && dataAgente.activo == 1 ? '' : 'false'}`} alt="imagen perfil " />
          <div className='data-user'>
            <div>
              <p>Nombre:
                <strong>{(dataAgente != null && dataAgente.nombreCompleto)}</strong>
              </p>
              <p>Numero Afiliado:
                <strong>{(dataAgente != null && dataAgente.numeroAfiliado)}</strong>
              </p>
              <p>Funcion:
                <strong>{(dataAgente != null && dataAgente.funcion)}</strong>
              </p>
            </div>
            <div>
              <p>DNI: <strong>{(dataAgente != null && dataAgente.documento)}</strong></p>
              <p>Oficina: <strong>{(dataAgente != null && dataAgente.oficina)} </strong></p>
              <p>Tarea: <strong> {(dataAgente != null && dataAgente.tarea)} </strong></p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className='Funciones'>
        <p>No hay datos</p>
      </div>
    </div>
  )
}

export default CardAgente
