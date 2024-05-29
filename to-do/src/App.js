//npm start
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
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);

  const toggleLeftSidebar = () => {
    setIsLeftSidebarOpen(!isLeftSidebarOpen);
  };

  const toggleRightSidebar = () => {
    setIsRightSidebarOpen(!isRightSidebarOpen);
  };

  return (
    <div className="App">

      {/* Header */}
      <div className="App-header">

        <div className='sidebar-header'>
          <img src={logo} className="app-logo" alt="logo" />
          <RxHamburgerMenu />
          <button onClick={toggleLeftSidebar} className="toggle-button">
            {isLeftSidebarOpen ? <FaAnglesLeft /> : <FaAnglesRight />}
          </button>
        </div>

        <img src={name} className="app-name" alt="Check Mate" />
        <input type="text" className="search-box" placeholder="Search..." />
        <IoSearchCircle />
        <h5 className="username">username</h5>
        <div className="user-info">
          <img src="https://fakeimg.pl/70x70" className="user-img" alt="user img" />
        </div>

        <div className='sidebar-header'>
          <button onClick={toggleRightSidebar} className="toggle-button">
            {isRightSidebarOpen ? <FaAnglesRight /> : <FaAnglesLeft />}
          </button>
        </div>

      </div>



      
      
      {/* Main Content */}
      <main>

        {/* Left Sidebar */}
        <div className={`left-sidebar ${isLeftSidebarOpen ? '' : 'collapsed'}`}>
          {/* Sidebar Content */}
          <h2>Check Lists</h2>
          <a href="#">List 1</a>
          <a href="#">List 2</a>
          <a href="#">List 3</a>
          <a href="#">List 4</a>
          <a href="#">List 5</a>
          <a href="#">List 6</a>
        </div>

        {/* Main Content */}
        <div className="content">
          <img src="https://fakeimg.pl/70x70" className="user-img" alt="user img" />
        </div>

        {/* Right Sidebar */}
        <div className={`right-sidebar ${isRightSidebarOpen ? '' : 'collapsed'}`}>
          <img src="https://fakeimg.pl/70x70" className="user-img" alt="user img" />
          {/* Sidebar Content */}
          {/* Add content for right sidebar here */}
        </div>

      </main>

      <footer>

      </footer>
    </div>
  );
}

export default App;
