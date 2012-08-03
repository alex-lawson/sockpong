
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
        console.log('Server: ' + e.data);
        $("#testlabel").html(e.data);
    };
}

// sends test data
function testsocket() {
    connection.send($("#testdata").val());
}

function updatepos() {
    
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
        context.lineWidth = 5;
        context.strokeStyle = 'black';
        context.stroke();
        
        
        // Draw paddles
        paddle1.init();
        
        // Draw ball
        ball.init();
        
}


paddle1 = {};
paddle1.width = 100;
paddle1.height = 30;
paddle1.init = function(){
    /* Context is the canvas context
     * 
     */
    var start_x = pong.width / 2 - Math.floor(this.width / 2);
     
    console.log(start_x);
    var canvas = $("#playfield")[0];
    var ctx = canvas.getContext('2d');
        
    ctx.beginPath();
    ctx.rect(start_x, 55, this.width, this.height);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.stroke();
     
};

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


