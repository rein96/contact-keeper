

import React, {useReducer} from 'react';
import axios from 'axios';

import AuthContext from './authContext'       //const authContext = createContext();
import authReducer from './authReducer'
import setAuthToken from '../../utils/setAuthToken'

import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_ERRORS } from '../types';

const AuthState = props => {
    const initialState = {
        token : localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,  // init false is also allowed
        user: null,
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load User
    // request to our backend
    const loadUser = async () => {
        // to load token into global headers
        // if localStorage.token exists
        if(localStorage.token) {
            setAuthToken(localStorage.token);   //  axios.defaults.headers.common['x-auth-token'] = token;
        }

        // to get user object { id, name, email, type, phone }
        try {
            const res = await axios.get('/api/auth');
            console.log('%c res.data ( loadUser() in AuthState.js )', 'color:orange; font-weight:bold;');
            console.log(res.data)

            dispatch({
                type: USER_LOADED,
                payload: res.data
            })

        } catch (err) {
            dispatch({ 
                type: AUTH_ERROR
            })
        }
    }

    // Register User
    const register = async formData => {    //formData = data to register the user
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        try {
            // 'http://localhost:5000/api/users'
            // because on package.json -> proxy = "http://localhost:5000" --> we don't need the localhost url

            const res = await axios.post('/api/users', formData, config);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data   //token -> res.json({ token }) from users.js
                // action.payload.token
            });

            loadUser(); //set token and request to backend /api/auth

        } catch (err) {
            // return from backend users.js -> return res.status(400).json({ msg: 'User already exists' });
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg   
            })
        }
    }

    // Login User
    const login = async formData => {    //formData = data to register the user
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        try {
            // 'http://localhost:5000/api/users'
            // because on package.json -> proxy = "http://localhost:5000" --> we don't need the localhost url

            const res = await axios.post('/api/auth', formData, config);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data   //token -> res.json({ token }) from users.js
                // action.payload.token
            });

            loadUser(); //set token and request to backend /api/auth

        } catch (err) {
            // return from backend users.js -> return res.status(400).json({ msg: 'User already exists' });
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg   
            })
        }
    }

    // Logout
    const logout = () => dispatch( { type: LOGOUT } )

    // Clear Errors
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS })

    return (
        // similar to redux export default combineReducers
        // value = to be accessible to other components (including state, action)
        <AuthContext.Provider value={{ 
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                loadUser,
                login,
                logout,
                clearErrors

            }}>

            { props.children }

        </AuthContext.Provider>
    )

};

export default AuthState;