const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		index: true,
		unique: true
	},
	email: {
		type: String,
		unique: true
	},
	password: {
		type: String,
		bcrypt: true
	}
})


module.exports = mongoose.model('User', UserSchema)

module.exports.createUser = (newUser, callback)=>{
	bcrypt.hash(newUser.password, 10, (err, hash)=>{
		if(err) throw err
		newUser.password = hash

		//create new user
		newUser.save(callback)
	})
	
}

