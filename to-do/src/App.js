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
  const [userImage, setUserImage] = useState(
    "https://avatar.iran.liara.run/public"
  ); // got random avatars from https://avatar-placeholder.iran.liara.run/#document
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
  //set the selected list ID, title, and fetch its to-do items form db
  const changeList = (event, listId, listTitle) => {
    setSelectedListId(listId);
    setSelectedListTitle(listTitle);
    fetchTodosForList(listId);
  };

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

  // Function to confirm list deletion
  const confirmDeleteList = (index) => {
    setDeletionIndex(index);
    document.querySelector(".delete-form").style.display = "block";
  };

  // Hides the delete form without deleting the list.
  // const noDeleteList = () => {
  //   document.querySelector(".delete-form").style.display = "none";
  // };

  // Deletes the list and hides the delete form.
  // This should eventually delete the list from the database.
  const deleteList  = () => {
    // document.querySelector(".delete-form").style.display = "none";

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
        setDeletionIndex(-1);
        document.querySelector(".delete-form").style.display = "none";
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

  const [selectedListId, setSelectedListId] = useState(null);
  const [selectedListTitle, setSelectedListTitle] = useState("Today's Tasks");
  const [listItems, setListItems] = useState([]);

  // const [ListItems, setListItems] = useState([["item 1", "description 1", "due date 1"], ["item 2", "description 2", "due date 2"], ["item 3","description 3", "due date 3"]]);

  const [ListItem, setListItem] = useState({
    name: "",
    description: "",
    due_date: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemIndex, setItemIndex] = useState(null);
  //editing values
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const handleNameChange = (e) => setEditName(e.target.value);
  const handleDescriptionChange = (e) => setEditDescription(e.target.value);
  const handleDueDateChange = (e) => setEditDueDate(e.target.value);

  // Makes the add item form visible.
  const showAddItemForm = () => {
    // document.querySelector(".add-form").style.display = "block";
    setShowAddForm(true); // Use state to control form visibility
  };

  // Hides the add item form.
  const hideAddItemForm = () => {
    // document.querySelector(".add-form").style.display = "none";
    setShowAddForm(false); // Use state to control form visibility
  };

  //get items from db
  const fetchTodosForList = (listId) => {
    axios
      .get("http://localhost:3000/api/getAllTodosByListID", {
        params: { listID: listId },
      })
      .then((response) => {
        console.log("Fetched todos:", response.data.lists); // Debugging log
        setListItems(response.data.lists);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  };

  const saveItemInfo = (e) => {
    const { name, value } = e.target;
    setListItem({ ...ListItem, [name]: value });
  };

  const addTodoItem = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://localhost:3000/api/newTodo", {
          nameTodo: ListItem.name,
          description: ListItem.description,
          date: ListItem.due_date,
          list_id: selectedListId,
        })
        .then((response) => {
          console.log(response.data.message);
          // Update the state with the new item
          setListItems([
            ...listItems,
            {
              to_dos_id: response.data.todoID,
              name: ListItem.name,
              description: ListItem.description,
              deadline_date: ListItem.due_date,
            },
          ]);
          setListItem({ name: "", description: "", due_date: "" });
          hideAddItemForm();
        })
        .catch((error) => {
          console.error("Error creating new todo item:", error);
        });
    }
  };

  // Edit To-do

  const showEditItemForm = (index) => {
    const item = listItems[index];
    setListItem({
      name: item.name,
      description: item.description,
      due_date: item.deadline_date,
    });
    setIsEditing(true);
    setCurrentIndex(index);
    setShowAddForm(true); // Reuse the form for editing
  };

  const editTodoItem = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      axios
        .put("http://localhost:3000/api/editToDos", {
          todoID: listItems[currentIndex].to_dos_id,
          nameTodo: ListItem.name,
          description: ListItem.description,
          date: ListItem.due_date,
        })
        .then((response) => {
          console.log(response.data.message);
          // Update the state with the edited item
          const updatedItems = [...listItems];
          updatedItems[currentIndex] = {
            ...updatedItems[currentIndex],
            name: ListItem.name,
            description: ListItem.description,
            deadline_date: ListItem.due_date,
          };
          setListItems(updatedItems);
          setListItem({ name: "", description: "", due_date: "" });
          setIsEditing(false);
          setCurrentIndex(null);
          hideAddItemForm();
        })
        .catch((error) => {
          console.error("Error editing todo item:", error);
        });
    }
  };

  const DeleteListItem = (index) => {
    setShowDeleteForm(true);
    setItemToDelete(index);
  };
  const handleDelete = () => {
    setListItems((prevItems) =>
      prevItems.filter((item, index) => index !== itemToDelete)
    );
    setShowDeleteForm(false);
    setItemToDelete(null);
  };

  // Delete To-dos
  const confirmDeleteTodo = (index) => {
    setItemToDelete(index);
    setShowDeleteForm(true);
    // document.querySelector(".delete-todo-form").style.display = "block";
  };

  const deleteTodoItem = () => {
    const todoID = listItems[itemToDelete].to_dos_id; // Get the correct todo ID
    axios
      .delete("http://localhost:3000/api/deleteTodo", {
        data: { todoID: todoID },
      })
      .then((response) => {
        console.log(response.data.message);
        const updatedListItems = listItems.filter(
          (_, index) => index !== itemToDelete
        );
        setListItems(updatedListItems);
        setItemToDelete(null);
        setShowDeleteForm(false);
        // document.querySelector(".delete-todo-form").style.display = "none";
        // document.querySelector(".delete-todo-form").style.display = "none";
      })
      .catch((error) => {
        console.error("Error deleting todo item:", error);
      });
  };

  // const yesDeleteList = () => {
  //   setListItems((prevListItems) => {
  //     if (Array.isArray(prevListItems)) {
  //       return prevListItems.filter((_, i) => i !== itemToDelete);
  //     }
  //     return prevListItems;
  //   });
  // const noDeleteList = () => {
  //   setShowDeleteForm(false);
  //   setItemToDelete(null);
  // }
  // setListItem(ListItems + [ListItem.name, ListItem.description, ListItem.due_date])

  {
    /* --------------------------------------------FUNCTIONS AND VARIABLES FOR THE SIGN IN FORM----------------------------------------------- */
  }

  const showSignInForm = () => {
    const token = localStorage.getItem("token");
    if (token) {
      showLogoutForm(); // Show logout confirmation if user is logged in
    } else {
      // make sure the info from last user is gone
      document.querySelector("#username").value = "";
      document.querySelector("#password").value = "";
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
    localStorage.removeItem("token");
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
      {/* --------------------------------------------THE DELETE LIST and DELETE TO-DO FORM------------------------------------------------- */}
      {/* Delete List Form */}
      <div className="delete-form" style={{ display: "none" }}>
        <p>
          Are you sure you want to <strong>delete</strong> this list?
        </p>
        <button onClick={deleteList} className="delete-button">
          Yes
        </button>
        <button
          onClick={() =>
            (document.querySelector(".delete-form").style.display = "none")
          }
          className="delete-button"
        >
          No
        </button>
      </div>

      {/* Delete Todo Form */}
      <div className="delete-todo-form" style={{ display: showDeleteForm ? "block" : "none"  }}>
        <p>
          Are you sure you want to <strong>delete</strong> this to-do item?
        </p>
        <button onClick={deleteTodoItem} className="delete-button">
          Yes
        </button>
        <button
          onClick={() => setShowDeleteForm(false)} 
          className="delete-button"
        >
          No
        </button>
      </div>


      {/* --------------------------------------------Add To-do and Edit To-do Form------------------------------------------------- */}

      {/* Add Item Form */}
      {showAddForm && (
        <form
          className="add-form"
          onSubmit={isEditing ? editTodoItem : addTodoItem}
        >
          <h3>{isEditing ? "Edit Task" : "Add New To-Do"}</h3>
          <input
            type="text"
            name="name"
            value={ListItem.name}
            onChange={saveItemInfo}
            required
            placeholder="Name"
          />
          <input
            type="text"
            name="description"
            value={ListItem.description}
            onChange={saveItemInfo}
            required
            placeholder="Description"
          />
          <input
            type="date"
            name="due_date"
            value={ListItem.due_date}
            onChange={saveItemInfo}
            required
            placeholder="Due Date"
          />

          <button type="submit" className="add-button">
            {isEditing ? "Save" : "Add"}
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={hideAddItemForm}
          >
            Cancel
          </button>
        </form>
      )}

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
      </form>

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
                <button
                  onClick={(e) => changeList(e, item.list_id, item.list_title)}
                  className="list-button"
                >
                  {item.list_title}
                </button>
                <button
                  onClick={(event) => editList(event, "edit", index)}
                  className="edit-button"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={(event) => confirmDeleteList(index)}
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

        {/* -------------------------------------------ALL OF THE MAIN/CENTER CONTENT - AKA TO-DO ITEMS ------------------------------------------- */}
        <div
          className={`content ${isRightSidebarOpen ? "" : "right"} ${
            isLeftSidebarOpen ? "" : "left"
          }`}
        >
          <h3 className="list-title">{selectedListTitle}</h3>
          <button className="add-new-todo" onClick={showAddItemForm}>
            {" "}
            Add New To-do {<FaPlusSquare />}{" "}
          </button>
          <ol className="currect-list" id="currectList">
            {listItems.map((item, index) => (
              <div key={index}>
                <li>{item.name}</li>
                <p>{item.description}</p>
                <p>{item.deadline_date}</p>
                <button
                  onClick={() => showEditItemForm(index)}
                  className="edit-button"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => confirmDeleteTodo(index)}
                  className="delete-button"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
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
