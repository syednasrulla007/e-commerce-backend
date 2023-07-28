const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    name:String,
    orders : []

})

const OrderModel = mongoose.model('order',OrderSchema)

module.exports = OrderModel;