import axios from "axios"

class RecordServices {

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

    createRecord = (requestBody) => {
        return this.axiosApp.post('/api/records', requestBody)
    }

}

export default new RecordServices()