const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config({path:'./config.env'})

/* Routes*/
const userRouter = require('./routes/userRoutes')
const todoRouter = require('./routes/todoRoutes')

const app = express()

app.use(express.json())


/* Routes*/
app.use('/api/v1/todos', todoRouter)
app.use('/api/v1/', userRouter)

app.use((err,req,res,next)=>{
    if(err){
        res.status(400).send({
            message:err
        })
    }

})

const DB = process.env.DB_URL
mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(con=>{
    //info about the connection
    // console.log(con.connections);
    console.log('Connection successfully with atlas!');
})

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log("Connected on PORT: ", PORT)
})