var WebSocketServer = require('websocket').server;
var http = require('http');

var port = 1337;

var running = true;
var clients = [ ];

var p1name = "Thing 1";
var p2name = "Thing 2";
var p1score = 0;
var p2score = 0;
var p1x = 0;
var p2x = 0;
var p1vx = 0;
var p2vx = 0;
var ballx = 0;
var bally = 0;
var ballvx = 0;
var ballvy = 0;

var server = http.createServer(function(request, response) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Things are heating up!  The score is '+p1score+' to '+p2score'!');
});
server.listen(port, function() { });

console.log("Sockpong server started, listening on port "+port);

// create the server
wsServer = new WebSocketServer({
    httpServer: server
});

// WebSocket server
wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);
    
    console.log("Client connected.");
    
    // we need to know client index to remove them on 'close' event
    var index = clients.push(connection) - 1;

    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function(message) {
        //if (message.type === 'utf8') {
            // process WebSocket message
            console.log(message.utf8Data);
            connection.sendUTF(message.utf8Data);
        //}
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

// resets all variables to initial state
function newgame() {
    p1score = 0;
    p2score = 0;
    resetpos();
}

// returns elements to starting positions
function resetpos() {
    p1x = 250;
    p2x = 250;
    p1vx = 0;
    p2vx = 0;
    ballx = 250;
    bally = 250;
    ballvx = 1;
    ballvy = 1;
}

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
    //paddles with screen edge
    p1x = clampint(p1x, 0, 500);
    p2x = clampint(p2x, 0, 500);
    
    //ball with paddles
    if (bally < 50) {
        if (clampint(ballx, p1x - 50, p1x + 50) == ballx) {
            ballvy = -ballvy;
            bally = 50;
        }
    }
    else if (bally > 450) {
        if (clampint(ballx, p2x - 50, p2x + 50) == ballx) {
            ballvy = -ballvy;
            bally = 450;
        }
    }
    
    //ball with screen edge
    if (ballx > 500 || ballx < 0) { //out on the sides
        ballvx = -ballvx;
        ballx = clampint(ballx, 0, 500);
    }
    if (bally > 500 || bally < 0) { //out on the top or bottom (someone scored!)
        if (bally > 500) {
            p1score++;
            console.log("Point for Player 1! Score: "+p1score+" to "+p2score);
        }
        else {
            p2score++;
            console.log("Point for Player 2! Score: "+p1score+" to "+p2score);
        }
        resetpos();
        
        //ballvy = -ballvy;
        //bally = clampint(bally, 0, 500);
    }
}

//return clamped value of toclamp within lbound and ubound
function clampint(toclamp, lbound, ubound) {
    if (toclamp > ubound) return ubound;
    else if (toclamp < lbound) return lbound;
    else return toclamp;
}

// start main game loop
newgame();
var gameloop = setInterval(doupdate, 100);