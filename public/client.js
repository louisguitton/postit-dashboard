document.addEventListener("DOMContentLoaded", function () {

  var socket = io.connect();

  $("#board form").submit(function (e) {
    e.preventDefault();
    var postit = {
      text: $("#input-text").val(),
      title: $("#input-title").val(),
    };

    socket.emit("create_postit", {
      postit: postit,
    });
    $("#input-text").val("");
    $("#input-title").val("");
  });

  socket.on("create_postit", function (data) {
    var postit = data.postit;
    var html =
      "<li><a><h2>" + postit.title + "</h2><p>" + postit.text + "</p></a></li>";
    $("#board").append(html);
  });
});
