
import axios from "../utils/Axios"
import backendApiEndpoints from "../api/backendApiEndpoints";

const registerApi = async (data) => {
    console.log('in api');
    
    const response = await axios({
        ...backendApiEndpoints.register,
        data: data
    })
    
    return response
}

export { registerApi }