import React, { useState } from "react";
import { loginUserApi } from "../../apis/Api";
import { toast } from "react-toastify";

const Loginpage = () => {   

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    // validation
    const validation = () => {
        let isValid = true;

        if (email.trim() === '' || !email.includes('@')) {
            setEmailError('Email is empty or invalid')
            isValid = false;
        }

        if (password.trim() === '') {
            setPasswordError('Password is empty')
            isValid = false;
        }

        return isValid;
    }

    // Make a function to handle the form submission
    const handleLogin = (e) => {
        e.preventDefault()

        //validation 
        if(!validation()) {
            return
        }


        // make a json object
        const data = {
            "email" : email,
            "password" : password
        }

        // make a API request 
        loginUserApi(data).then((res) => {

            if (res.data.success === false) {
                toast.error(res.data.message)
            } else {
                toast.success(res.data.message)

                // success, message, token, user data
                // Setting token and user data in local storage
                localStorage.setItem('token',res.data.token)

                // setting user data
                const convertedData = JSON.stringify(res.data.userData)

                // local storage set
                localStorage.setItem('user',convertedData)


            }
        })
        
    }


    return (
        <>
        
        <div className = ' container'>
            <h1>Login to your Account</h1>
            <form className="w-50">
                <label>Email Adrress : {email}</label>
                <input onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" placeholder="Enter Email"></input>

                {
                    emailError && <p className="text-danger">{emailError}</p>
                }

                <label className="mt-2">Password</label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="Enter Password"></input>

                {
                    passwordError && <p className="text-danger">{passwordError}</p>
                }

                <button onClick={handleLogin} className="btn btn-danger w-100 mt-3">Login</button>
            </form>
            
        </div>
        
        </>
    )
}

export default Loginpage;