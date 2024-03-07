import axios from "axios"

const API_URL = "http://localhost:5005"

class AuthService {

    constructor() {

        this.axiosApp = axios.create({
            baseURL: import.meta.env.VITE_SERVER_URL
        })

        this.axiosApp.interceptors.request.use(config => {
            const storedToken = localStorage.getItem('authToken')

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` };
            }

            return config
        })
    }

    signUpUser = (requestBody) => {
        return this.axiosApp.post(`${API_URL}/api/auth/signup`, requestBody)
    }

    loginUser = (requestBody) => {
        return this.axiosApp.post(`${API_URL}/api/auth/login`, requestBody)
    }

}

export default new AuthService()