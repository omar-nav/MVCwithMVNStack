var express = require("express")
var path = require("path")
var favicon = require("serve-favicon")
var logger = require("morgan")
var cookieParser = require("cookie-parser")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

var app = express()

var User = require("./models/User")

//connect to mongodb locally
// create a new John Doe with each cranking up of application
mongoose
  .connect(
    "mongodb://localhost:27017/express_app",
    function() {
      console.log("Connection has been made")
      const user_resource = new User({
        name: "John Doe",
        email: "john@doe.com"
      })
      // error handler
      app.use(function(err, req, res, next) {
        user_resource.save(error => {
          if (error) console.log(error)
          res.send({
            success: true,
            code: 200,
            msg: "User added!"
          })
        })
      })
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

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
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
