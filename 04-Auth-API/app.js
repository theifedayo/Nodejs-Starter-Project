const path = require('path')
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./models/db')


dotenv.config({path: './config/config.env'})


connectDB()
const app = express()

//body parser
app.use(express.json())

//enable cors
app.use(cors())

//set static folder
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use('/api/v1/stories', require('./routes/stories'))
app.use('/api/v1', require('./routes/users'))


const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
	console.log(`Server running in ${process.env.NODE_ENV} on port ${process.env.PORT}`)
})