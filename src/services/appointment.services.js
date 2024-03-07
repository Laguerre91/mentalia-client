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

    getAllAppointments = () => {
        return this.axiosApp.get('/api/appointments')
    }

    getAppointment = (appointmentId) => {
        return this.axiosApp.get(`/api/appointments/${appointmentId}`)
    }

    updateAppointment = (appointmentId, requestBody) => {
        return this.axiosApp.put(`/api/appointments/${appointmentId}`, requestBody)
    }

    deleteAppointment = (appointmentId) => {
        return this.axiosApp.delete(`/api/appointments/${appointmentId}`)
    }


}

export default new AppointmentService()