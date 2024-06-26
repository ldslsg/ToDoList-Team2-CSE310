const {changeEmail, newUser, changePassword} = require('../model/userModels');
  
async function changeEmailUser(req, res) {
  try {
    const {  newEmail, password } = req.body;
    await changeEmail(newEmail, password);
    res.status(201).json({ message: 'Email changed' });
    console.log('Email changed');
  } catch (error) {
    console.error('Error changing email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function changePasswordUser(req, res) {
  try {
    const { email, newPassword } = req.body;
    await changePassword(email, newPassword);
    res.status(201).json({ message: 'Password changed' });
    console.log('Password changed');
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
async function createNewUser(req, res) {
  try {
    const { email, password } = req.body;
    await newUser(email, password);
    res.status(201).json({ message: 'User Created' });
    console.log('User created');
  } catch (error) {
    console.error('Error creating new user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}  
module.exports = {
    changePasswordUser,
    createNewUser,
    changeEmailUser
  };
  