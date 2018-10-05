require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const Promise = require("bluebird");
const mongoose = require("mongoose");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const serveStatic = require("serve-static");

const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL || null);

// const routes = require("./routes/index");
const users = require("./routes/users");

const path = require("path");
const app = express();
const http = require("http").Server(app);

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connection succesful"))
  .catch(err => console.error(err));

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("dist"));

const hour = 3600000;
app.use(
  session({
    store: new RedisStore(),
    secret: process.env.SECRET_KEY || "dev",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 24 * hour }
  })
);

app.use("/", serveStatic(path.join(__dirname, "/dist/moblize"))); 

app.use("/users", users);


const PORT = process.env.PORT || 8801;
http.listen(PORT, function() {
  console.log("Listening on port " + PORT);
});
