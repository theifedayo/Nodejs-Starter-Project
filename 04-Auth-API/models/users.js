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

module.exports.generateJWT = ()=>{
	const expiry = new Date()
	expiry.setDate(expiry.getDate() + 7)
	return jwt.sign({
		_id: this._id,
		email: this.email,
		username: this.username,
		exp: parseInt(expiry.getTime()/1000, 10)
	}, process.env.JWT_SECRET)
}


