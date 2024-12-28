import axios from "axios"

 const baseUrl = "https://localhost:7079/api/Logins"

let token = null


const setToken = newToken => {token = `bearer ${newToken}`}

const haeKaikki = () => {
    
     const config = {
        headers: { Authorization: token },
     }
     const request = axios.get(baseUrl,config)
    return request.then(response => response.data)
}

const HaeYksiKayttaja = id => {
    const config = {
        headers: { Authorization: token }
    }
    const request = axios.get(`${baseUrl}/${id}`, config)
    return request.then(response => response.data)
}

const muokkaaKayttajaa = (object) => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.put(`${baseUrl}/${object.loginId}`, object, config)
    
}

const LisaaUusi = newLogin => {
    const config = {
        headers: { Authorization: token },
    }
        
        
    return axios.post(baseUrl, newLogin, config)
    
}

const poista = id => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.delete(`${baseUrl}/${id}`, config) 
 }


export default { HaeYksiKayttaja, setToken,haeKaikki,muokkaaKayttajaa,poista,LisaaUusi }