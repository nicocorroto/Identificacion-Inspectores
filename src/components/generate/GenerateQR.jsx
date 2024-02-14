import { useState } from 'react'
import './GenerateQR.css'
import QRCode from 'qrcode'
import cryptoJs from 'crypto-js';



function GenerateQR() {

    const [dni, setDni] = useState('')
    const [qr, setQr] = useState('')

    const GenerateCode = (e) => {
        e.preventDefault()

        if (!dni) {
            console.error('Ingrese un DNI válido.');
            return;
        }

        try {
            const hashedDni = cryptoJs.SHA256(dni).toString(cryptoJs.enc.Hex);
            console.log(hashedDni)
            
            const qrDataUrl = `http://localhost:5173/agentes/${hashedDni}`;

            

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
