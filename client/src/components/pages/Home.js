import React, { useContext, useEffect } from 'react';
import Contacts from '../contacts/Contacts'
import ContactForm from '../contacts/ContactForm'
import ContactFilter from '../contacts/ContactFilter'

import AuthContext from '../../context/auth/authContext';

const Home = () => {

    const authContext = useContext(AuthContext);

    useEffect( () => {
        console.log('useEffect loadUser()')
        authContext.loadUser(); // setAuthToken(localStorage.token);    //  request api/auth backend

        // eslint-disable-next-line
    }, []);

    return (
        <div className="grid-2">
            <div>
                <ContactForm />
            </div>

            <div>
                <ContactFilter />
                <Contacts />
            </div>
        </div>
    )
}

export default Home
