var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

io.on('connection', function(socket) {
  io.emit('connected', 'Someone has connected');

  socket.on('chat message', function(message) {
    io.emit('chat message', message);
  });

  socket.on('disconnect', function() {
    io.emit('disconnect', 'Someone has disconnected.');
  });

  socket.on('typing', function() {
    io.emit('typing message', 'Someone is typing...');
  });
});
