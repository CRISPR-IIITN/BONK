const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const saltRounds = 10;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isSuperUser: {
    type: Boolean,
    default: false
  }
});

userSchema.pre('save', function(next){
  if (!this.isModified('password')) {
    return next();
  }
  bcrypt.hash(this.password, saltRounds, (err, hashedPassword) => {
    if (err) {
      return next(err);
    }
    this.password = hashedPassword;
    next();
  });
});

const User = mongoose.model('User', userSchema);

// Router methods

router.get('/', async (_, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send( err.message );
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send( 'Cannot find user' );
    }
    res.send(user);
  } catch (err) {
    res.status(500).send( 'Cannot find user' );
  }
});

router.post('/', async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
    isSuperUser: req.body.isSuperUser
  });

  try {
    const newUser = await user.save();
    res.status(201).send( newUser );
  } catch (err) {
    res.status(400).send( err.message );
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(403).send('Incorrect username or password');
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(403).send('Incorrect username or password');
    }

    res.send(user);
  } catch (err) {
    res.status(500).send('Error logging in, try again!');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send( 'Cannot find user' );
    }    

    // Update the username if it has changed
    if (req.body.username && req.body.username !== user.username) {
      user.username = req.body.username;
    }

    // Update the admin status if it has changed
    if (req.body.isAdmin !== undefined && req.body.isAdmin !== user.isAdmin) {
      user.isAdmin = req.body.isAdmin;
    }

    // Update the superuser status if it has changed
    if (req.body.isSuperUser !== undefined && req.body.isSuperUser !== user.isSuperUser) {
      user.isSuperUser = req.body.isSuperUser;
    }

    // Update the password if a new password has been provided
    if (req.body.newPassword) {
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        return res.status(400).send( 'Invalid password' );
      }
      user.password = req.body.newPassword;
      user.markModified('password');
    }

    const updatedUser = await user.save();
    res.send(updatedUser);
  } catch (err) {
    res.status(500).send( err.message );
  }
});

router.delete('/', async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    if (user == null) {
      return res.status(404).send('Cannot find user');
    }

    // Check if the provided password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).send('Invalid password');
    }

    await user.remove();
    res.send('Deleted user');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
module.exports.User = User;