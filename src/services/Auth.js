import axios from "axios"

const baseUrl = "https://localhost:7079/api/Autentikaatio"
//const baseUrl = "https://northwindrestapi20240529210032.azurewebsites.net/api/authentication"

const authenticate = (userForAuth) => {
    const request = axios.post(baseUrl, userForAuth)
    
    return request.then(response => response)
   
}

export default { authenticate }