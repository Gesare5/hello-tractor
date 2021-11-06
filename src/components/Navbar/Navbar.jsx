import React from 'react';
import hello from './hello-tractor.png';
// import loo from './logo.svg';
import './style.css';

function Navbar() {
    return (
        <nav id="navbar">
            <img src={hello} alt="" style={{ background: "transparent" }} />
            <ul id="nav-links">
                <li><a href="/home">Home</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;