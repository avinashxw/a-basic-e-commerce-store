var express = require('express');
var router = express.Router();

/* GET method */
router.get('/', function(req, res, next) {
  res.send('Welcome to Admin Dashboard!');
});

module.exports = router;
