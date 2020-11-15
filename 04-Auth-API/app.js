const path = require('path')
const express = require('express')
const cors = require('cors')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const dotenv = require('dotenv')
const connectDB = require('./models/db')


dotenv.config({path: './config/config.env'})


connectDB()
const app = express()

//body parser
app.use(express.json())

//enable cors
app.use(cors())

//Handle express sessions
app.use(session({
	secret: process.env.SESSION_SECRET,
	saveUninitialized: true,
	resave: true
}))

//handle passport
app.use(passport.initialize())
app.use(passport.session())


//Routes
app.use('/api/v1/stories', require('./routes/stories'))
app.use('/api/v1', require('./routes/users'))


const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
	console.log(`Server running in ${process.env.NODE_ENV} on port ${process.env.PORT}`)
})