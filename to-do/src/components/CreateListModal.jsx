// src/components/CreateListModal.jsx
import React, { useState } from 'react';
import Modal from 'react-modal';
import './CreateListModal.css';

Modal.setAppElement('#root');

const CreateListModal = ({ isOpen, onRequestClose, onSave }) => {
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [explanation, setExplanation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, dueDate, explanation });
    setName('');
    setDueDate('');
    setExplanation('');
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Create New List</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Due Date</label>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
        </div>
        <div>
          <label>Explanation</label>
          <textarea value={explanation} onChange={(e) => setExplanation(e.target.value)} required />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={onRequestClose}>Cancel</button>
      </form>
    </Modal>
  );
};

export default CreateListModal;
