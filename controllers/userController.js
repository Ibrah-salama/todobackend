const UserModel = require('./../models/user')
const users = [ 
    { id:1 , name:"Ahmed" ,},
    { id:2 , name:"Ibrahim" },
    { id:3 , name:"Alaa" },
]
exports.getUsers = (req,res,next)=>{
    res.status(200).json({
        users
    })
}