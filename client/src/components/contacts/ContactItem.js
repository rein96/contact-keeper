import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext'

const ContactItem = ( { contact } ) => {    //prop.contact

    const contactContext = useContext(ContactContext);      //app.js state
    const { deleteContact, setCurrent, clearCurrent } = contactContext;       //mapStateToProps deleteContact() method


    const { _id, name, email, phone, type } = contact; //prop.contact

    const onDelete = () => {
        deleteContact(_id);  // prop.contact._id    (id of mongoDB)
        clearCurrent(); // current : null  (state.current)
    }
    
    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">

                {name} {' '} 
                <span className={'badge ' + ( type === 'professional' ? 'badge-success' : 'badge-primary' ) } style={{ float: 'right'}} > {type.charAt(0).toUpperCase() + type.slice(1)} </span> 

            </h3>

            <ul className="list">
                {email && (<li> <i className="fas fa-envelope-open" /> {email}  </li>)}
                {phone && (<li> <i className="fas fa-phone" /> {phone}  </li>)}
            </ul>

            <p>
                {/* setCurrent = app state | contact = prop.contact */}
                <button className="btn btn-dark btn-sm" onClick={ () => setCurrent(contact) }> Edit  </button>
                <button className="btn btn-danger btn-sm" onClick={onDelete} > Delete  </button>
            </p>
        </div>
    )
};

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired,
}

export default ContactItem
