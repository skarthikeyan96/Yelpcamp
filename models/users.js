const mongoose = require('mongoose');
const PassportLocalMongoose = require('passport-local-mongoose')
let UserSchema = new mongoose.Schema({
    username : String,
    email : String,
    password : String
});
UserSchema.plugin(PassportLocalMongoose)
module.exports = mongoose.model('User',UserSchema);