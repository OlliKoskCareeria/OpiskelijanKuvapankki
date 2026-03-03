import axios from "axios"

const baseUrl = "https://localhost:7079/api/Autentikaatio"


const authenticate = (userForAuth) => {
    const request = axios.post(baseUrl, userForAuth)
    
    return request.then(response => response)
   
}

export default { authenticate }
