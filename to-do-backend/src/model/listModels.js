const { openDb } = require('../db');

async function deleteList(listID) {
  const db = await openDb();
  const result1 = await db.run(
    'DELETE FROM to_dos WHERE list_id = ?',
    [listID]
  )
  const result = await db.run(
    'DELETE FROM list WHERE list_id = ?',
    [listID]
  );
  return result1,result;
}
async function editList(listID, newName) {
    const db = await openDb();
    const result = await db.run(
      'UPDATE list SET list_title = ? where list_id = ?',
      [newName, listID]
    );
    return result;
  }
  
async function allLists(userID) {
  const db = await openDb();
  const result = await db.all(
    'SELECT * FROM list WHERE user_id = ?',
    [userID]
  );
  console.log('Query Result:', result);
  return result;
}

async function newList(listName, userID) {
    const db = await openDb();
    const result = await db.run(
        'INSERT INTO list (list_title, user_id) VALUES (?, ?)',
        [listName, userID]
    );
    return result;
}
module.exports = {
    newList,
    editList,
    deleteList,
    allLists
};







