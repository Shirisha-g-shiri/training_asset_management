//define initial state
const initialState = {
    asset : []
}

export const assetReducer = (state = initialState, action) =>{
    if(action.type === 'GET'){
        return {
            ...state,
            asset : action.payload 
        }
    }
    
    return state;
}

