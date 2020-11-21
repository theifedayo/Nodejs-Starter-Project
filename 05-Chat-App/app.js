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
	// console.log('A new user connected!')

	socket.emit('newMessage', {
		from: 'Admin',
		text: 'Welcome to x-chat-app',
		createdAt: new Date().getTime()
	})

	socket.broadcast.emit('newMessage', {
		from: 'Admin',
		text: 'New user joined',
		createdAt: new Date().getTime()
	})

	socket.on('disconnect', ()=>{
		// console.log('User disconnected from server')
	})

	socket.on('createMessage', (message)=>{
		// console.log('createMessage', message)

		io.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		})
	})
})







const port = process.env.PORT || 3000

server.listen(port, ()=>{
	console.log(`Server running on port ${port}`)
})