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

    updateRecord = (_id, formData) => {
        return this.axiosApp.put(`/api/records/${_id}`, formData)
    }
    deleteRecord = (_id) => {
        return this.axiosApp.delete(`/api/records/${_id}`)
    }

}

export default new RecordServices()