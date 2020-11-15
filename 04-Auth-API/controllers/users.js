const User = require('../models/users')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy





exports.register = (req, res)=>{
	if(!req.body.username || !req.body.email || !req.body.password){
		return res.status(400).json({
			success: false,
			message: "All fields are required"
		})
	}

	const newUser = new User()
	newUser.username = req.body.username
	newUser.email = req.body.email
	newUser.password = req.body.password

	User.createUser(newUser, (err, docs)=>{
		if(err){
			throw err
		}else{
			const userToken = User.generateJWT()
			return res.status(200).json({
				success: true,
				message: "User created successfully",
				data: newUser,
				token: userToken
			})
		}
	})
}

exports.check = (req, res, next)=>{
	if(!req.body.username ||  !req.body.password){
		return res.status(400).json({
			success: false,
			message: "All fields are required"
		})
	return next()
	}
}



exports.getLogout = (req, res)=>{
	req.logout()
	res.status(200).json({
		success: true,
		message: "User logged out successfully",
	})
}

