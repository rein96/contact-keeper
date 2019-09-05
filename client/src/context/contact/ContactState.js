import React, {useReducer} from 'react';
import axios from 'axios';
import ContactContext from './contactContext'       //createContext()
import contactReducer from './contactReducer'
import { ADD_CONTACT, DELETE_CONTACT, SET_CONTACT, CLEAR_CONTACT, UPDATE_CONTACT, FILTER_CONTACTS, CLEAR_FILTER, SET_CURRENT, CLEAR_CURRENT, CONTACT_ERROR, GET_CONTACTS, CLEAR_CONTACTS } from '../types';

const ContactState = props => {
    const initialState = {
        // contacts: [
        //     // {
        //     //     id: 1,
        //     //     name: 'Jill Johnson',
        //     //     email: 'jill@gmail.com',
        //     //     phone: '111-111-1111',
        //     //     type: 'personal'
        //     // },
        //     // {
        //     //     id: 2,
        //     //     name: 'Sara Watson',
        //     //     email: 'sara@gmail.com',
        //     //     phone: '222-222-2222',
        //     //     type: 'personal'
        //     // },
        //     // {
        //     //     id: 3,
        //     //     name: 'Harry White',
        //     //     email: 'harry@gmail.com',
        //     //     phone: '333-333-3333',
        //     //     type: 'professional'
        //     // }
        // ],

        contacts: null,
        current: null,   //for edit, when we click edit, current will be the edited contact
        filtered: null,
        error: null

    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Get contacts from backend
    const getContacts = async () => {

        try {
            const res = await axios.get('/api/contacts');
            dispatch({
                type: GET_CONTACTS,
                payload:res.data
            })

        } catch (err) {
            dispatch({
                type:CONTACT_ERROR,
                payload:err.response.msg
            })
        }
    }

    // Add contact
    const addContact = async (contact) => {
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        };

        try {
            // send contact and config that we passed in
            const res = await axios.post('/api/contacts', contact, config);

            console.log('%c res.data [addContact(contact) on ContactState.js] ', 'color:orange; font-weight:bold;');
            console.log(res.data);
            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }
    }

    // Delete Contact
    const deleteContact = async (id) => {
        // id === _id on mongoDB
        try {
            await axios.delete(`/api/contacts/${id}`);

            dispatch({
                type: DELETE_CONTACT,
                payload: id
            })

        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }
    }

    // Update Contact
    const updateContact = async (contact) => {
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);

            dispatch({
                type: UPDATE_CONTACT,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }
    }

    // Clear Contacts
    const clearContacts = () => {
        dispatch({
            type: CLEAR_CONTACTS 
        })
    }

    // Set current contact
    const setCurrent = contact => {
        dispatch({
            type: SET_CURRENT,
            payload: contact
        })
    }

    // Clear current contact
    const clearCurrent = () => {
        dispatch({
            type: CLEAR_CURRENT    //payload -> payload: back to null
        })
    }

    // Filter Contacts
    const filterContacts = (text) => {
        dispatch({
            type: FILTER_CONTACTS,    //payload -> payload: back to null
            payload: text
        })
    }

    // Clear Filter
    const clearFilter = () => {
        dispatch({
            type: CLEAR_FILTER   //payload -> payload: back to null
        })
    }

    return (
        // similar to redux export default combineReducers
        // value = to be accessible to other components (including state, action)
        <ContactContext.Provider value={{ 
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter,
            getContacts,
            clearContacts
            }}>

            { props.children }

        </ContactContext.Provider>
    )

};

export default ContactState;