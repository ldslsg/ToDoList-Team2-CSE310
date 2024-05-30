//npm run start
// images
import logo from './images/checkmate-dark-02.png';
import name from './images/checkmate-name-dark.png';
import background_logo from './images/checkmate-tall.png';
// icons
import { IoSearchCircle } from "react-icons/io5";
import { FaAnglesLeft } from "react-icons/fa6";
import { FaAnglesRight } from "react-icons/fa6";
import { RiArrowRightWideFill } from "react-icons/ri";
import { RiArrowLeftWideFill } from "react-icons/ri";

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

      <p className='placeholder'></p>
      <header className={`app-header ${isRightSidebarOpen ? '' : 'right'} ${isLeftSidebarOpen ? '' : 'left'}`}>

        <div className={`l-sidebar-header ${isLeftSidebarOpen ? '' : 'collapsed'}`}>
          <button onClick={toggleLeftSidebar} className={`toggle-button-l ${isLeftSidebarOpen ? '' : 'collapsed'}`}>
            {isLeftSidebarOpen ? <RiArrowLeftWideFill /> : <RiArrowRightWideFill />}
          </button>
          <img src={logo} className={`app-logo ${isLeftSidebarOpen ? '' : 'collapsed'}`} alt="logo" />
        </div>

        <div className={`main-header`}>
          <img src={name} className="app-name" alt="Check Mate" />
          <input type="text" className="search-box" placeholder="Search..." />
          <IoSearchCircle />
        </div>

        <div className={`r-sidebar-header ${isRightSidebarOpen ? '' : 'collapsed'}`}>
          <h5 className={`username ${isRightSidebarOpen ? '' : 'collapsed'}`}>username</h5>
          <div className="user-img-centering"><img src="https://fakeimg.pl/50x50" className="user-img" alt="user img" /></div>
          <button onClick={toggleRightSidebar} className={`toggle-button-r ${isRightSidebarOpen ? '' : 'collapsed'}`}>
            {isRightSidebarOpen ? <RiArrowRightWideFill /> : <RiArrowLeftWideFill />}
          </button>
        </div>

      </header>

      <main>

        {/* Left Sidebar */}
        <div className={`left-sidebar ${isLeftSidebarOpen ? '' : 'collapsed'}`}>

          {/* Sidebar Content */}
          <h3>Check Lists</h3>
          
          <button className='list-button'>List 1</button>
          <button className='list-button'>List 2</button>
          <button className='list-button'>List 3</button>
          <button className='list-button'>List 4</button>
          <button className='list-button'>List 5</button>
          <button className='list-button'>List 6</button>

        </div>

        {/* Right Sidebar */}
        <div className={`right-sidebar ${isRightSidebarOpen ? '' : 'collapsed'}`}>

          <h3 className="list-title">Top Priorities</h3>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
            <li>Item 5</li>
            <li>Item 6</li>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
            <li>Item 5</li>
            <li>Item 6</li>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
            <li>Item 5</li>
            <li>Item 6</li>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
            <li>Item 5</li>
            <li>Item 6</li>
          </ul>

        </div>

        {/* Main Content */}
        <div className={`content ${isRightSidebarOpen ? '' : 'right'} ${isLeftSidebarOpen ? '' : 'left'}`}>

          <h3 className="list-title">List Title</h3>
          <ol>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
            <li>Item 5</li>
            <li>Item 6</li>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
            <li>Item 5</li>
            <li>Item 6</li>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
            <li>Item 5</li>
            <li>Item 6</li>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
            <li>Item 5</li>
            <li>Item 6</li>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
            <li>Item 5</li>
            <li>Item 6</li>
          </ol>

        </div>

      </main>

      <footer>

        <p>&copy; 2023 Check Mate. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default App;
