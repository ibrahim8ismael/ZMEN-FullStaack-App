const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  console.log('Received signup request:', req.body);
  
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    const newUser = await user.save();
    console.log('User created successfully:', newUser);
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error creating user:', err);
    if (err.code === 11000) {
      res.status(400).json({ message: 'Email already exists' });
    } else {
      res.status(500).json({ message: err.message || 'Error creating user' });
    }
  }
});

module.exports = router; 