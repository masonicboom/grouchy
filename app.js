var express = require('express');
var app = express.createServer()
  , io = require('socket.io').listen(app);
var moment = require('moment');

app.listen(80);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {

  var when = moment().format('YYYY-MM-DD HH:MM z');
  socket.emit('message', { when: when, who:'Grouchy', msg:'Someone joined the room.' });

  socket.on('message', function (data) {
    console.log(data);
    io.sockets.emit('message', data);
  });

});

