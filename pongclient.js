
// connects to the specified ip
function connectsocket() {
    var servloc='ws://'+$("#testip").val();
    window.connection = new WebSocket(servloc, ['soap', 'xmpp']);
    // When the connection is open, send some data to the server
    connection.onopen = function () {
        console.log("Connected to "+servloc)
        connection.send('Ping'); // Send the message 'Ping' to the server
    };

    // Log errors
    connection.onerror = function (error) {
        console.log('WebSocket Error ' + error);
    };

    // Log messages from the server
    connection.onmessage = function (e) {
        //console.log('Server: ' + e.data);
        $("#testlabel").html(e.data);
        window.data = JSON.parse(e.data);
        drawall(data.gamestate);
    };
}

// sends test data
function testsocket() {
    connection.send($("#testdata").val());
}

// refresh canvas and draw all elements
function drawall(gamestate) {
    pong.clear();
    paddle1.update(gamestate.p1x);
    paddle2.update(gamestate.p2x);
    ball.update(gamestate.ballx,gamestate.bally);
}


pong = {}

pong.width = 500
pong.height = 500;
pong.init = function() {
    var canvas = $("#playfield")[0];
    var context = canvas.getContext('2d');

    // Draw playfield
    context.beginPath();
    context.rect(50, 50, this.width, this.height);
    context.fillStyle = '#8ED6FF';
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = 'black';
    context.stroke();
    
    // Draw paddles
    paddle1.init();
    paddle2.init();
    
    // Draw ball
    ball.init();
}
pong.clear = function() {
    var canvas = $("#playfield")[0];
    var context = canvas.getContext('2d');

    // Draw playfield
    context.beginPath();
    context.rect(50, 50, this.width, this.height);
    context.fillStyle = '#8ED6FF';
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = 'black';
    context.stroke();
}


paddle1 = {};
paddle1.width = 100;
paddle1.height = 30;
paddle1.init = function(){
    /* Context is the canvas context
     * 
     */
    var start_x = 250;
     
    console.log(start_x);
    var canvas = $("#playfield")[0];
    var ctx = canvas.getContext('2d');
        
    ctx.beginPath();
    ctx.rect(start_x, 55, this.width, this.height);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.stroke();
     
};
paddle1.update = function(newx) {
    var canvas = $("#playfield")[0];
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.rect(newx, 55, this.width, this.height);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.stroke();
}

paddle2 = {};
paddle2.width = 100;
paddle2.height = 30;
paddle2.init = function(){
    /* Context is the canvas context
     * 
     */
    var start_x = 250;
     
    console.log(start_x);
    var canvas = $("#playfield")[0];
    var ctx = canvas.getContext('2d');
        
    ctx.beginPath();
    ctx.rect(start_x, 515, this.width, this.height);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.stroke();
     
};
paddle2.update = function(newx) {
    var canvas = $("#playfield")[0];
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.rect(newx, 515, this.width, this.height);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.stroke();
}

ball = {};
ball.r = 10;
ball.init = function() {
    var start_x = pong.width / 2;
    var start_y = pong.height / 2;
    console.log(start_x);
    var canvas = $("#playfield")[0];
    var ctx = canvas.getContext('2d');
        
    ctx.beginPath();
    ctx.arc(start_x, start_y, ball.r, 0, 2*Math.PI, false);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.stroke();  
};

ball.update = function(newx,newy) {
    var canvas = $("#playfield")[0];
    var ctx = canvas.getContext('2d');
        
    ctx.beginPath();
    ctx.arc(newx+50,550-newy, ball.r, 0, 2*Math.PI, false);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.stroke();  
};

