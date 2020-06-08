const bcrypt = require('bcrypt')
const express = require('express')
const User = require('../models/users.js')
const users = express.Router()

users.get('/new', (req, res) => {
  res.render('users/new.ejs', {
  })
})

users.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
    if(err) {
      console.log(err);
      res.send('ERROR: ALL LANDLINES HAVE BEEN CUTT OFF FROM YOUR AREA. PERSONEL WILL BE AT YOUR AREA SOON')
    } else{
      console.log('account created', createdUser);
      res.redirect('/scp')
    }
  })
})

module.exports = users
