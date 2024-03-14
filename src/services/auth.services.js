import axios from "axios"

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
        return this.axiosApp.post(`/api/auth/signup`, requestBody)
    }

    loginUser = (requestBody) => {
        return this.axiosApp.post(`/api/auth/login`, requestBody)
    }

}

export default new AuthService()