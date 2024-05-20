import logo from './logo.svg';
import './App.css';
import { IoSearchCircle } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaAnglesLeft } from "react-icons/fa6";
import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">


        <img src="https://fakeimg.pl/50x50" className="app-logo" alt="logo" />
        <h3> <RxHamburgerMenu /> </h3>
        <h3> <FaAnglesLeft /> </h3>
        <h1>Check Mate</h1>
        {/* text box */}
        <h3> <IoSearchCircle /> </h3>
        <i class="fa fa-check"></i>
        <i class="fa fa-check"></i>

        {/* <text>search bar<i class="fa fa-check"></i></text> */}

        <h2>username</h2>
        <img src="https://fakeimg.pl/50x50" className="user-img" alt="user img" />



        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
      <main>

      </main>
      <footer>

      </footer>
    </div>
  );
}

export default App;
