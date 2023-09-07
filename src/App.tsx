import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Login from './auth/Login';
import Register from './auth/Register';
import { useEffect, useState } from 'react';
import JsonData from "./data/data.json";
import About from './components/About';
import { Contact } from './components/Contact';
import AgriTechTraining from './services/AgriTechTraining';
import { Header } from './components/Header';
import Navigation from './components/Navigation';
import { Services } from './components/Services';
import { Team } from './components/Team';
import { Testimonials } from './components/Testimonials';
// import SmoothScroll from "smooth-scroll";

// export const scroll = new SmoothScroll('a[href*="#"]', {
//     speed: 1000,
//     speedAsDuration: true,
// });

interface JsonDataType {
    About?: any;
    Header?: any;
    Gallery?: any;
    Services?: any;
    Testimonials?: any;
    Team?: any;
    Contact?: any;
    Features?: any;
    // Define other properties here if needed
}

function App() {
    return (
        <>
            <Router>
                <div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/ServicePages/AgriTechTraining" element={<AgriTechTraining />} />
                    </Routes>
                </div>
            </Router>
        </>
    );
}

const Home = () => {
    const [data, setData] = useState<JsonDataType>({});
    useEffect(() => {
        setData(JsonData);
    }, []);

    return (
        <>
            <Navigation />
            <Header data={data.Header} />
            <About data={data.About} />
            <Services />
            <Team data={data.Team} />
            <Testimonials data={data.Testimonials} />
            <Contact data={data.Contact} />
        </>
    )
};


export default App;
