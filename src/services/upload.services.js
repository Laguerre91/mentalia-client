import axios from 'axios'

class UploadServices {

    constructor() {

        this.api = axios.create({
            baseURL: import.meta.env.VITE_SERVER_URL
        })
    }

    uploadimage(imageForm) {
        return this.api.post('api/upload/image', imageForm)
    }
}

const uploadServices = new UploadServices()

export default uploadServices