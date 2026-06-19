import axios from "axios"


export const getAll = (page) => {
    return async(dispatch)=>{ 
        const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`)
        let action = {
            type : 'GET',
            payload : response.data
        }
        dispatch(action)
    }
}