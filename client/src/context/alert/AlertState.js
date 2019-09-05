

import React, {useReducer} from 'react';
import uuid from 'uuid'
import AlertContext from './alertContext'       //const alertContext = createContext();
import alertReducer from './alertReducer'
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = props => {
    const initialState = [];    //Array !

    const [state, dispatch] = useReducer(alertReducer, initialState);

    // Set alert
    const setAlert = (msg, type, timeout = 5000) => {
        const id = uuid.v4();   //generate random id
        dispatch({
            type: SET_ALERT,
            payload: {
                msg,
                type,
                id
            }
        });

        // send to action and reducer with id
        setTimeout( () => dispatch({ type:REMOVE_ALERT, payload: id }), timeout )
    }

    return (
        // similar to redux export default combineReducers
        // value = to be accessible to other components (including state, action)
        <AlertContext.Provider value={{ 
            alerts: state,
            setAlert
        }}>

            { props.children }

        </AlertContext.Provider>
    )

};

export default AlertState;