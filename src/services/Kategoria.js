import axios from "axios"

 const baseUrl = "https://localhost:7079/api/Kategoriat"

const haeKaikki = () => {
    
    // const config = {
    //     headers: { Authorization: token },
    // }
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const lisaaUusi = uusiKategoria => {
    return axios.post(baseUrl, uusiKategoria)
}

const poista = id => {
    // const config = {
    //     headers: { Authorization: token },
    // }
    return axios.delete(`${baseUrl}/${id}`)
}

export default { haeKaikki,lisaaUusi,poista}