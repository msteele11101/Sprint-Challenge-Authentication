  
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config/secret.js');

const Users = require('../users/users-model.js');

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 6);
  user.password = hash;

  Users.add(user)
    .then(savedUser => {
      res.status(201).json(savedUser);
    })
    .catch(error => {
      res.status(500).json(error)
    })
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = signToken(user)
        res.status(200).json( `Welcome ${user.username} you Succesfully Logged In`)
      } else {
        res.status(401).json({ message: 'Invalid Credentials' })
      }
    })
    .catch(error => {
      res.status(500).json(error);
    })
});


function signToken(user) {
  const payload = {
    user
  };

  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, jwtSecret, options);
}


module.exports = router;