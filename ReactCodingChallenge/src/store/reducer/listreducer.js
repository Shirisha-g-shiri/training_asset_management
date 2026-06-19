const initialState = {
    list : []
}

export const listReducer = (state = initialState, action) =>{
    if(action.type === 'GET'){
        return {
            ...state,
            list : action.payload 
        }
    }
    return state
}