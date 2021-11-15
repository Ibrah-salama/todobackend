const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    title: { type:String , minLength: 3 , required:[true, "Todo must has a title"]}, 
    completed:{ type:Boolean , default:false},
    user: { type:mongoose.Schema.ObjectId , ref:'User' , required:[true, "each todo must has user"]}
})

const TodoModel = mongoose.model('Todo', todoSchema)

module.exports = TodoModel