require("dotenv").config();

const express = require("express");
const body_parser = require("body-parser");
const Promise = require("bluebird");
const mongoose = require("mongoose");
const session = require("express-session");
(redis = require("redis")),
  (client = redis.createClient(process.env.REDIS_URL || null));
const routes = require("./routes/index");

const users = require("./routes/users");

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connection succesful"))
  .catch(err => console.error(err));

const RedisStore = require("connect-redis")(session);
const serveStatic = require("serve-static");
const path = require("path");
const app = express();
const http = require("http").Server(app);

app.use(express.json());

// app.set("views", path.join(__dirname, "dist"));
// app.set("view engine", "ejs");

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
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

app.use("/", serveStatic(path.join(__dirname, "/dist/moblize"))); //static for VUE

// app.use("/", routes);
app.use("/users", users);

// app.use(function(req, res, next) {
//   var err = new Error("Not Found");
//   err.status = 404;
//   next(err);
// });

// if (app.get("env") === "development") {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render("error", {
//       message: err.message,
//       error: err
//     });
//   });
// }

// app.get("/", function(request, response) {
//  response.render("index.html");
//});

//################################----------###############################

const PORT = process.env.PORT || 8801;
http.listen(PORT, function() {
  console.log("Listening on port " + PORT);
});
