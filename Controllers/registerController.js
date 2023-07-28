const UserModel = require('../Model/user')
const bcrypt = require('bcrypt')
const saltRounds = 10;

const register = async (req,res)=>{
  const {name,password,email} = req.body
  // console.log(password)
  const UserExit = await UserModel.findOne({name:name})
  if(UserExit){
    res.send('Username Already Exists')
  }
  else{
    bcrypt.hash(password,saltRounds,(err,hashedPass)=>{
      if(err){
          console.log(err)
      }
      else{
          const result = new UserModel({
            name:name,
            password:hashedPass,
            email:email
          })
          result.save()
          res.send('User Created')
      }
    })
  }
}

module.exports = {register}