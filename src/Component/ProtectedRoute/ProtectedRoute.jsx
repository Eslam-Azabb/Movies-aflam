import React from 'react'
import { Redirect, Route } from 'react-router'

export default function ProtectedRoute(props) {

    if (localStorage.getItem('userToken')) {
        return (<Route path={props.path}> <props.Component /> </Route>);
    }
    else {
        return (<Redirect to='/login' />);

    }
}