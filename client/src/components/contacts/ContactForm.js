import React, { useState, useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext';  //state

const ContactForm = () => {

    const contactContext = useContext(ContactContext);  //app level state

    // current = state.current --> null or a contact Object { id, name, phone, ... }
    const { addContact, updateContact, clearCurrent, current } = contactContext;

    // useEffect for EDIT BUTTON (on ContactItem.js)
    useEffect( () => {
        // if there is a current contact object {} (EDIT BUTTON)
        if( current !== null){
            setContact(current);    // current = contact Object
        } else {
            setContact({    //setContact component state, back to default (clear form and state)
                name: '',
                email :'',
                phone: '',
                type: 'personal'
            })
        }
    }, [contactContext, current]);  // useEffect will happen when 'contactContext' || 'current' is CHANGED

    // component level state = useState
    const [ contact, setContact ] = useState({  //default state declare here
        name: '',
        email :'',
        phone: '',
        type: 'personal'
    });

    const { name, email, phone, type } = contact;

    const onChange = event => setContact({ ...contact, [event.target.name] : event.target.value });     //setContact to component state with all properties
    // [event.target.name] : event.target.value   -->   <input name="email"  value={email}  ... />

    const onSubmit = event => {
        event.preventDefault();

        if(current === null) {
            addContact(contact);    // contact component state
        } else {
            updateContact(contact); // contact component state
        }
        clearAll();

        // contactContext.addContact(contact); //method input contact component state
        // setContact({    //setContact component state, back to default (clear form and state)
        //     name: '',
        //     email :'',
        //     phone: '',
        //     type: 'personal'
        // })
    };

    const clearAll = () => {
        clearCurrent(); //contactContext.clearCurrent()  (state)
    }


    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary"> { current === null ? 'Add Contact' : 'Edit Contact' }  </h2>
            <input type="text" placeholder="Name..." name="name" value={name} onChange={onChange} />
            <input type="email" placeholder="Email..." name="email" value={email} onChange={onChange} />
            <input type="text" placeholder="Phone..." name="phone" value={phone} onChange={onChange} />

            <h5> Contact Type </h5>
            <input type="radio" name="type" value="personal" checked={ type === 'personal' } onChange={onChange} /> Personal{' '}
            {/* if the type is personal, checked = personal */}
            <input type="radio" name="type" value="professional" checked={ type === 'professional' } onChange={onChange} /> Professional{' '}
            {/* if the type is professional, checked = professional */}

            <div>
                <input type="submit" value={ current === null ? 'Add Contact' : 'Update Contact' } className="btn btn-primary btn-block" />
            </div>
            {/* if there is a current contact Object {} */}
            { current && <div>
                <button className="btn btn-light btn-block" onClick={clearAll} > Clear </button>
            </div> }

        </form>
    )
}

export default ContactForm
