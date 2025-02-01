import axios from "axios"

 const baseUrl = "https://localhost:7079/api/Kategoriat"

 let token = null

 const setToken = newToken => {token = `bearer ${newToken}`}

const haeKaikki = () => {
    
    // const config = {
    //     headers: { Authorization: token },
    // }
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const lisaaUusi = uusiKategoria => {
    const config = {
    headers: { Authorization: token },
     }
    return axios.post(baseUrl, uusiKategoria,config)
}

const poista = id => {
    const config = {
    headers: { Authorization: token },
     }
    return axios.delete(`${baseUrl}/${id}`, config)
}

export default { haeKaikki,lisaaUusi,poista,setToken}