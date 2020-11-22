const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')


exports.index = (req, res, next)=> {
  res.render('index', { title: 'Express' });
}


exports.getStaff = (req, res)=>{
	res.render('staff')
}

exports.ensureAuthenticated = (req, res, next)=>{
	if(req.isAuthenticated()){
		return next()
	}
	res.redirect('/users/login')
}