var express = require('express');
var router = express.Router();
const { buildCheckFunction, body, validationResult } = require('express-validator')
const checkBodyAndQuery = buildCheckFunction(['body', 'query']);
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

const user = require('../controllers/users')



router.get('*', (req, res, next)=>{
  res.locals.user = req.user || null
  console.log(res.locals.user)
  next()
})

//SIGNUP
router.get('/', user.getregistration);

router.post('/',[
	//Form validation
	body('username', 'Username is required').notEmpty(),
	body('email', 'Email is required').notEmpty(),
	body('email', 'Email not valid').isEmail(),
	body('password', 'Password is required').notEmpty(),
	// body('password2', 'Passwords do not match').equals(req.body.password)
	], user.postregistration);

//LOGIN
router.get('/login', user.getlogin)

passport.serializeUser(function(user, done){
	done(null, user.id)
})

passport.deserializeUser(function(id, done){
	User.findById(id, function(err, user){
		done(err, user)
	})
})


//Local strategy
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      console.log(user.username)
      User.comparePassword(password, user.password, (err, isMatch)=>{
		if(err) throw err
		if(isMatch){
			return done(null, user)
		}else{
			return done(null, false, {message: 'Invalid Password'})
		}
	})
    });
  }
));

router.post('/login', passport.authenticate('local', { failureRedirect: '/users/login' }), function(req, res){
	console.log('Authentication successful')
	res.redirect('/staff')
})

//LOGOUT
router.get('/logout', user.getLogout)












module.exports = router;
