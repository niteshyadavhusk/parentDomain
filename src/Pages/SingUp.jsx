import React, { useState } from 'react';
import { LoginPost } from '../Service/UserService';

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

    const sentRequest=()=>{
       const  data={
            userId:logindata.username,
            password:logindata.password
        }
      
        LoginPost(data).then((response) => {
            console.log(response.data);
        })
    }

    return (
        <div>
            <h3>Husk Power Systems</h3>
            <br />
            <h5>SingUp</h5>
            <form>
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
                <label htmlFor="password">Password:</label><br />
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={logindata.password} 
                    required 
                    placeholder='Please enter your husk neuron password' 
                    onChange={handleChange}
                /><br />
                <button onClick={handleLogin}>Login</button>
            </form>
        </div>
    );
};
