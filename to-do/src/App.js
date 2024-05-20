import logo from './logo.svg';
import './App.css';
import { IoSearchCircle } from "react-icons/io5";
import React from 'react';

class Question extends React.Component {
  render() {
    return <h3> <IoSearchCircle /> </h3>
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="https://fakeimg.pl/50x50" className="app-logo" alt="logo" />
        <Question>hello</Question>
        <i class="fa fa-check"></i>
        <i class="fa fa-check"></i>

        <h1>Check Mate</h1>
        <text>search bar<i class="fa fa-check"></i></text>

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
