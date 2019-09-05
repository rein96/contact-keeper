import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_ERRORS } from '../types'

export default (state, action) => {
    switch(action.type) {
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload    // action.payload : { id, name, email, phone, type }
            }

        // REGISTER_SUCCESS and LOGIN_SUCCESS have same case
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            // setItem called 'token', we get from action.payload.token 
            localStorage.setItem('token', action.payload.token);
            return{
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            };

        // REGISTER_FAIL & AUTH_ERROR & LOGIN_FAIL had same return and localStorage
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            // remove the token from storage
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload   //payload: err.response.data.msg   
            }
        
        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
            }

        default:
            return state;
    }
}