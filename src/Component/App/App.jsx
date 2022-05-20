import React, { useEffect, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router'
import Home from '../Home/Home'
import Navbar from '../Navbar/Navbar'
import Contacts from '../Contacts/Contact'
import Movies from '../Movies/Movies'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Gallary from '../Gallary/Gallary'
import jwtDecode from 'jwt-decode'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'


export default function App() {

  let [loginInfo, setUserLoginInfo] = useState(null);
  let history = useHistory();

  function getUserInfo() {
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);
    console.log(decodedToken)
    setUserLoginInfo(decodedToken);
  }
  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      getUserInfo();
    }
  }, [])
  function logOut() {
    localStorage.removeItem('userToken');
    setUserLoginInfo(null);
    history.push('/login')

  }

  return (
    <div>
      <Navbar loginInfo={loginInfo} logOut={logOut} />
      <div className="containe">

        <Switch>
          {/* ---------------------------Protected----------------------------- */}
          <ProtectedRoute path='/home' Component={Home} />
          <ProtectedRoute path='/contacts' Component={Contacts} />
          <ProtectedRoute path='/movies' Component={Movies} />
          <ProtectedRoute path='/gallary' Component={Gallary} />
          {/* ---------------------------Routing------------------------------- */}
          <Route path='/register' render={(props) => <Register {...props} />} />
          <Route path='/login' render={(props) => <Login {...props} getUserInfo={getUserInfo} />} />
         
        </Switch>
      </div>
    </div>
  )
}

