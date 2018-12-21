var app = require("express")();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var logger = require("morgan");
var exhbs = require("express-handlebars");

// logger
app.use(logger("dev"));

// view engine setup
app.set("view engine", "hbs");

app.engine("hbs", exhbs({
  extname: "hbs",
  defaultLayout: "layout",
}));


// server listen
server.listen(3000, () =>
  console.log("Server is running at htpp://localhost:3000")
);


// routes
app.get("/", (req, res) => {
  res.render('index', {
    title: 'Home'
  });
});

// socket io server listener
io.on("connection", socket => {
  console.log(`Socket ${socket.id} connected!`);

  socket.on("disconnect", reason => {
    console.log(`Socket ${socket.id} disconnected because of ${reason}`);
  });
});
