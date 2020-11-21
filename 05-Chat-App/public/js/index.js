let socket = io();


socket.on('connect', function(){
	console.log('Connected to server')
})

socket.on('disconnect', function(){
	console.log('disconnected from server')
})


socket.on('newMessage', function(message){
	console.log('message', message)

	let li = document.createElement('li');
	li.innerText = `${message.from}: ${message.text}`

	document.querySelector('body').appendChild(li);
})


document.querySelector('#submit-btn').addEventListener('click', function(e){
	e.preventDefault();


	socket.emit('createMessage', {
		from: 'User',
		text: document.querySelector('input[name="message"]').value
	})

	document.querySelector('input[name="message"]').value = " ";
})