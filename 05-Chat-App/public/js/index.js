let socket = io();


socket.on('connect', function(){
	console.log('Connected to server')
})

socket.on('disconnect', function(){
	console.log('disconnected from server')
})

socket.emit('createMessage', {
	from: "client",
	text: "Hello from the client side"
})

socket.on('newMessage', function(message){
	console.log('message', message)
})