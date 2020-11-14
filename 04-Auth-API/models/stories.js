const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
	story: {
		type: String,
		index: true
	},
	user: {
		type: String
	},
	createdAt:{
		type: Date,
		'default': Date.now
	}
})


module.exports = mongoose.model('User', UserSchema)