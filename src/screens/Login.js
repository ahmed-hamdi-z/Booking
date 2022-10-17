import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Loader from "../component/Loader";
import Error from "../component/Error";

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();

   async function login() {
        
            const user ={
                email,
                password
            }
            try {
                setloading(true)
                const result = (await axios.post('/api/users/login', user)).data
                setloading(false)

                localStorage.setItem('CurrentUser', JSON.stringify(result))
                window.location.href = '/home'


            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(true)

            }
    }



  return (
    <div>
        {loading && (<Loader />)}

        <div className='row justify-content-center mt-5'>
            <div className='col-md-5'>
            {error && (<Error message = 'Invalid Credentionals' />)}

                <div className='bs'>
                    <h1 className='h1'>Login</h1>

                    <input  type='text' className='form-control' placeholder='E-mail'
                    value={email} onChange ={(e) => {setEmail(e.target.value)}} />

                    <input  type='text' className='form-control' placeholder='Password'
                    value={password} onChange = {(e) => {setPassword(e.target.value)}} />

                    <button className='btn mt-3' onClick={login}> Login</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login
