import './ViewAgentes.css'
import { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode'


function ViewAgentes() {
  const [scanResult, setScanResult] = useState();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    })

    scanner.render(success, error);

    function success(result) {
      scanner.clear();
      setScanResult(result)
    }

    function error(err) {
      console.warn(err)
    }

  }, [])
  return (
    <div className='cont-scanner'>
      {
        scanResult ?
          <div>
            <a href={scanResult}> {scanResult} </a>
          </div>
          :
          <div id='reader'></div>
      }
    </div>
  );
}

export default ViewAgentes
