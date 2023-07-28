const mongoose = require('mongoose')

const ProductShema = new mongoose.Schema({
    id:{type:Number,required:true},
    catagory:{type:String,required:true},
    name:{type:String,required:true},
    ratting:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:String,required:true},
    oPrice:{type:String,required:true}

})

const ProductModel = mongoose.model('product',ProductShema)

module.exports = ProductModel;