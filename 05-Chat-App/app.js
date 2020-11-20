const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const path = require('path')

const app = express()
const server = http.createServer(app)
let io = socketIO(server)

const publicPath = path.join(__dirname, 'public')
app.use(express.static(publicPath))

io.on('connection', (socket)=>{
	console.log('A new user connected!')

	socket.on('disconnect', ()=>{
		console.log('User disconnected from server')
	})
})







const port = process.env.PORT || 3000

server.listen(port, ()=>{
	console.log(`Server running on port ${port}`)
})