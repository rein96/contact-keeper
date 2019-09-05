import React, { useContext } from 'react'
import ContactContext from '../../context/contact/contactContext'


const ContactFilter = () => {

    const contactContext = useContext(ContactContext);     //app level state

    const { filterContacts, clearFilter } = contactContext;

    const onChange = event => {
        let inputFiltering = event.target.value;
        if( inputFiltering !== '' ) {    //if there is filtering contact
            filterContacts(inputFiltering)
        } else {
            clearFilter();
        }
    }

    return (
        <form>
            <input type="text" placeholder="Filter Contacts..." onChange={onChange} /> 
        </form>
    )
}



/*
//////////////// useRef method

import React, { useContext, useRef, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext'

const ContactFilter = () => {

    const contactContext = useContext(ContactContext);     //app level state
    const text = useRef('');    //default = '' (nothing)

    const { filterContacts, clearFilter, filtered } = contactContext;

    useEffect( () => {
        if( filtered === null ) {
            text.current.value = ''
        }
    } )

    const onChange = event => {
        let inputFiltering = event.target.value;
        if(text.current.value !== '' ) {    //if there is filtering contact
            filterContacts(inputFiltering)
        } else {
            clearFilter();
        }
    }

    return (
        <form>
            <input ref={text} type="text" placeholder="Filter Contacts..." onChange={onChange} /> 
        </form>
    )
}

export default ContactFilter
*/


export default ContactFilter
