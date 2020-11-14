const user = require('../controllers/users')
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/register', user.register)

module.exports = router;
