var express = require('express');
const passport = require('passport');
const User = require('../models/users');
var router = express.Router();


router.get('/login',(req,res)=>{
  res.render('login')
})
router.get('/register',(req,res)=>{
  res.render('register')
})
// post route for register
router.post('/register', (req, res) => {
  let newUser = new User({ username: req.body.username,email:req.body.email })
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err)
      console.log(err.message)
      return res.status(422).json({message : "failure" , error : err.message}) //422 Unprocessable Entity
    }
    passport.authenticate('local')(req, res, () => {
      res.status(200).json({message:"success"})
    })
  })
})
//get route for logout 
router.get('/logout', (req, res) => {
  req.logout();
  req.flash("success","You have been logged out")
  res.redirect('/')
})

router.post('/login',function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) return res.status(500).send();
        if (!user)
            return res.status(401).json({ SERVER_RESPONSE: 0, SERVER_MESSAGE: `${info.message}` });
        req.logIn(user, function(err) {
            if (err)
            console.log(err)
            req.flash("success",`Successfully logged in to the application ${user.firstname}`)
            return res.status(200).json({ SERVER_RESPONSE: 1, SERVER_MESSAGE: "Logged in!" });
        });
    })(req, res, next);
});

module.exports = router;
