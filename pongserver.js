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

// send game state to clients as json array
function sendtoclients() {
    var gamestate = {
        p1x:p1x,
        p2x:p2x,
        ballx:ballx,
        bally:bally,
    }
    
    var json = JSON.stringify({type:'update', gamestate:gamestate});
    for (var i=0; i < clients.length; i++) {
        clients[i].sendUTF(json);
    }
}

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
    moveobjects();
    testcollide();
    sendtoclients();
};

//update positions
function moveobjects() {
    //paddles
    p1x += p1vx;
    p2x += p2vx;
    
    //ball
    ballx += ballvx;
    bally += ballvy;
}

//check for collision
function testcollide() {
    //paddles
    p1x = clampint(p1x, 0, 500);
    p2x = clampint(p2x, 0, 500);
    
    //ball
    if (ballx > 500 || ballx < 0) {
        ballvx = -ballvx;
        ballx = clampint(ballx, 0, 500);
    }
    if (bally > 500 || bally < 0) {
        ballvy = -ballvy;
        bally = clampint(bally, 0, 500);
    }
}

//clamp toclamp within lbound and ubound
function clampint(toclamp, lbound, ubound) {
    if (toclamp > ubound) return ubound;
    else if (toclamp < lbound) return lbound;
    else return toclamp;
}

// start main game loop
var gameloop = setInterval(doupdate, 100);