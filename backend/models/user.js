const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    firstname : {type : String, required : true, trim : true},
    lastname : {type : String, required : true, trim : true},
    email : {type : String, required : true},
    password : {type : String, required : true},
    phone : {type: Number, required : true},
    gender : {type : String, required : true, enum : ["male", "female", "other"]},
    country : {type : String, required : true}
})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;