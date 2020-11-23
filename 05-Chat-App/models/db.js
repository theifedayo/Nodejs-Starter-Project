const mongoose = require('mongoose')


const connectDB = async ()=>{
	try{
		const conn = await mongoose.connect('mongodb://localhost:27017/UsersDB', { useNewUrlParser: true, useUnifiedTopology: true }, ()=>{
			console.log("DB connected successfully")
		})
	}catch(error){
		console.error(error)
		process.exit(1)
	}
}

module.exports = connectDB