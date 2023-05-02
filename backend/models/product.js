const mongoose = require("mongoose");

const Schema =  mongoose.Schema;

const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
    name : {type : String, required : true},
    price : {type : String, require : true},
    category : {type : String, require : true},
    // company : {type : String, require : true},
    user : {type : ObjectId, ref : "User"}
})

const productModel = mongoose.model('Product', productSchema)

module.exports = productModel;