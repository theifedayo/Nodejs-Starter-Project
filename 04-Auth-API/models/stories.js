const mongoose = require('mongoose')


const storySchema = new mongoose.Schema({
	story: {
		type: String,
		index: true
	},
	user: {
		type: String,
		required : true
	},
	createdAt:{
		type: Date,
		'default': Date.now
	}
})


module.exports = mongoose.model('Story', storySchema)