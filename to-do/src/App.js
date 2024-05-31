//npm run start

// images
import logo from './images/checkmate-dark-02.png';
import name from './images/checkmate-name-dark.png';
import background_logo from './images/checkmate-tall.png';
// icons
import { IoSearchCircle } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { RiArrowRightWideFill } from "react-icons/ri";
import { RiArrowLeftWideFill } from "react-icons/ri";
import { FaPlusSquare } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
// libraries and styles
import './App.css';
import React, { useState } from 'react';


function App() {


  {/* --------------------------------------------FUNCTIONS AND VARIABLES TO TOGGLE THE SIDEBARS----------------------------------------------- */}
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);

  const toggleLeftSidebar = () => {
    setIsLeftSidebarOpen(!isLeftSidebarOpen);
  };

  const toggleRightSidebar = () => {
    setIsRightSidebarOpen(!isRightSidebarOpen);
  };

  function changeList(event) {
    var listName = event.target.textContent;
    var currentTitle = document.querySelector(".list-title");
    if(listName == currentTitle.textContent) {
      currentTitle.textContent = "Today's Tasks";
    } else {
      document.querySelector(".list-title").textContent = listName;
    }
}

  function newTask() {
    var inputTaskName = document.createElement('input');
    inputTaskName.type = 'text';
    inputTaskName.placeholder = 'Task Name';
    inputTaskName.classList.add('task-name-input');
    document.querySelector(".task-container").appendChild(inputTaskName);
    inputTaskName.focus();
    inputTaskName.addEventListener('blur', function() {
      if(inputTaskName.value == "") {
        inputTaskName.remove();
        return;
      } else {
        var taskButton = document.createElement('button');
        taskButton.textContent = inputTaskName.value;
        taskButton.classList.add('task-button');
        document.querySelector(".task-container").appendChild(taskButton);
        inputTaskName.remove();
      } 
    });
  }
  function newList() {

    var inputListName = document.createElement('input');
    inputListName.type = 'text';
    inputListName.placeholder = 'List Name';
    inputListName.classList.add('list-name-input');

    

    document.querySelector(".list-container").appendChild(inputListName);

    inputListName.focus();

    inputListName.addEventListener('blur', function() {
      if(inputListName.value == "") {
        inputListName.remove();
        return;
      } else {
        
        var listButton = document.createElement('button');
        listButton.textContent = inputListName.value;
        listButton.classList.add('list-button');
        document.querySelector(".list-container").appendChild(listButton);
        listButton.addEventListener('click', changeList);
        
        var editButton = document.createElement('button');
        editButton.textContent = <p>E<FaPlusSquare /></p>;
        editButton.classList.add('edit-button');
        document.querySelector(".list-container").appendChild(editButton);
        
        var deleteButton = document.createElement('button');
        deleteButton.textContent = <p>D<FaTrash /></p>;
        deleteButton.classList.add('delete-button');
        document.querySelector(".list-container").appendChild(deleteButton);

        inputListName.remove();
      }
    });
  }

  {/* --------------------------------------------ALL OF THE APP CONTENT------------------------------------------------- */}
  return (
    <div className="App">

      {/* --------------------------------------------ALL OF THE HEADER---------------------------------------------- */}
      <p className='placeholder'></p>
      <header className={`app-header ${isRightSidebarOpen ? '' : 'right'} ${isLeftSidebarOpen ? '' : 'left'}`}>

        {/* left sidebar header */}
        <div className={`l-sidebar-header ${isLeftSidebarOpen ? '' : 'collapsed'}`}>

          <button onClick={toggleLeftSidebar} className={`toggle-button-l ${isLeftSidebarOpen ? '' : 'collapsed'}`}>
            {isLeftSidebarOpen ? <RiArrowLeftWideFill /> : <RiArrowRightWideFill />}
          </button>
          <img src={logo} className={`app-logo ${isLeftSidebarOpen ? '' : 'collapsed'}`} alt="logo" />

        </div>

        {/* center header */}
        <div className={`main-header`}>

          <img src={name} className="app-name" alt="Check Mate" />
          <input type="text" className="search-box" placeholder="Search..." />
          <IoSearchCircle />

        </div>

        {/* right sidebar header */}
        <div className={`r-sidebar-header ${isRightSidebarOpen ? '' : 'collapsed'}`}>

          <h5 className={`username ${isRightSidebarOpen ? '' : 'collapsed'}`}>username</h5>
          <div className="user-img-centering"><img src="https://fakeimg.pl/50x50" className="user-img" alt="user img" /></div>
          <button onClick={toggleRightSidebar} className={`toggle-button-r ${isRightSidebarOpen ? '' : 'collapsed'}`}>
            {isRightSidebarOpen ? <RiArrowRightWideFill /> : <RiArrowLeftWideFill />}
          </button>

        </div>
      </header>

      <main>
        {/* -------------------------------------------ALL OF THE SIDEBARS------------------------------------------- */}
        {/* Left Sidebar */}
        <div className={`left-sidebar ${isLeftSidebarOpen ? '' : 'collapsed'}`}>

          <h3>Check Lists</h3>
          <div className="list-container">
          </div>

          {/* left sidebar footer */}
          <footer className={`l-sidebar-footer ${isLeftSidebarOpen ? '' : 'collapsed'}`}>
            <button onClick={newList} className="new-list">
              {<p>New List <FaPlusSquare /></p>}
            </button>
            {/* <FaEdit />
            <FaTrash />
            <FaStar /> */}
          </footer>

        </div>

        {/* Right Sidebar */}
        <div className={`right-sidebar ${isRightSidebarOpen ? '' : 'collapsed'}`}>

          <h3 className="priorities-title">Top Priorities</h3>
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

          {/* right sidebar footer */}
          <footer className={`r-sidebar-footer ${isRightSidebarOpen ? '' : 'collapsed'}`}>
            <p>placeholder</p>
          </footer>
        </div>

        {/* -------------------------------------------ALL OF THE MAIN CONTENT------------------------------------------- */}
        <div className={`content ${isRightSidebarOpen ? '' : 'right'} ${isLeftSidebarOpen ? '' : 'left'}`}>

          <h3 className="list-title">Today's Tasks</h3>
          <ol className="currect-list">
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

          {/* main content footer */}
          <footer className={`main-footer ${isRightSidebarOpen ? '' : 'right'} ${isLeftSidebarOpen ? '' : 'left'}`}>
            <p>&copy; 2023 Check Mate. All rights reserved.</p>
          </footer>

        </div>
      </main>
    </div>
  );
}

export default App;
