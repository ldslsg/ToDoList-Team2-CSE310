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
import jwt from "jsonwebtoken"; // token - session management / authentication

function App() {
  {
    /* USER IMG AND INFO*/
  }
  const [userImage, setUserImage] = useState("https://avatar.iran.liara.run/public"); // got random avatars from https://avatar-placeholder.iran.liara.run/#document
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

  const [userID, setUserID] = useState(null); // New state to store user ID
  const [checkList, setCheckList] = useState([]);

  //fetching data from db

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token); // token decodification
      setUsername(user.email);
      setUserID(user.userId); //decoded user info
    }

    if (userID) {
      fetchLists(userID);
    }
  }, [userID]);

  const fetchLists = (userID) => {
    axios
      .get("http://localhost:3000/api/getAllLists", {
        params: { userID: userID },
      })
      .then((response) => {
        setCheckList(response.data.lists);
      })
      .catch((error) => {
        console.error("Error fetching lists:", error);
      });
  };

  // Adds a new list name to the list.

  const addCheckList = (newItem) => {
    const token = localStorage.getItem("token");
    // send new list to the backend with the info from the token
    if (token) {
      const user = jwt.decode(token);
      axios
        .post("http://localhost:3000/api/newList", {
          listName: newItem,
          userID: user.userId,
        })
        .then((response) => {
          const newListID = response.data.listID; 
          // updating state on the frontend with the new list object created
          setCheckList((prevCheckList) => [
            ...prevCheckList,
            { list_title: newItem, list_id: newListID },
          ]);
          fetchLists(user.userId);
        })
        .catch((error) => {
          console.error("Error creating new list:", error);
        });
    }
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

  // Otavio's Version

  const editList = (event, buttonType, index) => {
    // Creates an input field to enter a new list name.
    var listName = document.createElement("input");
    listName.type = "text";
    listName.placeholder = "Enter new list name:";
    listName.classList.add("list-name-input");
    document.querySelector(".list-container").appendChild(listName);

    listName.focus();

    listName.addEventListener("blur", () => {
      // checking if the list name given is blank.
      if (listName.value === "") {
        // If it is, removes the input field without changing the list name.
        listName.remove();
        return;
      } else {
        // If not, changes the list name and removes the input field.
        const newName = listName.value;
        const listID = checkList[index].list_id; // getting id

        // Send the updated list name to the backend
        axios
          .put("http://localhost:3000/api/editList", {
            listID: listID,
            newName: newName,
          })
          .then((response) => {
            console.log(response.data.message);
            // update state to get updated list
            setCheckList((prevCheckList) =>
              prevCheckList.map((list) =>
                list.list_id === listID
                  ? { ...list, list_title: newName }
                  : list
              )
            );
          })
          .catch((error) => {
            console.error("Error updating list:", error);
          });

        listName.remove();
      }
    });
  };

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

    //Otavio's code for delete feature
    const listID = checkList[deletionIndex].list_id; //will get the right id

    //api call
    axios
      .delete("http://localhost:3000/api/deleteList", {
        data: { listID: listID },
      })
      .then((response) => {
        console.log(response.data.message);
        // new state
        const updatedCheckList = checkList.filter(
          (_, index) => index !== deletionIndex
        );
        setCheckList(updatedCheckList);
      })
      .catch((error) => {
        console.error("Error deleting list:", error);
      });

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
    const token = localStorage.getItem("token");
    if (token) {
      showLogoutForm(); // Show logout confirmation if user is logged in
    } else {
          // make sure the info from last user is gone
    document.querySelector("#username").value = '';
    document.querySelector("#password").value = '';
    document.querySelector(".signin-form").style.display = "block";
    }
  };

  const hideSignInForm = () => {
    document.querySelector(".signin-form").style.display = "none";
  };

  const submitSignInForm = (event) => {
    event.preventDefault(); 
    const formUsername = document.querySelector("#username").value;
    const formPass = document.querySelector("#password").value;

    // login request
    axios
      .post("http://localhost:3000/api/login", {
        email: formUsername,
        password: formPass,
      })
      .then((response) => {
        console.log(response.data.message);
        localStorage.setItem("token", response.data.token); // saving the token to localStorage
        const user = jwt.decode(response.data.token); // decoding the token to get user info
        setUsername(user.email); // Update username
        setUserID(user.userId); // Update userID
        fetchLists(user.userId); // fetch updated list by userID
        hideSignInForm();
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  };

  {
    /* --------------------------------------------LOGOUT----------------------------------------------- */
  }

  const logoutUser = () => {
    localStorage.removeItem('token');
    setUsername("username");
    setUserID(null);
    setCheckList([]);
    hideLogoutForm(); 
  };

  const showLogoutForm = () => {
    document.querySelector(".logout-form").style.display = "block";
  };

  const hideLogoutForm = () => {
    document.querySelector(".logout-form").style.display = "none";
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

    // backend request
    axios
      .post("http://localhost:3000/api/newUser", {
        email: formNewUsername,
        password: formNewPass,
      })
      .then((response) => {
        hideNewUserForm();
      })
      .catch((error) => {
        console.error("Error creating new user:", error);
      });
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

      {/* --------------------------------------------Edit Item Form------------------------------------------------- */}

      <div className="edit-form">
        <h3>Edit item</h3>

        <input name = "name" type="text" className="list-item" value={ListItem.name} id="edit-list-name" placeholder="Name..." onChange={saveItemInfo} required/>
        <input name = 'description' type="text" className="list-item" value={ListItem.description} id="edit-list-description" placeholder="Description..." onChange={saveItemInfo} required/>
        <input name = "due_date" type="text" className="list-item" value={ListItem.due_date} id="edit-Do-Date" placeholder="Due Date..." onChange={saveItemInfo} required/>

        <button className="edit-button" onClick = {EditListItem}>{isEditing ? 'Save': 'Add'}</button> 
        <button className="cancel-button" onClick={HideEditForm}>Cancel</button>
      </div>

      {/* --------------------------------------------Add Item Form------------------------------------------------- */}

      <div className="add-form">
        <h3>Add new list item</h3>

        <input name = "name" type="text" className="list-item" value={ListItem.name} id="list-name" placeholder="Name..." onChange={saveItemInfo} required/>
        <input name = 'description' type="text" className="list-item" value={ListItem.description} id="list-description" placeholder="Description..." onChange={saveItemInfo} required/>
        <input name = "due_date" type="text" className="list-item" value={ListItem.due_date} id="Do-Date" placeholder="Due Date..." onChange={saveItemInfo} required/>

        <button className="add-button" onClick = {AddListItem}>{isEditing ? 'Save': 'Add'}</button> 
        <button
         
          className="cancel-button"
          onClick={hideAddItemForm}
        >
          Cancel
        </button>
      </form>

      {/*-----------------------------------------------------SIGN IN FORM----------------------------------------------*/}
      <form className="signin-form" onSubmit={submitSignInForm}>
        <div className="flex-signin-form">
          <h3>Sign In</h3>

          <input
            type="text"
            className="authentication-item"
            id="username"
            placeholder="Username"
            required
          />
          <p className="forgot">forgot Username</p>
          <input
            type="password"
            className="authentication-item"
            id="password"
            placeholder="Password"
            required
          />
          <p className="forgot">forgot Password</p>
          <div className="button-container">
            <button type="submit" className="signin-button">
              Submit
            </button>
            {/* <button type="submit" className="add-button" onClick={}>Add</button> */}
            <button
              type="button"
              className="signin-button"
              onClick={hideSignInForm}
            >
              Cancel
            </button>
            <button
              type="button"
              className="signin-button"
              onClick={showNewUserForm}
            >
              New User
            </button>
          </div>
        </div>
      </div>

      {/*-----------------------------------------------------NEW USER FORM----------------------------------------------*/}
      <form className="new-user-form" onSubmit={submitNewUserForm}>
        <div className="flex-signin-form">
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
          <div className="button-container">
            <button type="submit" className="signin-button">
              Submit
            </button>
            {/* <button type="submit" className="add-button" onClick={}>Add</button> */}
            <button
              type="button"
              className="signin-button"
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
          </div>
        </div>
      </form>
 {/* --------------------------------------------LOGOUT MODAL---------------------------------------------- */}
      <div className="logout-form" style={{ display: "none" }}>
        <p>
          Are you sure you want to <strong>logout</strong>?
        </p>
        <button onClick={logoutUser} className="form-button">
          Yes
        </button>
        <button onClick={hideLogoutForm} className="form-button">
          No
        </button>
      </div>

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
              <div className="list-buttons" key={index}>
                <button onClick={changeList} className="list-button">
                  {item.list_title}
                </button>
                <button
                  onClick={(event) => editList(event, "edit", index)}
                  className="edit-button"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={(event) => comfirmDeleteList(event, index)}
                  className="delete-button"
                >
                  <FaTrash />
                </button>
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
          <ol className="currect-list" id='currectList'>
            {ListItems.map((item, index)=>(
              <div>
                <li key={`name-${index}`}>{ListItems[index][0]}</li>,
                <p key={`description-${index}`}>{ListItems[index][1]}</p>,
                <p key={`due_date-${index}`}>{ListItems[index][2]}</p> 
                <button onClick={() => ShowEditForm(index)} key={`edit-${index}`} className="edit-button"><FaEdit /></button>
                <button onClick={() => DeleteListItem(index)} key={`delete-${index}`} className="delete-button"><FaTrash /></button>
              </div>
            ))}

          </ol>
            
          {showDeleteForm && (
            <div className="delete-confirmation">
              <p>Are you sure you want to delete this item?</p>
              <button onClick={handleDelete}>Yes, delete</button>
              <button onClick={() => setShowDeleteForm(false)}>Cancel</button>
            </div>
          )}


          {isEditing && (
          <div className="edit-form">
              <h3>Edit Task</h3>
              <label>
                Name:
                <input type="text" value={editName} onChange={handleNameChange} />
              </label>
              <label>
                Description:
                <input type="text" value={editDescription} onChange={handleDescriptionChange} />
              </label>
              <label>
                Due Date:
                <input type="text" value={editDueDate} onChange={handleDueDateChange} />
              </label>
              <button onClick={handleSave}>Save</button>
              <button onClick={HideEditForm}>Cancel</button>
            </div>
          )}
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