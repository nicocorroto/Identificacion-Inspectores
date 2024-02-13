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
  //return fetch(`http://localhost:5212/api/inspectores/${num}`, options)
  
  
  const options = { method: 'GET' };
  console.log(num)
  
  return fetch(`http://localhost:5173/agentes.json`, options)
  .then(response => response.json())
    .then(response => {
      console.log(response)
      const agente = response.find(a => a.id == num)
      console.log(agente)
      return response
    })
    .catch (err => console.error(err));
}