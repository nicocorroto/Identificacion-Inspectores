const URL = "http://172.20.255.15:2020"
// const URL = "http://172.20.254.38:8080"


export function getListInpectores(){
    return fetch(`${URL}/api/inspectores/list?pagina=1&sizePagina=64`)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            return res
        })
}