var express = require('express');
var router = express.Router();

const index = require('../controllers/index')

router.get('*', (req, res, next)=>{
  res.locals.user = req.user || null
  console.log(res.locals.user)
  next()
})

/* GET home page. */
router.get('/',  index.index);

//STAFF
router.get('/staff', index.ensureAuthenticated, index.getStaff)





module.exports = router;
