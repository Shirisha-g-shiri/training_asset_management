//define initial state
const initialState = {
    user : []
}

export const authReducer = (state = initialState, action) =>{
    if(action.type === 'GET'){
        return {
            ...state,
            user : action.payload 
        }
    }
    
    return state;
}

