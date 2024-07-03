const {deleteList, allLists, newList, editList} = require('../model/listModels');
  
async function deleteListItems(req, res) {
  try {
    const { listID } = req.body;
    await deleteList(listID);
    res.status(201).json({ message: 'List deleted' });
    console.log('List deleted');
  } catch (error) {
    console.error('Error deleting list:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  }
async function editListName(req, res) {
  try {
    const { listID, newName } = req.body;
    await editList(listID, newName);
    res.status(201).json({ message: 'Lists updated' });
    console.log('Lists updated');
  } catch (error) {
    console.error('Error updating list:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  }
async function getAllLists(req, res) {
  try {
    const { userID } = req.query;
    console.log('Received userID:', userID);
    const lists = await allLists(userID);
    console.log('Lists returned:', lists);
    res.status(201).json({ message: 'Lists Returned', lists });
    console.log('Lists returned');
    console.log(lists);
  } catch (error) {
    console.error('Error getting lists:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function createList(req, res) {
  try {
    const { listName, userID } = req.body;
    const result = await newList(listName, userID);
    const listID = result.lastID; 
    res.status(201).json({ message: 'List created', listID: listID });
    console.log('List created with ID:', listID);
  } catch (error) {
    console.error('Error creating new list:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
    createList,
    editListName,
    getAllLists,
    deleteListItems
  };
  