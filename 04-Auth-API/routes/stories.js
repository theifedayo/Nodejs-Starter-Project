const stories = require('../controllers/stories')
var express = require('express');
var router = express.Router();


router.post('/', stories.postStory);
router.get('/', stories.getStory);



module.exports = router;
