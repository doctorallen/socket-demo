var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//route for static view page
app.get('/', function(req,res){
	res.sendFile(__dirname + '/public/index.html');
});

//route for static admin page
app.get('/admin', function(req,res){
	res.sendFile(__dirname + '/public/admin.html');
});


//listen for the socket connection
io.on('connection', function(socket){
	console.log('Socket connected');

	//when the server receives a message from the admin client
	socket.on('admin-msg', function(msg){
		console.log(msg);
		//send the message to the other clients
		io.emit('message', msg);
	});
});

app.use(express.static(__dirname + '/public'));

http.listen(3000, function(){
	console.log('Server listening on port 3000');
});
