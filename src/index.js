const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const logger = require("morgan");
const exhbs = require("express-handlebars");

const connectDB = require('./db/connect');

connectDB();

// const User = require('./model/user.model');
// const Message = require('./model/message.model');
// var userRecord, messageRecord = null;
// User.create({
//     username: 'Phat Nguyen',
//     email: 'phatnt.uit@gmail.com',
//     password_hash: 'ok bede',
//   }).then((...args) => {
//     console.log(args);
//     userRecord = args[0];

//     Message.create({
//         user: userRecord._id,
//         message_body: 'Hello Bede',
//         message_status: true,
//       }).then((...args) => {
//         console.log(args);
//         messageRecord = args[0];
//       })
//       .catch((...args) => {
//         console.log(args);
//       });
//   })
//   .catch((...args) => {
//     console.log(args);
//   });

app.use("/static", express.static("static"));

const {
  uniqueId
} = require("lodash");
// logger
app.use(logger("dev"));

// view engine setup
app.set("view engine", "hbs");

/*
defaultLayout Dir: views/layouts
default parials Dir: views/partials
*/
app.engine(
  "hbs",
  exhbs({
    extname: "hbs",
    defaultLayout: "layout"
  })
);

// server listen
server.listen(3000, () =>
  console.log("Server is running at htpp://localhost:3000")
);

// routes
app.get("/", (req, res) => {
  res.render("pages/index", {
    title: "Home",
    chatItems: [{
        user: "Phat Nguyen",
        lastMessage: "Ahihi do ngoc"
      },
      {
        user: "Tai Nguyen",
        lastMessage: "Anh 2 oi!!!"
      },
      {
        user: "Jack Le",
        lastMessage: "Goi Phat gium anh 1 cai"
      },
      {
        user: "Anny Tong",
        lastMessage: "Em yeu anh"
      }
    ]
  });
});

// render only a partial without any layout
app.get("/title", (req, res) => {
  res.render("partials/title", {
    layout: false,
    title: "OK mama"
  });
});

// socket io server listener
var no_online = 0;
io.on("connection", socket => {
  console.log(`Socket ${socket.id} connected!`);
  // set fake user name for client
  socket.name = uniqueId("User");
  no_online++;

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

  socket.on("request-chat", partner => {
    console.log("request-chat");
    socket.emit("receive-chat", `${partner} ok nhe!`);
  });

  socket.on("disconnect", reason => {
    no_online--;
    console.log(`Socket ${socket.name} disconnected because of ${reason}`);
  });
});
