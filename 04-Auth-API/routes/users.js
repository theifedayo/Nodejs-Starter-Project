const user = require('../controllers/users')
const User = require('../models/users')
var express = require('express');
var router = express.Router();
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

/* GET users listing. */
router.post('/register', user.register)

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
      if (err) { return res.status(500).json({
      	success: false,
      	message: 'Server side error'
      })}
      if (!user) { return done(null, false); }
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




router.post('/login', (req, res)=>{
	if(!req.body.username ||  !req.body.password){
		return res.status(400).json({
			success: false,
			message: "All fields are required"
		})
	}

	passport.authenticate('local', { failureRedirect: '/users/login' }), function(req, res, err){
		if(err){
			return res.send('error on the mountain')
		}
		console.log('success')
	}



})
//passport.authenticate('local'), function(req, res, err){
	// if (err){
	// 	return res.status(500).json({
 //      	success: false,
 //      	message: 'Server side error'
 //      })
	// }
	
	// return res.status(200).json({
	// 	success: true,
	// 	message: "User logged in successfully",
	// 	token: User.generateJWT()
	// })
//})

router.get('/logout', user.getLogout)


module.exports = router;
