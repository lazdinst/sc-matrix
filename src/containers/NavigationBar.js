import React from 'react';

const NavigationBar = () => {
    return (
        <nav className="sc2-navbar">
            <div className="nav-title">
                <img src="/path_to_icon.png" alt="SC2 Icon" className="nav-icon" />
                <span className="title-text">StarCraft II</span>
            </div>
        </nav>
    );
}

export default NavigationBar;
