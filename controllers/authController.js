const UserModel = require("../models/user");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = async (req, res, next) => {
    try{
        const user = await UserModel.findOne({userName:req.body.userName})
      if(!user){
        res.status(404).send("User not found")
      }
      if(await bcrypt.compare(req.body.password, user.password)){
          const token = jwt.sign(user.id,process.env.ACCESS_TOKEN_SECRET)
          res.status(200).json({accessToken: token})
      }
    }catch(err){
        res.status(500).json({
            status:"Fail",
            message:err.message
        })
    }
};

exports.signUp = async(req, res, next) => {
    try {
        const newUSer = await UserModel.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password,
          confirmPassword: req.body.confirmPassword,
          gender: req.body.gender,
        });
        if (newUSer) {
          res.status(201).json(newUSer);
        }
      } catch (err) {
        res.status(400).json({
          status: "Fail",
          message: err.message,
        });
      }
};

exports.authenticateToken = async (req,res,next)=>{
    let token ; 
    if( req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer')){
        token = req.headers['authorization'].split(' ')[1]
    }
    if(!token){
        return next("you are not allowed to use this resource!")
    }
    const decodedData = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    const user = await UserModel.findById({_id: decodedData})
    req.user = user
    next()
}