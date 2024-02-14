export function getListInpectores(){
    return fetch('http://172.20.254.38:8080/api/inspectores/list?pagina=1&sizePagina=18')
        .then(res => res.json())
        .then(res => {
            console.log(res)
            return res
        })
}