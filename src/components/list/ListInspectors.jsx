import { useEffect, useState } from 'react'
import './ListInspectors.css'
import { getListInpectores } from '../../services/servicesList'
import QRCode from 'qrcode'
// import dataRead from '../../../public/QR.json'
import { Link } from 'react-router-dom'

//'http://localhost:5212/api/inspectores/list?pagina=1&sizePagina=4'
//.then(text => setQr("data:image/png;base64," + text))
//"/public/QR-ISAIAS.png"

function ListInspectors() {

    const [data, setData] = useState(null)

    const [qr, setQr] = useState('')

    const GenerateCode = (IDNI) => {
        
        if (!IDNI) {
            console.error('Ingrese un DNI válido.');
            return;
        }

        try {
            //const hashedDni = cryptoJs.SHA256(IDNI).toString(cryptoJs.enc.Hex);
            //console.log(hashedDni)

            const qrDataUrl = `http://172.20.255.15/inspectores/${IDNI}`;
            console.log(qrDataUrl)
            QRCode.toDataURL(qrDataUrl, {
                width: 350,
                color: {
                    dark: '#282c34',
                    light: '#EEEEEEFF'
                }
            }, (err, qrDataUrl) => {
                if (err) {
                    console.log(err)
                }
                setQr(qrDataUrl)
                console.log(qrDataUrl)
            })
        } catch (error) {
            console.error('Error al calcular el hash:', error);
        }
    }

    useEffect(() => {
        Generar()
    }, [])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function Generar() {
        console.log("object")
        getListInpectores().then(res => setData(res))
        console.log(data)
    }

    return (
        <>
            <h1>Listado de inspectores</h1>
            <div className="card-container">
                {
                    data !== null ?
                        data.map((datos, i) => (
                            <div className='card' key={i}>
                                <div className='card-content'>
                                    {
                                        datos.urlImagen === null ?
                                            ''
                                            :
                                            <img src={'http://172.20.254.38:8080'+datos.urlImagen} />
                                    }
                                    <p>Numero de afiliado: {datos.numeroAfiliado}</p>
                                    <p>Nombre: {datos.nombreCompleto}</p>
                                    <p>DNI: {datos.documento}</p>
                                    <p>Funcion {datos.funcion}</p>
                                    <div className='content-btn'>
                                        <a onClick={() => GenerateCode(datos.hashLagajo)} href={qr} download={`${datos.nombreCompleto}-${datos.numeroAfiliado}-qr.png`} className='Descargar-qr'>
                                            Generar QR
                                        </a>
                                        <Link to={`/Insert/${datos.numeroAfiliado}`}>
                                            <button>
                                                Agregar imagen
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                        :
                        <p>No hay datos</p>
                }
            </div>
        </>
    )
}

export default ListInspectors