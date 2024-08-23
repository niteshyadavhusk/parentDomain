import React, { useState } from 'react';
import { LoginPost } from '../Service/UserService';
import '../style/login.css'
import { async } from 'regenerator-runtime';

export const SingUp = () => {
    const [logindata, setLogindata] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setLogindata(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(logindata);
        sentRequest()
    };

    const sentRequest = async () => {
        const data = {
            userId: logindata.username,
            password: logindata.password
        }

        await LoginPost(data).then((response) => {
            console.log(response.data);
            if (response.data.success === true) {
                console.log(response.data.data.token)
                alert("Login Successfull");
                localStorage.setItem('token', response.data.data.token)
                window.ReactNativeWebView.postMessage('alert!')


            } else {
                alert("out side box")
            }
        })
    }

    return (
        <div className='main-login-div'>
            <h3>Husk Power Systems</h3>

            <h5>SingUp</h5>
            <div className='formDiv'>
                <div>
                    <label htmlFor="id">User Id:</label>
                    <br />
                    <input
                        type="text"
                        id="id"
                        name="username"
                        required
                        placeholder='Please enter your user id'
                        value={logindata.username}
                        onChange={handleChange}
                    /><br />
                </div>
                <div>
                    <label htmlFor="password">Password:</label><br />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={logindata.password}
                        required
                        placeholder='Please enter your husk neuron password'
                        onChange={handleChange}
                    />
                </div>
                <br></br>

                <div>
                    <button onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    );
};
