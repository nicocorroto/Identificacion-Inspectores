import { useState } from 'react'
import './GenerateQR.css'
import QRCode from 'qrcode'


function GenerateQR() {

    const [dni, setDni] = useState('')
    const [qr, setQr] = useState('')

    const GenerateCode = (e) => {
        e.preventDefault()

        QRCode.toDataURL(dni, {
            width: 350,
            color: {
                dark: '#282c34',
                light: '#EEEEEEFF'
            }
        }, (err, dni) => {
            if (err) {
                console.log(err)
            }
            setQr(dni)
        })
    }

    return (
        <div className='Cont-generar'>
            <h1 className='title-generar'>Generar QR</h1>
            <div className='Cont-input'>
                <div>
                    <label htmlFor="">DNI: </label>
                    <input
                        value={dni}
                        onChange={(e) => setDni(e.target.value)}
                        type="text"
                    />
                </div>
                <button
                    className='btn-generar'
                    onClick={GenerateCode}
                >
                    Generar
                </button>
            </div>

            {
                qr &&
                <div className='cont-qr'>
                    <br />
                    <img src={qr} alt="" className='img-qr' />
                    <br />
                    <a href={qr} download={`${dni}-qr.png`} className='btnDescargar'>Descargar</a>
                </div>
            }

        </div>
    )
}

export default GenerateQR
