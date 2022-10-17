import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Loader from "../component/Loader";
import Error from "../component/Error";
import Success from "../component/Success"

function Register() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setcpassword] = useState('')

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const [success, setsuccess] = useState()

    async function register() {
        
        if(password == cpassword){
            const user ={
                name,
                email,
                password,
                cpassword
            }

            try {
                setloading(true)
                const result = (await axios.post('/api/users/register', user)).data
                setloading(false)
                setsuccess(true)

                setName('')
                setEmail('')
                setPassword('')
                setcpassword('')

            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(true)
            }

        }
        else{
            alert('Password Not Matched')
        }
    }

  return (
    <div>

        {loading && (<Loader />)}

        <div className='row justify-content-center mt-5'>
            <div className='col-md-5'>
            {success && (<Success message = 'Registeration Success' />)}
            {error && (<Error />)}

                <div className='bs'>
                    <h1 className='h1'>Register</h1>
                    <input  type='text' className='form-control' placeholder='Name'
                    value={name} onChange ={(e) => {setName(e.target.value)}} />

                    <input  type='text' className='form-control' placeholder='E-mail'
                    value={email} onChange ={(e) => {setEmail(e.target.value)}} />

                    <input  type='text' className='form-control' placeholder='Password'
                    value={password} onChange = {(e) => {setPassword(e.target.value)}} />

                    <input  type='text' className='form-control' placeholder='Confirm Password' 
                    value={cpassword} onChange = {(e) => {setcpassword(e.target.value)}} />

                    <button className='btn mt-3' onClick={register}> Register</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register
