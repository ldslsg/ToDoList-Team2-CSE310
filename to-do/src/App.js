// images
import logo from './images/checkmate-dark-02.png';
import name from './images/checkmate-name-dark.png';
// icons
import { IoSearchCircle } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaAnglesLeft } from "react-icons/fa6";
import { FaAnglesRight } from "react-icons/fa6";

import './App.css';
import React, { useState } from 'react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="App">

      <header className="App-header">

        {/* <div className='sidebar-header'>
          <img src={logo} className="app-logo" alt="logo" />
          <RxHamburgerMenu />
          <button onClick={toggleSidebar} className="toggle-button">
            {isSidebarOpen ? <FaAnglesLeft /> : <FaAnglesRight />}
          </button>
        </div> */}

        <img src={name} className="app-name" alt="Check Mate" />
        <IoSearchCircle />
        <i className="fa fa-check"></i>
        <i className="fa fa-check"></i>
        <h5>username</h5>
        <img src="https://fakeimg.pl/70x70" className="user-img" alt="user img" />
      </header>

      <div className={`panel ${isSidebarOpen ? '' : 'collapsed'}`}>

        <div className='sidebar-header'>
          <img src={logo} className="app-logo" alt="logo" />
          <RxHamburgerMenu />
          <button onClick={toggleSidebar} className="toggle-button">
            {isSidebarOpen ? <FaAnglesLeft /> : <FaAnglesRight />}
          </button>
        </div>
        
        <h2>Check Lists</h2>
        <a href="#">List 1</a>
        <a href="#">List 2</a>
        <a href="#">List 3</a>
        <a href="#">List 4</a>
        <a href="#">List 5</a>
        <a href="#">List 6</a>
      </div>
      
      <main className="content">
        <img src="https://fakeimg.pl/70x70" className="user-img" alt="user img" />
      </main>
      <footer>

      </footer>
    </div>
  );
}

export default App;
