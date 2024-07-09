//npm run start

//npm run install-all
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

{/* --------------------------------------------FUNCTIONS AND VARIABLES FOR THE ADD ITEM FORM----------------------------------------------- */}

// Makes the add item form visible. 
const showAddItemForm = () => {
  document.querySelector(".add-form").style.display = "block";
}

// Hides the add item form.
const hideAddItemForm = () => {
  document.querySelector(".add-form").style.display = "none";
}

const [ListItems, setListItems] = useState([["item 1", "description 1", "due date 1"], ["item 2", "description 2", "due date 2"], ["item 3","description 3", "due date 3"]]);

const [ListItem, setListItem] = useState({name:'', description:'', due_date:''});

const [isEditing, setIsEditing] = useState(false);
const [currentIndex, setCurrentIndex] = useState(null);
const [showAddForm, setShowAddForm] = useState(false);
const [showDeleteForm, setShowDeleteForm] = useState(false);
const [itemToDelete, setItemToDelete] = useState(null);
const [itemIndex, setItemIndex] = useState(null);
//editing values
const [editName, setEditName] = useState('');
const [editDescription, setEditDescription] = useState('');
const [editDueDate, setEditDueDate] = useState('');
const handleNameChange = (e) => setEditName(e.target.value);
const handleDescriptionChange = (e) => setEditDescription(e.target.value);
const handleDueDateChange = (e) => setEditDueDate(e.target.value);


const saveItemInfo = (e) => {
  const {name , value} = e.target;
  setListItem({...ListItem, [name]: value})
}

const AddListItem = async (e) => {
  if (isEditing) {
    const updatedItems = [...ListItems];
    updatedItems[currentIndex] = [ListItem.name, ListItem.description, ListItem.due_date];
    setListItems(updatedItems);
    setIsEditing(false);
    setCurrentIndex(null);
  } else {
    const NewItem = [ListItem.name, ListItem.description, ListItem.due_date];
    setListItems((prevListItems) => [
      ...prevListItems,
      NewItem
    ]);
  }
  setListItem({ name: '', description: '', due_date: '' });
  hideAddItemForm();
}

  const EditListItem = () => {
    const item = ListItems[itemIndex];
    setListItem({ name: item[0], description: item[1], due_date: item[2] });
    setIsEditing(true);
    setCurrentIndex(itemIndex);
    showAddItemForm();
  }

  const ShowEditForm = (index) => {
    setItemIndex(index);
    setEditName(ListItems[index][0]);
    setEditDescription(ListItems[index][1]);
    setEditDueDate(ListItems[index][2]);
    setIsEditing(true);
    // document.querySelector(".edit-form").style.display = "block";
  }

  const HideEditForm = () => {
    setItemIndex(null);
    setEditName('');
    setEditDescription('');
    setEditDueDate('');
    setIsEditing(false);
    // document.querySelector(".edit-form").style.display = "none";
  }


  const handleSave = () => {
    setListItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems[itemIndex] = [editName, editDescription, editDueDate];
      return updatedItems;
    });
    HideEditForm();
  }

  const DeleteListItem = (index) => {
    setShowDeleteForm(true);
    setItemToDelete(index);
  }
  const handleDelete = () => {
    setListItems(prevItems => prevItems.filter((item, index) => index !== itemToDelete));
    setShowDeleteForm(false);
    setItemToDelete(null);
  }
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




  {/* --------------------------------------------ALL OF THE APP CONTENT------------------------------------------------- */}
  return (
    <div className="App">
      {/* --------------------------------------------THE DELETE FORM------------------------------------------------- */}
      <div className='delete-form'>
        <p>Are you sure you want to <strong>delete</strong> this list?</p>
        <button onClick={yesDeleteList} id='delete-yes' className='form-button'>Yes</button>
        <button onClick={noDeleteList} id='delete-no' className='form-button'>No</button>
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
        <button className="cancel-button" onClick={hideAddItemForm}>Cancel</button>
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
          <footer className={`main-footer ${isRightSidebarOpen ? '' : 'right'} ${isLeftSidebarOpen ? '' : 'left'}`}>
            <p>&copy; 2023 Check Mate. All rights reserved.</p>
          </footer>

        </div>
      </main>
    </div>
  );
}

export default App;