import axios from "axios"
//prepare header
const config_details = {
    headers : {
        'Authorization' : "Bearer " + localStorage.getItem('token')
    }
}

const getAllApi = "http://localhost:8080/api/auth/user-details"
export const getUserDetails = () => {
    return async(dispatch)=>{ 
        const response = await axios.get(getAllApi, config_details)
        let action = {
            type : 'GET',
            payload : response.data
        }
        dispatch(action)
    }
}
