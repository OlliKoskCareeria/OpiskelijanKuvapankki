import axios from "axios"

const baseUrl = "https://localhost:7079/api/Kuvat"

const haeKaikki = () => {
    
    // const config = {
    //     headers: { Authorization: token },
    // }
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const haeDetails = it => {
    return axios.get(`${baseUrl}/${it}`)
}

const haeKategorianPerusteella = (knimi) => {
    const request = axios.get(`${baseUrl}/KategoriaNimi/${knimi}`)
    console.log(request)
    return request.then(response => response.data)
}


export default { haeKaikki, haeDetails, haeKategorianPerusteella}