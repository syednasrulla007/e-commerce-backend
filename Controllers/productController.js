const { ApiData } = require("../ApiFiles/e-commerce")
const ProductModel = require("../Model/product")

const postData = async(req,res)=>{
    try{
        const result = await ProductModel.insertMany(ApiData)
        result.save()
        res.send(result)
    }
    catch(err){
        res.send(err)
    }
}

const getData = async(req,res)=>{
    try{
        const result = await ProductModel.find(req.body)
        // console.log(req.body)
        res.send(result)
    }
    catch(err){
        res.send(err)
    }
}
module.exports = {postData,getData}