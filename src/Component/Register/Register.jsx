import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import style from '../Register/Register.module.css'
export default function Register(props) {

    let [errorList, setErrorList] = useState([]);
    let [loading, setloading] = useState(false);
    let [error, setError] = useState('');

    let [user, setUser] = useState({
        first_name: '',
        last_name: '',
        age: 0,
        email: '',
        password: ''
    });

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
            let { data } = await axios.post(`https://route-egypt-api.herokuapp.com/signup`, user);
            if (data.message === 'success') {
                //login
                props.history.push('/login');
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
            first_name: Joi.string().min(3).max(16).required(),
            last_name: Joi.string().min(3).max(16).required(),
            age: Joi.number().integer().min(15).max(60).required(),
            email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        })
        return scheme.validate(user, { abortEarly: false });
    }

    return (
        <div className={style.bg}>
            <div className='w-50 mx-auto py-4'>

                <h2 className='text-center'>Register Now </h2>

                <form onSubmit={submition} className={style.box}>
                    {error && <div className='alert alert-danger'>{error}</div>}
                    {errorList.map((error, index) => index === 4 ? <div className='alert-danger alert p-1'>Password Invalid</div> :
                        <div className='alert-danger alert p-1'>{error.message}</div>
                    )}

                    <div className='my-3'>
                        <label htmlFor="first_name">First Name</label>
                        <input onChange={getUser} type="text" className='form-control' name='first_name' />
                    </div>
                    <div className='my-3'>
                        <label htmlFor="last_name">Last Name</label>
                        <input onChange={getUser} type="text" className='form-control' name='last_name' />
                    </div>
                    <div className='my-3'>
                        <label htmlFor="age">Age</label>
                        <input onChange={getUser} type="number" className='form-control' name='age' />
                    </div>
                    <div className='my-3'>
                        <label htmlFor="email">Email</label>
                        <input onChange={getUser} type="email" className='form-control' name='email' />
                    </div>
                    <div className='my-3'>
                        <label htmlFor="password">Password</label>
                        <input onChange={getUser} type="password" className='form-control' name='password' />
                    </div>
                    <div className='mx-auto d-grid gap-2 col-6'>
                        <button className='btn btn-outline-light shadow rounded mt-3' type='submit'>

                            {loading ? <i className='fas fa-spinner fa-spin'></i> : 'Register'}

                        </button>
                    </div>

                </form>

            </div>
        </div>
    )
}
