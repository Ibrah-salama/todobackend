const TodoModel = require('./../models/todo')

exports.getTodos = async (req,res,next)=>{
    console.log(req.user)
    const todos = await TodoModel.find({user: req.user.id})
    res.status(200).json({
        todos
    })
}

exports.addTodo = async (req,res,next)=>{
    try{
        const todo = await TodoModel.create({
            title: req.body.title,
            user: req.body.user
        })
        if(todo){
            res.status(201).json(todo)
        }
    }catch(err){
        res.status(400).json({
            status:"Fail",
            message: err.message
        })
    }
}

exports.getTodo = async (req,res,next)=>{
    const { id } = req.params
    const userId = req.user.id
    try{
        const todo = await TodoModel.findById(id)
        if(todo){
            res.status(200).json(todo)
        }
    }catch(err){
        res.status(400).json({
            status:"Fail",
            message:err.message
        })
    }
}

exports.deleteTodo = async(req,res,next)=>{
    const { id } = req.params
    try{
        const todo = await TodoModel.findByIdAndDelete(id)
        if(todo){
            res.status(204).json(todo)
        }
    }catch(err){
        res.status(400).json({
            status:"Fail",
            message:err.message
        })
    }
}


exports.editTodo = async(req,res,next)=>{
    const { id } = req.params
    try{
        const todo = await TodoModel.findByIdAndUpdate(id,{
            title: req.body.title,
            completed: req.body.completed 
        },{new: true})
        console.log(todo)
        if(todo){
            res.status(200).json(todo)
        }
    }catch(err){
        res.status(400).json({
            status:"Fail",
            message:err.message
        })
    }
}

