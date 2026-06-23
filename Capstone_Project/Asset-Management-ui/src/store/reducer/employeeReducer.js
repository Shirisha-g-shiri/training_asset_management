//define initial state
const initialState = {
    employees : []
}

export const employeeReducer = (state = initialState, action) =>{
    if(action.type === 'GET_ALL'){
        return {
            ...state,
            employees : action.payload 
        }
    }
    if(action.type === 'ADD'){
        return {
            ...state,
            employees : [...state.employees, action.payload]
        }
    }

    return state;
}

