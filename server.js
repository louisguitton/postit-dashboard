const express = require("express");
const path = require("path");
const socketIo = require("socket.io");
const PORT = process.env.PORT || 8080;

var app = express()
  .use(express.static(path.join(__dirname, "public")))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

var io = socketIo.listen(app);

// array of all postits
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
