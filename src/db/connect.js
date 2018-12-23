const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

function connectDB() {
  mongoose.connect('mongodb://localhost:27017/my-app', {
    useNewUrlParser: true
  }, error => {
    if (error) {
      console.log(`Can not connect MongoDB because of ${error}`);
      return
    }
    console.log('Connect MongoDB successfully!');
  });
}

module.exports = connectDB;
