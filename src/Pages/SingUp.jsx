import React, { useState } from 'react';
import { LoginPost } from '../Service/UserService';
import '../style/login.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Service/AxiosSerives';

export const SingUp = () => {
    const [logindata, setLogindata] = useState({
        username: "",
        password: "",
    });

    const [numberDiv, setNumberDiv] = useState(false); // To toggle number verification div
    const [otpSent, setOtpSent] = useState(false); // To manage OTP sending status
    const [otp, setOtp] = useState(""); // State to hold the OTP input
    const [userData, setUserData] = useState(null); // State to hold the user data after successful login
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLogindata(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        sentRequest();
    };

    const sentRequest = async () => {
        const data = {
            userId: logindata.username,
            password: logindata.password
        };
        console.log(data);

        await LoginPost(data).then((response) => {
            if (response.data.success === true) {
                const user = response.data.data;
                console.log(user);

                // Store the user data in state
                setUserData(user);

                // Show the number verification div after successful login
                setNumberDiv(true);
            } else {
                alert("Login failed, please try again");
            }
        }).catch(error => {
            console.error('Error during login:', error);
            alert("An error occurred during login");
        });
    };

    console.log(userData);

    // Function to handle sending OTP
    const handleSendOtp = async () => {
        const data = { phoneNumber: "8839768937" };
        try {
            const response = await axiosInstance.post('send-otp', data);
            if (response.data.success) {
                setOtpSent(true); // Set OTP sent state to true
                alert("OTP sent successfully!");
            } else {
                alert("Failed to send OTP, please try again.");
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            alert("An error occurred while sending OTP");
        }
    };

    // Function to handle OTP verification
    const handleOtpVerification = async () => {
        const data = { otp: otp };
        try {
            const response = await axiosInstance.post('verify-otp', data);
            if (response.data.success) {
                // Store user data and token in localStorage
                const userdataJson = JSON.stringify(userData);
                localStorage.setItem('userData', userdataJson);
                localStorage.setItem('token', userData.token); // Save token from response
                
                // Redirect to home page
                navigate('/');
            } else {
                alert("OTP verification failed, please try again.");
            }
        } catch (error) {
            console.error('Error during OTP verification:', error);
            alert("An error occurred during OTP verification");
        }
    };

    return (
        <div className='main-login-div'>
            <h3>Husk Power Systems</h3>

            <h5>Sign Up</h5>

            {/* Conditionally render the login form if numberDiv is false */}
            {!numberDiv && (
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
                    <br />

                    <div>
                        <button onClick={handleLogin}>Login</button>
                    </div>
                </div>
            )}

            {/* Conditionally render the number verification div if numberDiv is true */}
            {numberDiv && (
                <div className='numberVeri'>
                    <h3>Verify Your Number</h3>
                    <label>Your Number: </label>
                    <input
                        type='text'
                        value={userData.PrimaryMobile}
                        
                    />
                    {!otpSent ? (
                        <button onClick={handleSendOtp}>Send OTP</button>
                    ) : (
                        <>
                            <label>Enter OTP:</label>
                            <input
                                type='text'
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder='Enter OTP'
                            />
                            <button onClick={handleOtpVerification}>Verify OTP</button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};
