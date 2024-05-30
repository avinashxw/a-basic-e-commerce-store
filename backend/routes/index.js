var express = require('express');
var router = express.Router();

/* chck server running */
router.get('/', function(req, res, next) {
  res.send('Server is up & running!');
});

module.exports = router;
