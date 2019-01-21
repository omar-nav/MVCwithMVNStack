var express = require("express")
var path = require("path")
var favicon = require("serve-favicon")
var cookieParser = require("cookie-parser")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

var app = express()
// var User = require("./models/User")

//connect to mongodb locally
// create a new John Doe with each cranking up of application

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//connect to mongodb
mongoose
  .connect(
    "mongodb://localhost:27017/express_app",
    function() {
      console.log("Connection has been made")
      // const user_resource = new User({
      //   name: "John Doe",
      //   email: "john@doe.com"
      // })
      // error handler
      // app.use(function(err, req, res, next) {
      //   user_resource.save(error => {
      //     if (error) console.log(error)
      //     res.send({
      //       success: true,
      //       code: 200,
      //       msg: "User added!"
      //     })
      //   })
      // })
    }
  )
  .catch(err => {
    console.error("App starting error:", err.stack)
    process.exit(1)
  })

// Require file system module
var fs = require("file-system")

// Include controllers
fs.readdirSync("controllers").forEach(function(file) {
  if (file.substr(-3) == ".js") {
    const route = require("./controllers/" + file)
    route.controller(app)
  }
})

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found")
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

app.listen(3000, function() {
  console.log("listening on 3000")
})

module.exports = app
