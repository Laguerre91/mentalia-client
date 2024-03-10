import axios from "axios"

class CommunityService {

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

    createPost = (requestBody) => {
        return this.axiosApp.post('/api/comunidad', requestBody)
    }

    getAllPosts = () => {
        return this.axiosApp.get('/api/comunidad');
    }

    deletePost = (_id) => {
        return this.axiosApp.delete(`/api/comunidad/${_id}`)
    }

}

export default new CommunityService()