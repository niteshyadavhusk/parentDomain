import React from 'react'
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';

import { SingUp } from '../Pages/SingUp';
import { AuthRoute } from './AuthRoute';
import { ProtectedRoute } from './ProtectedRoute';
import { OperationForm } from '../Components/OperationForm';
export default function Router() {
    return (

        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<AuthRoute><SingUp /></AuthRoute>} />
                <Route path='/' element={<ProtectedRoute><OperationForm/></ProtectedRoute>}/>
            </Routes>
        </BrowserRouter>




    )
}