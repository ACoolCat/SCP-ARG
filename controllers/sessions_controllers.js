const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')

sessions.get('/new', (req, res) => {
  res.render('sessions/new.ejs')
})

sessions.post('/', (req, res) => {
  console.log("hit here");
  User.findOne({username: req.body.username}, (err, foundUser) => {
    if (err) {
      console.log(err);
      res.send('ERROR: DO NOT MOVE. PERSONEL WILL COME TO EXTRACT YOU')
    }else if(!foundUser) {
      res.send('<a href="/"> ACCOUNT DOES NOT EXIST. REMAIN STILL FOR EXTRACTION</a>')
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser
        console.log("hit");
        res.redirect('/scp')
      } else {
        res.send('<a href="/"> PASSWORD DOES NOT EXIST. YOU WILL BE DESTAINED STAY STILL </a>')
      }
    }
  })
})

module.exports = sessions
