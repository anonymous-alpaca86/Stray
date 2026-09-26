import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Upload from "./pages/Upload";
import Signup from "./pages/Signup";
import PetDetails from './pages/PetDetails'
function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Login />} />
                <Route path="/profile" element={<Profile />}/>
                <Route path="/upload" element={<Upload />}/>
                <Route path="/signup" element={<Signup />}/>
                <Route path="/pets/:id" element={<PetDetails />}/>
                


            </Routes>
        </BrowserRouter>
    );
}

export default App;