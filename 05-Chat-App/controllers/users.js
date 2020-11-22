const { buildCheckFunction, body, validationResult } = require('express-validator')
const checkBodyAndQuery = buildCheckFunction(['body', 'query']);
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')



exports.getregistration = (req, res)=>{
	res.render('registration')
}


exports.postregistration = (req, res)=>{
	//Get values from form
	const username = req.body.username
	const email = req.body.email
	const password = req.body.password
	const password2 = req.body.password2

	errors = validationResult(req)
	if(!errors.isEmpty()){
		console.log(errors)
		res.render('registration', {
			errors: errors,
			username: username,
			email: email,
			username: username,
			password: password,
			password2: password2
		})
	}else if(password != password2){
		pErrors = 'Passwords do not match'
		res.render('registration', {
			pErrors: pErrors,
			username: username,
			email: email,
			username: username,
			password: password,
			password2: password2
		})
	}else{
		const newUser = new User()

		newUser.username = req.body.username
		newUser.email = req.body.email
		newUser.password = req.body.password

		User.createUser(newUser, (err, docs)=>{
			if(err){
				throw err
			}else{
				console.log(newUser)
			}
		})

		//success redirect	
		res.redirect('/users/login')
	}
}

exports.getlogin = (req, res)=>{
	res.render('login')
}


exports.getLogout = (req, res)=>{
	req.logout()
	// req.flash('success', 'You are logged out')
	res.redirect('/users/login')
}