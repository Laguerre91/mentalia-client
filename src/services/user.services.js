import axios from "axios"

class UserService {

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

    getUser = (userId) => {

        return this.axiosApp.get(`/api/usuarios/${userId}`)

    }

    updateUser = (userId, updatedUserData) => {
        return this.axiosApp.put(`/api/usuarios/${userId}`, updatedUserData)
    }
}

export default new UserService()