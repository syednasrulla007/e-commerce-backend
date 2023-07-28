const jwt = require('jsonwebtoken')

const Authunticate = (req,res) =>{
    const {token} = req.body
    // console.log(token)
    if(token === null){
        res.send({
            name:'Login'
        })
    }
    else if(token != null){
        jwt.verify(token,process.env.SECKEY,(err,details)=>{
            if(err){
                // console.log(err)
                res.status(500)
            }
            else{
                res.send(details)
            }
        })
    }
}  

module.exports = {Authunticate}