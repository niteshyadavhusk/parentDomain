import React from 'react'
import { Navigate } from 'react-router-dom';

export const AuthRoute = ({ children }) => {
    const storedJsonString = localStorage.getItem('userData');
   
    const storedData = JSON.parse(storedJsonString);

    
    if (storedData === null || storedData === undefined) {
        return children
    }
    return <Navigate to="/" />
}