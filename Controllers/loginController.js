const UserModel = require('../Model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRETE_KEY = process.env.SECKEY

const login = async (req,res)=>{
    try{
    const {name,password} = req.body
    const Data = await UserModel.findOne({name:`${name}`})
    if(Data == null ){
        res.send({msg:'User Does Not Exists',Token:null})
    }
    else{
        bcrypt.compare(password,Data.password,(err,value)=>{
            if(err){
                console.log('error in bcrypt.compare')
            }
            if(value==false){
                res.send({msg:'Wrong Password',Token:null})
            }
            else{
                jwt.sign(req.body,SECRETE_KEY,(err,token)=>{
                    if(err){
                        res.send(err)
                    }
                    else{
                        res.send({msg:'Login Sucessfull',Token:token})
                    }
                })
            }
        })
    }
    }
    catch(err){
     console.log(err)
     res.send(err)
    }   
 }

module.exports = {login}