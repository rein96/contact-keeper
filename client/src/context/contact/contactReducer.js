import { ADD_CONTACT, DELETE_CONTACT, SET_CONTACT, CLEAR_CONTACT, UPDATE_CONTACT, FILTER_CONTACTS, CLEAR_FILTER, SET_CURRENT, CLEAR_CURRENT, CONTACT_ERROR, GET_CONTACTS, CLEAR_CONTACTS } from '../types';

export default (state, action) => {
    switch(action.type){

        case GET_CONTACTS:
            return{
                ...state,
                contacts: action.payload,
                loading: false
            }

        case ADD_CONTACT:
            return{
                ...state,
                contacts: [action.payload, ...state.contacts],
                // action.payload placed first because we want added contact to most top contacts list
                loading: false
            }

        case DELETE_CONTACT:
            return{
                ...state,
                contacts: state.contacts.filter( contact => contact._id !== action.payload ), //action.payload = _id that we want to delete
                loading: false
            }

        case CLEAR_CONTACTS:
            return{
                ...state,
                contacts:null,
                filtered: null,
                error: null,
                current: null
            }

        case SET_CURRENT:
            return{
                ...state,
                current: action.payload     //contact Object{}
            }

        case CLEAR_CURRENT:
            return{
                ...state,
                current: null
            }

        case UPDATE_CONTACT:
            return{
                ...state,
                contacts: state.contacts.map( contact => contact._id === action.payload._id ? action.payload : contact )
                // el.id === action.payload.id ? If true -> return action.payload {contact Object} | if not -> return el
                // for Updating only for 1 contact, the rest will be the same and must be returned on state.contacts
            }

        case FILTER_CONTACTS:
            return{
                ...state,
                filtered: state.contacts.filter( contact => {
                    // gi = global, insensitive (lowercase or uppercase)
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return contact.name.match(regex) || contact.email.match(regex);
                })
            }

        case CLEAR_FILTER:
            return{
                ...state,
                filtered: null
            }

        case CONTACT_ERROR:
            return{
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}