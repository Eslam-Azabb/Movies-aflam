import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar(props) {
    return (
        <div>
            <nav className='d-flex justify-content-between text-center align-items-center '>
                <ul className='list-unstyled d-flex p-3 m-0'>
                    {
                        props.loginInfo ? <>
                            <li className='px-2'> <NavLink to='/home'>Home</NavLink> </li>
                            <li className='px-2'> <NavLink to='/movies'>Movies</NavLink> </li>
                            <li className='px-2'> <NavLink to='/contact'>Contact</NavLink> </li>
                            <li className='px-2'> <NavLink to='/gallary'>Gallary</NavLink> </li>
                        </> : ''

                    }

                </ul>

                <ul className='list-unstyled d-flex p-3 m-0'>
                    <li className='px-2'> <a href="www.google.com"><i className='fab fa-instagram'></i></a> </li>
                    <li className='px-2'> <a href="www.google.com"><i className='fab fa-facebook'></i></a> </li>
                    <li className='px-2'> <a href="www.google.com"><i className='fab fa-twitter'></i></a> </li>

                    {

                        props.loginInfo ?
                            <>
                                <li onClick={props.logOut} className='px-2'> Logout </li>

                                {/* ارجع حاول تعمل الفكره دي تاني  */}
                                {/* <li className='px-2'> <NavLink to='/profile'>{props.userLoginInfo.first_name}</NavLink> </li> */}</>
                            : <>
                                <li className='px-2'> <NavLink to='/register'>Register</NavLink> </li>
                                <li className='px-2'> <NavLink to='/login'>Login</NavLink> </li>
                            </>
                    }



                </ul>
            </nav>
        </div>
    )
}
