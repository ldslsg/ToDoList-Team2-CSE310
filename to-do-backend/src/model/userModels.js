const { openDb } = require('../db');
const bcrypt = require('bcrypt');

// change email for a user
async function changeEmail(newEmail, password) {
  const db = await openDb();
  const result = await db.run(
    'UPDATE user SET email = ? WHERE user_id = (SELECT user_id FROM user WHERE password = ?)',
    [newEmail, password]
  );
  return result;
}

// change password for a user
async function changePassword(email, newPassword) {
    const db = await openDb();
    const result = await db.run(
      'UPDATE user SET password = ? WHERE user_id = (SELECT user_id FROM user WHERE email = ?)',
      [newPassword, email]
    );
    return result;
  }

// create new user
async function newUser(email, password) {
    const db = await openDb();
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.run(
        'INSERT INTO user (email, password) VALUES (?, ?)',
        [email, hashedPassword]
    );
    return result;
}

// find user by email
async function findUserByEmail(email) {
  const db = await openDb();
  const user = await db.get(
    'SELECT * FROM user WHERE email = ?',
    [email]
  );
  return user;
}

module.exports = {
    newUser,
    changePassword,
    changeEmail,
    findUserByEmail
};