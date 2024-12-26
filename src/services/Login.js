import axios from "axios"

 const baseUrl = "https://localhost:7079/api/Logins"

 let token = null


const setToken = newToken => {token = `bearer ${newToken}`}

const HaeYksiKayttaja = id => {
    const config = {
        headers: { Authorization: token }
    }
    const request = axios.get(`${baseUrl}/${id}`, config)
    return request.then(response => response.data)
}


export default { HaeYksiKayttaja, setToken }