const express = require("express");
body_parser = require("body-parser");
const Promise = require("bluebird");
mongoose = require('mongoose');
session = require("express-session");
(redis = require("redis")), (client = redis.createClient(process.env.REDIS_URL || null));

mongoose.connect(process.env.MONGO_URL)

const RedisStore = require("connect-redis")(session);
serveStatic = require('serve-static');
path = require('path');
app = express();

http = require("http").Server(app);

app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static("dist"));

var hour = 3600000;
app.use(
  session({
    store: new RedisStore(),
    secret: process.env.SECRET_KEY || "dev",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 24 * hour }
  })
);


app.use("/", serveStatic ('/dist/moblize/index.html')) //static for VUE


app.get("/", function(request, response) {
  response.render("index.html");
});

//################################----------###############################

var PORT = process.env.PORT || 8801;
http.listen(PORT, function() {
  console.log("Listening on port " + PORT);
});
