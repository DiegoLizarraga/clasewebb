import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/Home.jsx';
import AboutMe from "./pages/About-Me.jsx";
import Projects from "./pages/Projects.jsx";
import Contact from "./pages/Contact.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/home" element={<Home />} />
                <Route path="/AboutMe" element={<AboutMe />} />
                <Route path="/Projects" element={<Projects />} />
                <Route path="/Contact" element={<Contact />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
);