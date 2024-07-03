const {changeEmail, newUser, changePassword, findUserByEmail} = require('../model/userModels');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
  
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

// login
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Include userId in the token payload
    console.log('User ID being included in token:', user.user_id); // Log the user ID
    const token = jwt.sign({ userId: user.user_id, email: user.email }, 'secretToken', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token: token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
    changePasswordUser,
    createNewUser,
    changeEmailUser,
    loginUser
  };
  