import React from 'react'
import { TOKEN } from './const'
import {Route, Redirect} from 'react-router-dom'
const ProtectedRoute = (props) => {
    const token = localStorage.getItem(TOKEN)
    if(token){
        return <Route exact path={props.path} component={props.component} />
    }
    else {
        return <Redirect to="/login" />
    };
}

export default ProtectedRoute
