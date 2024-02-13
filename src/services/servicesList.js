export function getListInpectores(){
    return fetch('http://localhost:5173/QR.json')
        .then(res => res.json())
        .then(res => {
            console.log(res)
            return res
        })
}