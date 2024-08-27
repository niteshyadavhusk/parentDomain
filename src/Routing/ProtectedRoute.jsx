import React from 'react'
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
    const storedJsonString = localStorage.getItem('userData');
   
    const UserId= localStorage.getItem('userData')
    console.log(UserId)
    
    if (UserId != null || UserId != undefined) {
        return children
    }
    return <Navigate to="/login" />;
}