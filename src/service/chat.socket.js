const {
  uniqueId
} = require('lodash');
// socket io server listener
var no_online = 0;
var users = [];

module.exports = io => {
  io.on("connection", socket => {
    console.log(`Socket ${socket.id} connected!`);
    // set fake user name for client
    socket.name = uniqueId("User");
    no_online++;
    users.push(socket);

    console.log(`There are ${users.length} people are online!`);

    io.sockets.emit("receive_no_online", no_online);

    socket.on("send_message", data => {
      // render current user message
      socket.emit("receive_message", data);

      // render received message
      socket.broadcast.emit("receive_message", {
        ...data,
        userName: socket.name
      });
    });

    //test send message to anther one.
    console.log(users[0].id);
    socket.broadcast
      .to(users[0].id)
      .emit("receive_message", "tau gui tin nhan cho m ne con cho!");

    socket.on("request-chat", partner => {
      console.log("request-chat");
      socket.emit("receive-chat", `${partner} ok nhe!`);
    });

    socket.on("disconnect", reason => {
      no_online--;
      users = users.filter(user => user.id !== socket.id);
      console.log(`Socket ${socket.name} disconnected because of ${reason}`);
    });
  });
}
