var express = require("express"),
  app = express(),
  http = require("http"),
  socketIo = require("socket.io");

// start webserver on port 8080
var server = http.createServer(app);
var io = socketIo.listen(server);
server.listen(8080);
// add directory with our static files
app.use(express.static(__dirname + "/public"));

// array of all lines drawn
var postit_history = [];

// event-handler for new incoming connections
io.on("connection", function (socket) {
  // first send the history to the new client
  for (var i in postit_history) {
    socket.emit("create_postit", {
      postit: postit_history[i],
      id: i,
    });
  }

  // add handler for message type "create_postit".
  socket.on("create_postit", function (data) {
    postit_history.push(data.postit);
    io.emit("create_postit", { postit: data.postit });
  });
});
