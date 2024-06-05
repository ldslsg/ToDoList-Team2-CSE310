// src/App.jsx
import React, { useState } from 'react';
import CreateListModal from './components/CreateListModal';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lists, setLists] = useState([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveList = (newList) => {
    setLists([...lists, newList]);
  };

  return (
    <div>
      <h1>To-Do Lists</h1>
      <button onClick={handleOpenModal}>Create New List</button>
      <CreateListModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        onSave={handleSaveList}
      />
      <ul>
        {lists.map((list, index) => (
          <li key={index}>
            <h3>{list.name}</h3>
            <p>Due Date: {list.dueDate}</p>
            <p>{list.explanation}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
