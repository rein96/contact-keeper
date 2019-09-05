import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'

// Synthax for creating private route in react    
const PrivateRoute = ( { component: Component, ...rest } ) => {     // props

    const authContext = useContext(AuthContext);

    const { isAuthenticated, loading } = authContext;

    return (
        <Route  {...rest} render={props => !isAuthenticated && !loading ? (
            // If not authenticated direct to login, guest do not have access to Home
            <Redirect to='/login'  />
        ) : (
            // If user isAuthenticated === true
            <Component  {...props} />
        ) } />
    )
};

export default PrivateRoute
