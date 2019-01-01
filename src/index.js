const express = require("express");
const bodyParser = require('body-parser');
const logger = require("morgan");
const exhbs = require("express-handlebars");
const passport = require('passport');

require('./auth/auth');

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const connectDB = require("./db/connect");

// Setting up view engine
app.set("view engine", "hbs");
app.engine(
  "hbs",
  exhbs({
    extname: "hbs",
    defaultLayout: "layout"
  })
);

app.use("/static", express.static("static"));
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

const routes = require('./routes/routes');
const protectedRoute = require('./routes/protected.routes');
app.use('/', routes);
//We plugin our jwt strategy as a middleware so only verified users can access this route
app.use('/user', passport.authenticate('jwt', {
  session: false
}), protectedRoute);

//Handle errors
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: err
  });
});

connectDB();

require('./service/chat.socket')(io);

// server listen
server.listen(3000, () =>
  console.log("Server is running at htpp://localhost:3000")
);
