const express = require('express');
const router = express.Router();
const path = require('path')
const middleware = require('../middleware')
// index page before login
router.get('/', function(req, res, next) {
  res.sendFile(path.join(path.dirname(__filename),'../','index.html'));
});
module.exports = router;
