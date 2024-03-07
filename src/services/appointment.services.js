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

    getAllAppointments = () => {
        return this.axiosApp.get('/api/appointment')
    }

    getAppointment = (appointmentId) => {
        return this.axiosApp.get(`/api/appointment/${appointmentId}`)
    }

    createAppointment

    updateAppointment = (appointmentId, requestBody) => {
        return this.axiosApp.put(`/api/appointment/${appointmentId}`, requestBody)
    }


}

export default new AppointmentService()