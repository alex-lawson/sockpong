
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