require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL);

const callback = function(err, data) {
  if (err) {
    return console.error(err);
  } else {
    console.log(data);
    console.log("Query completed!");
    process.exit();
  }
};

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  updated_At: { type: Date, default: Date.now }
});



const User = mongoose.model("users", UserSchema);

// User.create({ name: "Roger Smith", email: "Roger@smith.com" }, callback);
// User.create({ name: "Peter Smith", email: "Peter@smith.com" }, callback);
// User.create({ name: "Mary Smith", email: "Mary@smith.com" }, callback);
// User.create({ name: "Susan Smith", email: "Susan@smith.com" }, callback);



User.find({},callback)