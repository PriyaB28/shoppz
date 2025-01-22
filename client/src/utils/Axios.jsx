import axios from "axios"
import { BASE_URL } from "../api/backendApiEndpoints"

const Axios = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

export default Axios