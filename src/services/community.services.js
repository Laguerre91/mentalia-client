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
        return this.axiosApp.post('/api/comunidad/posts', requestBody)
    }

    getAllPosts = () => {
        return this.axiosApp.get('/api/comunidad/posts');
    }

    deletePost = (_id) => {
        return this.axiosApp.delete(`/api/comunidad/posts/${_id}`)
    }

}

export default new CommunityService()