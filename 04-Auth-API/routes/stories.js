const stories = require('../controllers/stories')
const user = require('../controllers/users')
var express = require('express');
const jwt = require('express-jwt')

var router = express.Router();



router.post('*', (req, res, next)=>{
  res.locals.user = req.user || null
  console.log(res.locals.user,'----------------')
  next()
})



router.post('/', jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload',
	algorithms: ['HS256']
}), stories.postStory);
router.get('/', stories.getStory);
router.get('/:id', stories.storyDetails);
router.put('/:id', stories.updateStory);

router.delete('/:id', jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload',
	algorithms: ['HS256']
}), stories.deleteStory);


module.exports = router;
