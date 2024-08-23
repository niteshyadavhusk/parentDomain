import React from 'react'
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';

import { SingUp } from '../Pages/SingUp';
import { AuthRoute } from './AuthRoute';
export default function Router() {
    return (

        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<AuthRoute><Login /></AuthRoute>} />
            </Routes>
        </BrowserRouter>




    )
}