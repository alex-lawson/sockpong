var WebSocketServer = require('websocket').server;
var http = require('http');

var running = true;
var clients = [ ];

var server = http.createServer(function(request, response) {
    // process HTTP request. Since we're writing just WebSockets server
    // we don't have to implement anything.
});
server.listen(1337, function() { });

// create the server
wsServer = new WebSocketServer({
    httpServer: server
});

// WebSocket server
wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);

    // we need to know client index to remove them on 'close' event
    var index = clients.push(connection) - 1;

    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            // process WebSocket message
            console.log(message.utf8Data);
            connection.sendUTF(message.utf8Data);
        }
    });

    connection.on('close', function(connection) {
        // close user connection
        
        // remove user from the list of connected clients
        clients.splice(index, 1);
    });
});

var p1x = 250;
var p2x = 250;
var p1vx = 0;
var p2vx = 0;
var ballx = 250;
var bally = 250;
var ballvx = 1;
var ballvy = 1;

// looped game logic
function doupdate() {
    
    
};

//update positions
function moveobjects() {
    //paddles
    
    //ball
    
}

//check for collision
function testcollide() {
    //paddles
    
    //ball
}

// start main game loop
var gameloop = setInterval(doupdate(), 100);