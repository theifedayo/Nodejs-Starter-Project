const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		index: true
	},
	email: {
		type: String,
		unique: true
	},
	password: {
		type: String
	}
})


module.exports = mongoose.model('User', UserSchema)