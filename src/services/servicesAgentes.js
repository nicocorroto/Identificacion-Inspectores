export function getAgenteById(id) {
  return fetch('http://localhost:5173/agentes.json')
    .then(res => res.json())
    .then(resu => {
      // eslint-disable-next-line eqeqeq
      const agente = resu.find(a => a.id == id)
      console.log(agente)
      return agente
    })
}

export function getAgenteByNum(num) {
  //return fetch(`http://localhost:5173/agentes.json`, options)


  const options = { method: 'GET' };
  console.log(num)

  return fetch(`http://172.20.254.38:8080/api/inspector?hashLagajo=f63408a66d0e1f2e2bcf165aa809419703fc6f3fd3a42350b83dc2c300d13aca`, options)
    .then(response => response.json())
    .then(response => {
      // console.log(response)
      // const agente = response.find(a => a.id == num)
      // console.log(agente)
      return response
    })
    .catch(err => console.error(err));
}

export function postInsertImg(Num, img) {

  var formdata = new FormData();
  formdata.append("Legajo", Num);
  formdata.append("Imagen", img);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  console.log("----- Numero Afiliado -----")
  console.log(Num)
  console.log("----- Imagen -----")
  console.log(img)

  debugger
  fetch("http://localhost:5212/api/subi-imagen", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result) )
    .catch(error => console.log('error', error));
}