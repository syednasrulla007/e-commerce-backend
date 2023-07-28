const OrderModel = require("../Model/order")
const jwt = require('jsonwebtoken')

const AddOrders = async(req,res) =>{
    const {order,token} = req.body
    try{
        if(token === null){
            res.send('Not Logged In')
        }
        else{
            jwt.verify(token,process.env.SECKEY,async (err,details)=>{
                if(err){
                    console.log(err)
                }
                else{
                    const Checkname = await OrderModel.findOne({name:details.name})
                    // console.log(Checkname)
                    if(Checkname === null){
                        const result = await OrderModel.create({name:details.name,orders:[{...order,qty:1}]})
                        res.send(result)
                        // console.log(result)
                        result.save()
                    }
                    else{
                        var sum = 0
                         Checkname.orders.forEach((item)=>{
                            if(item.name === order.name){
                                sum = sum+1
                            }
                        })
                        if(sum === 0){
                            const result  = await OrderModel.findOneAndUpdate({name:details.name},{$push:{orders:{...order,qty:1}}})
                            res.send('Added to cart=>',result)
                        }
                        else{
                            const result = await OrderModel.findOneAndUpdate({name:details.name,"orders.name":order.name},{$inc:{"orders.$.qty":1}})
                            res.send('Already exists incresed quantity=>',result)
                        }
                    }
                }
            })
        }
        }
    
    catch(err){
        console.log(err)
    }
} 
const getOrders = async(req,res) =>{
    const {token} = req.body
    try{
        if(token === null){
            res.send('Not Logged In')
        }
        else{
            jwt.verify(token,process.env.SECKEY,async (err,details)=>{
                if(err){
                    console.log(err)
                }
                else{
                    const Checkname = await OrderModel.findOne({name:details.name})
                    // console.log(Checkname)
                    if(Checkname === null){
                        res.send('User does not present ')
                    }
                    else{
                        res.send(Checkname)
                    }
                }
            })
        }
        }
    
    catch(err){
        console.log(err)
    }
} 

const incOrders = async(req,res)=>{
    const {order,type} = req.body.data
    const token = req.body.token
    try{
        if(token === null){
            res.send('Not Logged In')
        }
        else{
            jwt.verify(token,process.env.SECKEY,async (err,details)=>{
                if(err){
                    console.log(err)
                }
                else{
                    const Checkname = await OrderModel.findOne({name:details.name})
                    // console.log(Checkname)
                    if(Checkname === null){
                        res.send('User does not present ')
                    }
                    else{
                        if(type == 'inc'){
                            const result = await OrderModel.findOneAndUpdate({name:details.name,"orders.name":order.name},{$inc:{"orders.$.qty":1}})
                            res.send(result)
                            // console.log(result)
                        }
                        else if(type == 'dec'){
                           if(order.qty === 1){
                            const result = await OrderModel.findOneAndUpdate({name:details.name},{$pull:{"orders":{name:order.name}}})
                            res.send(result)
                           }
                           else if(order.qty >= 1){
                            const result = await OrderModel.findOneAndUpdate({name:details.name,"orders.name":order.name},{$inc:{"orders.$.qty":-1}})
                            res.send(result)
                            // console.log(result)
                           }
                        }
                    }
                }
            })
        }
        }
    
    catch(err){
        console.log(err)
    }
    // const {order,type} = req.body.data
    // try{
    //     if(type === 'inc'){
    //         const result = await OrderModel.findOneAndUpdate({name:order.name},{$inc:{'qty':1}}).exec()
    //         res.send(result)
    //     }
    //     else if(type === 'dec'){
    //         if(order.qty === 1){
    //             const result = await OrderModel.findOneAndDelete({name:order.name}).exec()
    //             res.send(result)
    //         }
    //         else if (order.qty > 1){
    //             const result = await OrderModel.findOneAndUpdate({name:order.name},{$set:{'qty':order.qty-1}}).exec()
    //         res.send(result)
    //         }
    //     }
    // }
    // catch(err){
    //     console.log(err)
    // }
}
const checkout =async(req,res)=>{
    const token = req.body.token
    try{
        if(token === null){
            res.send('Not Logged In')
        }
        else{
            jwt.verify(token,process.env.SECKEY,async (err,details)=>{
                if(err){
                    console.log(err)
                }
                else{
                    const Checkname = await OrderModel.findOneAndUpdate({name:details.name},{$set:{orders:[]}})
                    // console.log(Checkname)
                    res.send(Checkname)
                }
            })
        }
        }
    
    catch(err){
        console.log(err)
    }

}

module.exports = {AddOrders,getOrders,incOrders,checkout}