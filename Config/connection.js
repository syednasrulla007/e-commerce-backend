const mongoose = require('mongoose')
mongoose.set('strictQuery',true)
const URL= `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.5ellmui.mongodb.net/?retryWrites=true&w=majority`
// const URL= `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.v0f64ar.mongodb.net/E-commerce?retryWrites=true&w=majority`
// const URL ='mongodb://127.0.0.1:27017/E-Commerce' 

const Connection = async () => {
    try{
        console.log('Connecting to Database ....');
        const result = await mongoose.connect(URL)
        console.log('Connected Sucessfully');
    }
    catch(error){
        console.log('Error while connecting to Datbase',error)
    }
}

module.exports = Connection;