const mongoose = require('mongoose')
const connectDB = require('./db')
const bcrypt = require('bcrypt')


const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		index: true
	},
	email: {
		type: String
	},
	password: {
		type: String
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

module.exports.getUserByUsername = (username, callback)=>{
	const query = { username: username}
	User.findOne(query, callback)
}

module.exports.comparePassword = (candidatePassword, hash, callback)=>{
	bcrypt.compare(candidatePassword, hash, (err, isMatch)=>{
		if(err) return callback(err)
		callback(null, isMatch)
	})
}

module.exports.getUserById = (id, callback)=>{
	User.findById(id, callback)
}