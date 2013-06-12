var path = require('path');
var http = require('http');
var express = require('express');
var socket = require('socket.io');

var CLIENT_DIR = path.resolve(__dirname + '/../client');

var app = express();
var server = http.createServer(app);
server.listen(process.env.PORT, process.env.IP);

var io = socket.listen(server);

app.get('/', function(req, res){
    res.sendfile(CLIENT_DIR + '/index.html');
});

app.get('/js/:filename', function(req, res){
    res.sendfile(CLIENT_DIR + '/' + req.params.filename);
});

io.sockets.on('connection', function(client) {
    console.log('Somebody connected...');
    client.on('message', function(data) {
        console.log('Received message: ' + data.message);
        client.emit('message', { message : (new Date()) + ' : You say "' + data.message + '". I say hi! ' });
    });
});
