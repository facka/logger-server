var filename = "./example.log";

var spawn = require('child_process').spawn;
//var tail = spawn('tail', ['-f', filename]);

var fs = require('fs');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
    var tailProcess;

    console.log('Connected new socket');

    socket.on('checkfile', function (data) {
        console.log(JSON.stringify(data));
        var filename = './' + (data.path ?  data.path + '/' : '') + data.file;
        fs.exists(filename, function(exists) {
            if (exists) {
                console.log('Emit ready!');
                socket.emit('ready', filename);
            } else {
                console.log('file not found.');
                socket.emit('logger_error', 'FILE_NOT_FOUND');
            }
        });
    });

    socket.on('start', function (filename) {
        console.log('starting logger');
        tailProcess = spawn('tail', ['-f', filename]);
        tailProcess.stdout.on('data', function (data) {
          console.log('sending data...' + data);
          socket.emit('data', ''+data);
        });
    });

    socket.on('pause', function () {
        console.log('Killing tail process');
        tailProcess.kill();
        tailProcess = null;
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function () {
        // remove the username from global usernames list
        console.log('Killing tail process');
        if (tailProcess) {
            tailProcess.kill();
        }
        tailProcess = null;
    });
});
