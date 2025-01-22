export const BASE_URL = "http://localhost:8000/"

const backendApiEndpoints = {
    register: {
        url: 'api/user/register',
        method: "post"
    },
    login: {
        url: "api/user/login",
        method: "post"

    }
}

export default backendApiEndpoints