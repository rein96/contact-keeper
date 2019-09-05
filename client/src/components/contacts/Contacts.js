import React, { Fragment, useContext, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext'
import ContactItem from '../contacts/ContactItem'
import Spinner from '../layout/Spinner'

const Contacts = () => {
    const contactContext = useContext(ContactContext);  //pull all contact data (state) to component (mapStateToProps)

    const { contacts, filtered, getContacts, loading } = contactContext // contacts from ContactState.js (initial state)
    // contacts = { id, name, type, email, phone }

    useEffect(() => {
        getContacts();

        // eslint-disable-next-line
    }, []);

    // initialState = { contacts = null } || contacts.length === 0 -> when user have no contacts (or delete all of his contacts)
    if( contacts !== null && contacts.length === 0 && !loading ) {
        return <h4>Please add a contact</h4>
    }

    return (
        <Fragment>
            {/* if there is a contact and not loading, show contact and filter | if not -> show Spinner */}
            {contacts !== null && !loading ? (
                <TransitionGroup>


                {/* key={contact._id} from mongoDB  */}
                {/* if there is a filtered data -> render filtered.map  | if not => render contacts.map   */}
                {/* contact = each element -> contact.name, contact.phone. contact.id ... */}
                {filtered !== null ? filtered.map( contact => (
                <CSSTransition  key={contact._id} timeout={500} classNames="item" >
                        <ContactItem  contact={contact} />
                </CSSTransition> ))     :       contacts.map(contact => (
                    
                <CSSTransition  key={contact._id} timeout={500} classNames="item" >
                        <ContactItem  contact={contact} key={contact.id} /> 
                </CSSTransition>)) }
                

                </TransitionGroup>


            ) : <Spinner/> }

        </Fragment>
    )
}

export default Contacts
