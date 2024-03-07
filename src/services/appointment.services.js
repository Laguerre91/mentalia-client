import axios from "axios"

class AppointmentService {

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

    createAppointment = (requestBody) => {
        return this.axiosApp.post('/api/appointments', requestBody)
    }

}

export default new AppointmentService()