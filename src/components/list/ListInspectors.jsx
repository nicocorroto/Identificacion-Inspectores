import { useEffect, useState } from 'react'
import './ListInspectors.css'
import { getListInpectores } from '../../services/servicesList'
import QRCode from 'qrcode'
// import dataRead from '../../../public/QR.json'
import { Link } from 'react-router-dom'

//'http://localhost:5212/api/inspectores/list?pagina=1&sizePagina=4'
//.then(text => setQr("data:image/png;base64," + text))
//"/public/QR-ISAIAS.png"
// <img src={'http://172.20.254.38:8080'+datos.urlImagen} />

//const hashedDni = cryptoJs.SHA256(IDNI).toString(cryptoJs.enc.Hex);
//console.log(hashedDni)

//Cambiar a manera dinamica

function ListInspectors() {

    const [data, setData] = useState(null)

    const [qr, setQr] = useState('')

    // const GenerateCode = (IDNI) => {

    //     if (!IDNI) {
    //         console.error('Ingrese un DNI válido.');
    //         return;
    //     }

    //     try {

    //         const qrDataUrl = `http://172.20.255.15:3010/inspectores/${IDNI}`;
    //         console.log(qrDataUrl)
    //         QRCode.toDataURL(qrDataUrl, {
    //             width: 350,
    //             color: {
    //                 dark: '#282c34',
    //                 light: '#EEEEEEFF'
    //             }
    //         }, (err, qrDataUrl) => {
    //             if (err) {
    //                 console.log(err)
    //             }
    //             setQr(qrDataUrl)
    //             console.log(qrDataUrl)
    //         })
    //     } catch (error) {
    //         console.error('Error al calcular el hash:', error);
    //     }
    // }

    const GenerateCode = (IDNI) => {
        if (!IDNI) {
            console.error('Ingrese un DNI válido.');
            return '';
        }

        try {
            const qrDataUrl = `http://dimsmt:3010/inspectores/${IDNI}`;
            console.log(qrDataUrl);

            let generatedQr;
            QRCode.toDataURL(qrDataUrl, {
                width: 350,
                color: {
                    dark: '#282c34',
                    light: '#EEEEEEFF',
                },
            }, (err, qrDataUrl) => {
                if (err) {
                    console.log(err);
                }
                generatedQr = qrDataUrl;
            });

            return generatedQr || ''; // Devolver el código QR generado o cadena vacía
        } catch (error) {
            console.error('Error al calcular el hash:', error);
            return '';
        }
    };

    useEffect(() => {
        Generar()
    }, [])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function Generar() {
        console.log("object")
        getListInpectores()
            .then(res => {
                setData(res)
                const generatedQrs = res.map((datos) => GenerateCode(datos.hashLagajo));
                setQr(generatedQrs);
            }
            )
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
                                    {qr[i] !== '' ? <img src={qr[i]} alt="" /> : ''}

                                    {
                                        qr === '' ?
                                            ''
                                            :
                                            <img src={qr} alt="" />

                                    }
                                    <p>Numero de afiliado: {datos.numeroAfiliado}</p>
                                    <p>Nombre: {datos.nombreCompleto}</p>
                                    <p>DNI: {datos.documento}</p>
                                    <p>Funcion {datos.funcion}</p>
                                    <div className='content-btn'>
                                        {
                                            qr[i] === '' ? "" : <a href={qr[i]} download={`${datos.nombreCompleto}-${datos.numeroAfiliado}-qr.png`} className='Descargar-qr'>
                                                Descargar QR
                                            </a>
                                        }
                                        
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