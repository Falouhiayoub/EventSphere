import axios from "axios";
import CryptoJS from "crypto-js";

const CLOUD_NAME = "dna0pkjwu"
const API_KEY = "788255729174196"
const API_SECRET = "hc3biwk31gb__P96u1m21FqXkMo"

export const uploadImage = async (file) => {
    const timestamp = Math.round((new Date()).getTime() / 1000)
    const signature = CryptoJS.SHA1(`timesstamp= ${timestamp} ${API_SECRET}`).toString()

    const formData = new FormData()
    formData.append('file', file)
    formData.append('api_key', API_KEY)
    formData.append('timesstamp', timestamp)
    formData.append('signature', signature)

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, formData
        )
        return response.data.secure_url
    } catch (error) {
        console.log("Error Uploading to Cloudinary", error)
        throw error
    }
}