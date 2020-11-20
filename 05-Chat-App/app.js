const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const app = express()
const server = http.createServer(app)
let io = socketIO(server)
















const port = process.env.PORT || 3000

server.listen(port, ()=>{
	console.log(`Server running on port ${port}`)
})