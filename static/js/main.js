var messageTemplate = Handlebars.templates["message"];
$(function () {
  var socket = io.connect();
  var submitBtn = $("#submit");
  var messageEle = $("#message");
  var chatArea = $(".chat-area");

  function submit() {
    let messageStr = messageEle.val();
    socket.emit("send_message", messageStr);
    messageEle.val("");
  }
  submitBtn.on("click", submit);
  socket.on("receive_message", data => {
    console.log(data);
    chatArea.append(messageTemplate({ ...data,
      name: "test"
    }));
  });

  socket.on("receive_no_online", no_online => {
    $("#no_online").text(no_online);
  });
  $(".chat-entry").on("click", ".chat-item", function (e) {
    var partner = $(this).attr("data-partner");
    socket.emit("request-chat", partner);
  });

  socket.on("receive-chat", data => {
    var receivedData = `Received chat info of ${data}`;
    $(".appchat-content").html(receivedData);
  });
});
