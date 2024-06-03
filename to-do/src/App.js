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

  // Keeps track of whether the left and right sidebars are open or not.
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);

  // Toggles the left and right sidebars.
  const toggleLeftSidebar = () => {
    setIsLeftSidebarOpen(!isLeftSidebarOpen);
  };

  const toggleRightSidebar = () => {
    setIsRightSidebarOpen(!isRightSidebarOpen);
  };

  {/* --------------------------------------------FUNCTIONS AND VARIABLES TO ADD A LIST----------------------------------------------- */}
  // A list of list names.
  //This should eventually read from a database.
  const [checkList, setCheckList] = useState(["list 1", "list 2", "list 3"]);

  // Adds a new list name to the list.
  // This should eventually write to a database.
  const addCheckList = (newItem) => {
    setCheckList([...checkList, newItem]);
  }
  
  function createNewList(event) {
    
    // Creates a input field to enter a list name.
    var listName = document.createElement('input');
    listName.type = 'text';
    listName.placeholder = 'List Name:';
    listName.classList.add('list-name-input');
    
    document.querySelector(".list-container").appendChild(listName);
    
    listName.focus();
    
    listName.addEventListener('blur', () => {
      // Checks if the list name given is blank.
      if(listName.value == "") {
        // If it is, removes the input field without adding a list.
        listName.remove();
        return;
      }
      else {
        // If not, adds the list name to the list and removes the input field.
        var ButtonText = listName.value;
        addCheckList(ButtonText);
        listName.remove();
      }
    });
  }

  // Changes the title of the list on display to the name of the list that was clicked.
  // This should eventually change all the items to be the items in the list.
  // It will need to read from a database, and have a way of using the list name as a key to find the items.
  function changeList(event) {
    var listName = event.target.textContent;
    var currentTitle = document.querySelector(".list-title");
    if(listName == currentTitle.textContent) {
      currentTitle.textContent = "Today's Tasks";
    } else {
      document.querySelector(".list-title").textContent = listName;
    }
}

{/* --------------------------------------------FUNCTIONS AND VARIABLES TO EDIT A LIST----------------------------------------------- */}
// This should eventually update the database to keep track of the changes.
function editList(event, buttonType, index) {
  
  // Creates a input field to enter a new list name.
  var listName = document.createElement('input');
  listName.type = 'text';
  listName.placeholder = 'Enter new list name:';
  listName.classList.add('list-name-input');
  document.querySelector(".list-container").appendChild(listName);
  
  listName.focus();
  
  listName.addEventListener('blur', () => {
    
    // Checks if the list name given is blank.
    if(listName.value == "") {
      // If it is, removes the input field without changing the list name.
      listName.remove();
      return;
    }
    else {
      // If not, changes the list name and removes the input field.
      const updatedLists = [...checkList];
      updatedLists[(buttonType, index)] = listName.value;
      setCheckList(updatedLists);

      listName.remove();
    }
  });
}

{/* --------------------------------------------FUNCTIONS AND VARIABLES FOR THE DELETE LIST FORM----------------------------------------------- */}
// Keeps track of the index of the list to be deleted.
const [deletionIndex, setDeletionIndex] = useState(-1);

// Makes the delete form visible and sets the deletion index to the index of the list to be deleted.
const comfirmDeleteList = (event, targetIndex) => {
  document.querySelector(".delete-form").style.display = "block";
  setDeletionIndex(targetIndex);
};

// Hides the delete form without deleting the list.
const noDeleteList = () => {
  document.querySelector(".delete-form").style.display = "none";
}

// Deletes the list and hides the delete form.
// This should eventually delete the list from the database.
const yesDeleteList = () => {
  document.querySelector(".delete-form").style.display = "none";
  const updatedCheckList = checkList.filter((_, index) => index !== deletionIndex);
  setCheckList(updatedCheckList);
}

  {/* --------------------------------------------ALL OF THE APP CONTENT------------------------------------------------- */}
  return (
    <div className="App">

      {/* --------------------------------------------THE DELETE FORM------------------------------------------------- */}
      <div className='delete-form'>
        <p>Are you sure you want to <strong>delete</strong> this list?</p>
        <button onClick={yesDeleteList} id='delete-yes' className='form-button'>Yes</button>
        <button onClick={noDeleteList} id='delete-no' className='form-button'>No</button>
      </div>

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
            {checkList.map((item, index) => (
              <div className='list-buttons'>
                <button onClick={changeList} key={["main", index]} className="list-button">{item}</button>
                <button onClick={(event) => editList(event, "edit", index)} key={["edit", index]} className="edit-button"><FaEdit /></button>
                <button onClick={(event) => comfirmDeleteList(event, index)} key={["delete", index]} className="delete-button"><FaTrash /></button>
              </div>
            ))}
          </div>

          {/* left sidebar footer */}
          <footer className={`l-sidebar-footer ${isLeftSidebarOpen ? '' : 'collapsed'}`}>
            <button onClick={createNewList} className="new-list">
              {<p>New List <FaPlusSquare /></p>}
            </button>
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
