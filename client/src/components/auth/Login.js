import React, { useState, useContext, useEffect } from 'react'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

const Login = ( props ) => {

    const alertContext = useContext(AlertContext);  // AlertState
    const authContext = useContext(AuthContext);  // AuthState

    // App level state
    const { setAlert } = alertContext;
    const { login, error, clearErrors, isAuthenticated } = authContext;

    useEffect( () => {
        if(isAuthenticated) {
            // Redirect to Home page
            props.history.push('/');
        }

        // error from authContext.error
        // 'Invalid Credentials :('  -> from auth.js (routes folder)
        if (error === 'Invalid Credentials :(') {
            setAlert(error, 'danger');
            clearErrors();  // authContext.error === null
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history ] )    //useEffect when error is changed

    // Component level state
    const [user, setUser] = useState({
        email:'',
        password:'',
    })

    const { email, password } = user;

    const onChange = event => {
        // setUser state based on user's input
        setUser( { ...user, [event.target.name] : event.target.value } )
    }

    const onSubmit = event => {
        event.preventDefault();

        if( email === '' || password === '' ) {
            setAlert('Please fill in all fields', 'danger');
        }
        else {
            login({ 
                //pass email password from user (state)
                email,
                password
            })
        }
    }

    return (
        <div className="form-container" >
            <h1>
                Account <span className="text-primary"> Login </span>
            </h1>

            <form onSubmit={onSubmit}>
               

                <div className="form-group">
                    <label htmlFor="email" > Email Address </label>
                    <input type="email" name="email" value={email} onChange={onChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="password" > Password </label>
                    <input type="password" name="password" value={password} onChange={onChange} required />
                </div>

                <input type="submit" value="Login" className="btn btn-primary btn-block" />
            </form>
        </div>
    )
}

export default Login
