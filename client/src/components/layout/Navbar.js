import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext'
import ContactContext from '../../context/contact/contactContext'

const Navbar = ( { title, icon, } ) => {

    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);

    const { isAuthenticated, logout, user } = authContext;
    const { clearContacts } = contactContext

    const onLogout = () => {
        logout();   // change the navbar options, and change state isAuthenticated etc
        clearContacts();
    }

    // if user login successfully
    const authLinks = (
        <Fragment>
            {/* if there is a user, print user.name */}
            <li> Hello { user && user.name }</li>
            <li>  
                <a onClick={onLogout} href="#!" > 
                    <i className="fas fa-sign-out-alt" ></i> <span className="hide-sm" > Logout </span>
                </a> 
            </li>
        </Fragment>
    );

    // if not user ( guest )
    const guestLinks = (
        <Fragment>
            {/* if there is a user, print user.name */}
            <li> <Link to='/'> Home </Link> </li>    
                <li> <Link to='/about'> About </Link> </li>    
                <li> <Link to='/register'> Register </Link> </li>    
            <li> <Link to='/login'> Login </Link> </li>   
        </Fragment>
    );

    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon} > {title} </i>    
            </h1>

            <ul>
                { isAuthenticated ?  authLinks : guestLinks }
            </ul>            
        </div>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
}

Navbar.defaultProps = {
    title: 'Contact Keeper',
    icon: 'fas fa-id-card-alt'
}

export default Navbar
