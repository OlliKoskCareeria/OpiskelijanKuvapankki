import axios from "axios"

 const baseUrl = "https://localhost:7079/api/Kuvat"

const haeKaikki = () => {
    
    // const config = {
    //     headers: { Authorization: token },
    // }
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default { haeKaikki}