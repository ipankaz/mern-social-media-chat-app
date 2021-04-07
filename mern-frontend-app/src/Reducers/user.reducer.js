import { userConstants } from "../Actions/constants"

const initState = {
    error: null,
    message: '',
    loading: false,
    done:false
}

const userReducer=  (state = initState, action) => {
    console.log(action);
    switch(action.type){
        case userConstants.USER_REGISTER_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case userConstants.USER_REGISTER_SUCCESS:
            state = {
                ...state,
                loading: false,
                done:true,
                message: action.payload.message
            }
            break;
        case userConstants.USER_REGISTER_FAILURE:
            state = {
                ...state,
                loading: false,
                done:false,
                error: action.payload.error
            }
            break;
            default :state={...state}
    }

    return state;
}
export default userReducer