//#region Variables
var socket = null;
var socketURL = "http://localhost:9000";
var enable_encryption = false;
//#endregion

//#region Functions
//#region Socket
function connectSocket() {
    if (socket == null) {
        socket = io.connect(socketURL);
    }
    listenEvent();
}
//#endregion

//#region Listen
function listenEvent() {
    socket.on('connect', function () {
        console.log("Socket connected.");
        console.log(socket);
    });

    socket.on('reconnecting', function () {
        console.log("Socket reconnecting...");
    });

    socket.on('reconnect', function () {
        console.log("Socket reconnected.");
    });

    socket.on('disconnect', function () {
        console.log("Socket disconnected.");
    });

    socket.on('data2', function (data) {
        data = socketReceiveAction(data);

        console.log("Received data2");
        console.log(data);
    });
}
//#endregion

//#region Encryption
function decode(data) {
    // convert from base64 and return object in string
    return atob(data);
}
function encode(data) {
    // convert string object to base64 string and return the string
    return btoa(data);
}
function socketReceiveAction(data) {
    if (enable_encryption) {
        return JSON.parse(this.decode(data));
    }
    else {
        return data;
    }
}
//#endregion

//#region Emit
function emitData() {
    var data = {
        hello: 123,
        haha: 321
    };
    if (enable_encryption) {
        socket.emit('data1', btoa(JSON.stringify(data)));
    } else {
        socket.emit('data1', data);
    }
    console.log("Emit data1");
    console.log(data);
}
//#endregion

//#endregion