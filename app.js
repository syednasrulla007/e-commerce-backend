const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT
const express = require('express');
const app = express();
const cors = require('cors')
const Connection = require('./Config/connection')
const user = require('./routes/user')
const product = require('./routes/product')
const order = require('./routes/order')
const auth = require('./routes/auth')
const payment = require('./routes/payment')

app.use(express.json())
app.use(cors({origin:'*'}))
app.use('/',user) 
app.use('/',product) 
app.use('/',order) 
app.use('/',auth) 
app.use('/',payment) 


app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
    Connection()
})