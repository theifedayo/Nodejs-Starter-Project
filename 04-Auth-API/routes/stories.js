const stories = require('../controllers/stories')
var express = require('express');
var router = express.Router();


router.post('/', stories.postStory);
router.get('/', stories.getStory);
router.get('/:id', stories.storyDetails);
router.put('/:id', stories.updateStory);



module.exports = router;
