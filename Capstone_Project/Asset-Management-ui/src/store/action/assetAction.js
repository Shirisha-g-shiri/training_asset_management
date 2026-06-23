import axios from "axios"
//prepare header
const config_details = {
    headers : {
        'Authorization' : "Bearer " + localStorage.getItem('token')
    }
}

const getAllApi = "http://localhost:8080/api/asset/all"
export const getAsset = () => {
    return async(dispatch)=>{ 
        const response = await axios.get(getAllApi, config_details)
        let action = {
            type : 'GET',
            payload : response.data
        }
        dispatch(action)
    }
}
