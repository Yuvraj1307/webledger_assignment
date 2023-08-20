import React from 'react'
import {Routes,Route} from "react-router-dom"
import ArticleList from '../components/Body'
import Login from '../components/Login'
import Signup from '../components/Signup'
import Steps from '../components/Steps'
import Myrecipie from '../components/MyRecipie'
 


export default function AllRoutes() {
    return (
    <Routes>
        <Route path='/' element={<ArticleList />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup /> } />


         <Route path='/details' element={<Steps />} />
        <Route path='/myrecipie' element={<Myrecipie />} />
        {/* <Route path='*' element={<InvalidPage />} /> */}

    </Routes>
       
       )
}