import axios from "axios"
//prepare header
const config_details = {
    headers : {
        'Authorization' : "Bearer " + localStorage.getItem('token')
    }
}

const getAllApi = "http://localhost:8080/api/employee/with-asset"
const postApi = 'http://localhost:8080/api/auth/employee/add';
export const getAll = () => {
    return async(dispatch)=>{ 
        const response = await axios.get(getAllApi, config_details)
        let action = {
            type : 'GET_ALL',
            payload : response.data
        }
        dispatch(action)
    }
}


export const add = (employee) => {
    return async (dispatch) => {
        const response = await axios.post(postApi, employee, config_details);

        dispatch({
            type: "ADD",
            payload: response.data
        });

        return response.data
    };
};