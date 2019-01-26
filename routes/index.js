const express = require('express');
const router = express.Router();
const middleware = require('../middleware')
// index page before login
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// index page after login
router.get('/main',middleware.isLoggedIn,(req,res)=>{
  res.render("main")
})

module.exports = router;
