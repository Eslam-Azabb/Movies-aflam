import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import style from '../Register/Register.module.css'


export default function Login(props) {



    let [errorList, setErrorList] = useState([]);
    let [loading, setloading] = useState(false);
    let [error, setError] = useState('');
    let [user, setUser] = useState({ email: '', password: '' });

    function getUser(e) {
        let myUser = { ...user }
        myUser[e.target.name] = e.target.value;
        setUser(myUser)
    };

    async function submition(e) {
        e.preventDefault();
        let valide = validateForm();
        setloading(true);

        if (valide.error) {
            //error
            setErrorList(valide.error.details)
            setloading(false);
        }
        else {
            let { data } = await axios.post(`https://route-egypt-api.herokuapp.com/signin`, user);
            if (data.message === 'success') {
                //login
                localStorage.setItem('userToken', data.token)
                props.getUserInfo();
                props.history.push('/home');
                setloading(false);
            }
            else {
                setloading(false);
                setError(data.message)
            }
        }
    };

    function validateForm() {
        let scheme = Joi.object({

            email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        })
        return scheme.validate(user, { abortEarly: false });
    }

    return (

        <div className={style.bg}>
            <div className='w-50 vh-100 mx-auto py-4'>

                <h2 className='text-center'>Login Now </h2>

                <form onSubmit={submition} className={style.box} >
                    {error && <div className='alert alert-danger'>{error}</div>}
                    {errorList.map((error, index) => index === 1 ? <div className='alert-danger alert p-1'>Password Invalid</div> :
                        <div className='alert-danger alert p-1'>{error.message}</div>
                    )}


                    <div className='my-3 col-md-10 mx-auto'>
                        <label htmlFor="email">Email</label>
                        <input onChange={getUser} type="email" className='form-control' name='email' />
                    </div>
                    <div className='my-3 col-md-10 mx-auto'>
                        <label htmlFor="password">Password</label>
                        <input onChange={getUser} type="password" className='form-control' name='password' />
                    </div>
                    <div className='mx-auto d-grid gap-2 col-6'>
                        <button className='btn btn-outline-light shadow rounded mt-3' type='submit'>

                            {loading ? <i className='fas fa-spinner fa-spin'></i> : 'login'}

                        </button></div>

                </form>

            </div>
        </div>
    )
}
