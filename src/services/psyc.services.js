import axios from "axios"

class PsycologistService {

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

    getAllPsycologists = () => {
        return this.axiosApp.get('/api/psic')
    }

    getPsycologist = (psycId) => {
        return this.axiosApp.get(`/api/psic/${psycId}`)
    }

    updatePsycologist = (psycId, requestBody) => {
        return this.axiosApp.put(`/api/psic/${psycId}`, requestBody)
    }
}

export default new PsycologistService()