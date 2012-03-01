var express = require('express');
var app = express.createServer()
  , io = require('socket.io').listen(app);

app.listen(80);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {

  socket.emit('message', { who:'Grouchy', msg:'Someone joined the room.' });

  socket.on('message', function (data) {
    console.log(data);
    io.sockets.emit('message', data);
  });

});

