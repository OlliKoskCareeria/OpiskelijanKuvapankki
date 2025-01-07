import axios from "axios"

const baseUrl = "https://localhost:7079/api/Kuvat"

let token = null


const setToken = newToken => {token = `bearer ${newToken}`}

const haeKaikki = () => {
    
    // const config = {
    //     headers: { Authorization: token },
    // }
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const LisaaUusi = newKuva => {
    const config = {
        headers: { Authorization: token },
        
    }
        
        
    return axios.post(baseUrl, newKuva, config)
    
}

const haeDetails = it => {
    return axios.get(`${baseUrl}/${it}`)
}

const haeKategorianPerusteella = (knimi) => {
    const request = axios.get(`${baseUrl}/KategoriaNimi/${knimi}`)
    console.log(request)
    return request.then(response => response.data)
}

const haeKayttajanPerusteella = (ktunnus) => {
    const request = axios.get(`${baseUrl}/KayttajaTunnus/${ktunnus}`)
    
    return request.then(response => response.data)
}


export default { haeKaikki, haeDetails, haeKategorianPerusteella, haeKayttajanPerusteella, LisaaUusi, setToken}