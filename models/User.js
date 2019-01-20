const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: { required: true, 'Let us know you by adding your name!' },
  email: { required: true,  'Please add your email as well.' }
})
// mongoose.model(ModelName)
const User = mongoose.model("User", UserSchema)
module.exports = User
