//npm run start

//npm run install-all
// images
import logo from "./images/checkmate-dark-02.png";
import name from "./images/checkmate-name-dark.png";
import background_logo from "./images/checkmate-tall.png";
// icons
import { IoSearchCircle } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { RiArrowRightWideFill } from "react-icons/ri";
import { RiArrowLeftWideFill } from "react-icons/ri";
import { FaPlusSquare } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
// libraries and styles
import "./App.css";
import React, { useState, useEffect } from "react";
// axios - javascript library to perform HTTP request - https://www.npmjs.com/package/axios < documentation if needed.
import axios from "axios";

function App() {
  {
    /* USER IMG AND INFO*/
  }
  const [userImage, setUserImage] = useState("https://fakeimg.pl/50x50");
  const [username, setUsername] = useState("username");

  {
    /* --------------------------------------------FUNCTIONS AND VARIABLES TO TOGGLE THE SIDEBARS----------------------------------------------- */
  }

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

  {
    /* --------------------------------------------FUNCTIONS AND VARIABLES TO ADD A LIST----------------------------------------------- */
  }
  // A list of list names.
  //This should eventually read from a database.
  const [checkList, setCheckList] = useState([]);
  const userID = 2; // Hardcoded user ID for now - after figuring out authentication/login it will change to be dynamic.

  //fetching data from db

  useEffect(() => {    
    axios
      .get("http://localhost:3000/api/getAllLists", {
        params: { userID: userID }, // You can change this when implementing authentication
      })
      .then((response) => {
        setCheckList(response.data.lists.map((list) => list.list_title));
      })
      .catch((error) => {
        console.error("Error fetching lists:", error);
      });
  }, []);

  // Adds a new list name to the list.
  // This should eventually write to a database.
  const addCheckList = (newItem) => {
    setCheckList([...checkList, newItem]);

    // Send the new list to the backend
    axios
      .post("/api/newList", {
        listName: newItem,
        userID: 2,
      })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error("Error creating new list:", error);
      });
  };

  function createNewList(event) {
    // Creates a input field to enter a list name.
    var listName = document.createElement("input");
    listName.type = "text";
    listName.placeholder = "List Name:";
    listName.classList.add("list-name-input");

    document.querySelector(".list-container").appendChild(listName);

    listName.focus();

    listName.addEventListener("blur", () => {
      // Checks if the list name given is blank.
      if (listName.value == "") {
        // If it is, removes the input field without adding a list.
        listName.remove();
        return;
      } else {
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
    if (listName == currentTitle.textContent) {
      currentTitle.textContent = "Today's Tasks";
    } else {
      document.querySelector(".list-title").textContent = listName;
    }
  }

  {
    /* --------------------------------------------FUNCTIONS AND VARIABLES TO EDIT A LIST----------------------------------------------- */
  }
  // This should eventually update the database to keep track of the changes.
  function editList(event, buttonType, index) {
    // Creates a input field to enter a new list name.
    var listName = document.createElement("input");
    listName.type = "text";
    listName.placeholder = "Enter new list name:";
    listName.classList.add("list-name-input");
    document.querySelector(".list-container").appendChild(listName);

    listName.focus();

    listName.addEventListener("blur", () => {
      // Checks if the list name given is blank.
      if (listName.value == "") {
        // If it is, removes the input field without changing the list name.
        listName.remove();
        return;
      } else {
        // If not, changes the list name and removes the input field.
        const updatedLists = [...checkList];
        updatedLists[(buttonType, index)] = listName.value;
        setCheckList(updatedLists);

        listName.remove();
      }
    });
  }

  {
    /* --------------------------------------------FUNCTIONS AND VARIABLES FOR THE DELETE LIST FORM----------------------------------------------- */
  }
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
  };

  // Deletes the list and hides the delete form.
  // This should eventually delete the list from the database.
  const yesDeleteList = () => {
    document.querySelector(".delete-form").style.display = "none";
    const updatedCheckList = checkList.filter(
      (_, index) => index !== deletionIndex
    );
    setCheckList(updatedCheckList);
  };

  {
    /* --------------------------------------------FUNCTIONS AND VARIABLES FOR THE ADD ITEM FORM----------------------------------------------- */
  }

  // Makes the add item form visible.
  const showAddItemForm = () => {
    document.querySelector(".add-form").style.display = "block";
  };

  // Hides the add item form.
  const hideAddItemForm = () => {
    document.querySelector(".add-form").style.display = "none";
  };

  {
    /* --------------------------------------------FUNCTIONS AND VARIABLES FOR THE SIGN IN FORM----------------------------------------------- */
  }

  const showSignInForm = () => {
    document.querySelector(".new-user-form").style.display = "none";
    document.querySelector(".signin-form").style.display = "block";
  };

  const hideSignInForm = () => {
    document.querySelector(".signin-form").style.display = "none";
  };

  const submitSignInForm = () => {
    const formUsername = document.querySelector("#username").value;
    const formPass = document.querySelector("#password").value;

    {
      /* Telemetry for testing the gathering of variables */
    }
    console.log("Username:", formUsername);
    console.log("Password:", formPass);

    setUsername(formUsername || "username"); // Update username, default to 'username'
    //setUserImage('new image URL here');
  };

  {
    /* --------------------------------------------FUNCTIONS AND VARIABLES FOR THE NEW USER FORM----------------------------------------------- */
  }

  const showNewUserForm = () => {
    document.querySelector(".signin-form").style.display = "none";
    document.querySelector(".new-user-form").style.display = "block";
  };

  const hideNewUserForm = () => {
    document.querySelector(".new-user-form").style.display = "none";
  };

  const submitNewUserForm = () => {
    const formNewUsername = document.querySelector("#new-username").value;
    const formNewPass = document.querySelector("#new-password").value;

    {
      /* Telemetry for testing the gathering of variables */
    }
    console.log("Username:", formNewUsername);
    console.log("Password:", formNewPass);

    setUsername(formNewUsername || "username"); // Update username, default to 'username'
    //setUserImage('new image URL here');
  };

  {
    /* --------------------------------------------ALL OF THE APP CONTENT------------------------------------------------- */
  }
  return (
    <div className="App">
      {/* --------------------------------------------THE DELETE FORM------------------------------------------------- */}
      <div className="delete-form">
        <p>
          Are you sure you want to <strong>delete</strong> this list?
        </p>
        <button onClick={yesDeleteList} id="delete-yes" className="form-button">
          Yes
        </button>
        <button onClick={noDeleteList} id="delete-no" className="form-button">
          No
        </button>
      </div>

      {/* --------------------------------------------Add Item Form------------------------------------------------- */}

      <form className="add-form">
        <h3>Add new list item</h3>

        <input
          type="text"
          className="list-item"
          id="list-name"
          placeholder="Name..."
          required
        />
        <input
          type="text"
          className="list-item"
          id="list-description"
          placeholder="Description..."
          required
        />
        <input
          type="text"
          className="list-item"
          id="Do-Date"
          placeholder="Due Date..."
          required
        />

        {/* <button type="submit" className="add-button" onClick={}>Add</button> */}
        <button
          type="submit"
          className="cancel-button"
          onClick={hideAddItemForm}
        >
          Cancel
        </button>
      </form>

      {/*-----------------------------------------------------SIGN IN FORM----------------------------------------------*/}
      <form className="signin-form" onSubmit={submitSignInForm}>
        <h3>Sign In</h3>

        <input
          type="text"
          className="authentication-item"
          id="username"
          placeholder="Username"
          required
        />
        <input
          type="text"
          className="authentication-item"
          id="password"
          placeholder="Password"
          required
        />

        <button type="submit" className="submit-button">
          Submit
        </button>
        {/* <button type="submit" className="add-button" onClick={}>Add</button> */}
        <button
          type="button"
          className="cancel-button"
          onClick={hideSignInForm}
        >
          Cancel
        </button>
        <button
          type="button"
          className="new-user-button"
          onClick={showNewUserForm}
        >
          New User
        </button>
      </form>

      {/*-----------------------------------------------------NEW USER FORM----------------------------------------------*/}
      <form className="new-user-form" onSubmit={submitNewUserForm}>
        <h3>Register as a New User</h3>

        <input
          type="text"
          className="authentication-item"
          id="new-username"
          placeholder="Username"
          required
        />
        <input
          type="text"
          className="authentication-item"
          id="new-password"
          placeholder="Password"
          required
        />

        <button type="submit" className="submit-new-button">
          Submit
        </button>
        {/* <button type="submit" className="add-button" onClick={}>Add</button> */}
        <button
          type="button"
          className="cancel-button"
          onClick={hideNewUserForm}
        >
          Cancel
        </button>
        <button
          type="button"
          className="signin-button"
          onClick={showSignInForm}
        >
          Existing User
        </button>
      </form>

      {/* --------------------------------------------ALL OF THE HEADER---------------------------------------------- */}
      <p className="placeholder"></p>
      <header
        className={`app-header ${isRightSidebarOpen ? "" : "right"} ${
          isLeftSidebarOpen ? "" : "left"
        }`}
      >
        {/* left sidebar header */}
        <div
          className={`l-sidebar-header ${isLeftSidebarOpen ? "" : "collapsed"}`}
        >
          <button
            onClick={toggleLeftSidebar}
            className={`toggle-button-l ${
              isLeftSidebarOpen ? "" : "collapsed"
            }`}
          >
            {isLeftSidebarOpen ? (
              <RiArrowLeftWideFill />
            ) : (
              <RiArrowRightWideFill />
            )}
          </button>
          <img
            src={logo}
            className={`app-logo ${isLeftSidebarOpen ? "" : "collapsed"}`}
            alt="logo"
          />
        </div>

        {/* center header */}
        <div className={`main-header`}>
          <img src={name} className="app-name" alt="Check Mate" />
          <input type="text" className="search-box" placeholder="Search..." />
          <IoSearchCircle />
        </div>

        {/* right sidebar header */}
        <div
          className={`r-sidebar-header ${
            isRightSidebarOpen ? "" : "collapsed"
          }`}
        >
          {/* Replace "username" at end of line with current signin username, keep username as default placeholder?? */}
          <h5 className={`username ${isRightSidebarOpen ? "" : "collapsed"}`}>
            {username}
          </h5>
          {/* <div className="user-img-centering"><img src="https://fakeimg.pl/50x50" className="user-img" alt="user img" /></div> */}
          <button
            onClick={showSignInForm}
            style={{ border: "none", padding: 0, background: "none" }}
          >
            {/* Replace image with user img on login?? Keep fake as default, have this call a variable grabbing userimg */}
            <img
              src={userImage}
              className="user-img"
              alt="user img"
              style={{ cursor: "pointer" }}
            />
          </button>
          <button
            onClick={toggleRightSidebar}
            className={`toggle-button-r ${
              isRightSidebarOpen ? "" : "collapsed"
            }`}
          >
            {isRightSidebarOpen ? (
              <RiArrowRightWideFill />
            ) : (
              <RiArrowLeftWideFill />
            )}
          </button>
        </div>
      </header>

      <main>
        {/* -------------------------------------------ALL OF THE SIDEBARS------------------------------------------- */}
        {/* Left Sidebar */}
        <div className={`left-sidebar ${isLeftSidebarOpen ? "" : "collapsed"}`}>
          <h3>Check Lists</h3>
          <div className="list-container">
        {checkList.map((item, index) => (
          <div className='list-buttons' key={index}>
            <button onClick={changeList} className="list-button">{item}</button>
            <button onClick={(event) => editList(event, "edit", index)} className="edit-button"><FaEdit /></button>
            <button onClick={(event) => comfirmDeleteList(event, index)} className="delete-button"><FaTrash /></button>
          </div>
            ))}
          </div>

          {/* left sidebar footer */}
          <footer
            className={`l-sidebar-footer ${
              isLeftSidebarOpen ? "" : "collapsed"
            }`}
          >
            <button onClick={createNewList} className="new-list">
              {
                <p>
                  New List <FaPlusSquare />
                </p>
              }
            </button>
          </footer>
        </div>

        {/* Right Sidebar */}
        <div
          className={`right-sidebar ${isRightSidebarOpen ? "" : "collapsed"}`}
        >
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
          <footer
            className={`r-sidebar-footer ${
              isRightSidebarOpen ? "" : "collapsed"
            }`}
          >
            <p>placeholder</p>
          </footer>
        </div>

        {/* -------------------------------------------ALL OF THE MAIN CONTENT------------------------------------------- */}
        <div
          className={`content ${isRightSidebarOpen ? "" : "right"} ${
            isLeftSidebarOpen ? "" : "left"
          }`}
        >
          <h3 className="list-title">Today's Tasks</h3>
          <button onClick={showAddItemForm}> {<FaPlusSquare />} </button>
          <ol className="currect-list" id="currectList">
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
            <li>Item 5</li>
            <li>Item 6</li>
            <li>Item 1</li>
            <li>Item 2</li>
          </ol>

          {/* main content footer */}
          <footer
            className={`main-footer ${isRightSidebarOpen ? "" : "right"} ${
              isLeftSidebarOpen ? "" : "left"
            }`}
          >
            <p>&copy; 2023 Check Mate. All rights reserved.</p>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
