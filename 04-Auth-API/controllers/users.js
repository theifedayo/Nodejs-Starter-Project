const User = require('../models/users')



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
			return res.status(200).json({
				success: true,
				message: "User created successfully",
				data: newUser
			})
		}
	})
}