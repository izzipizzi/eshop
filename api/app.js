//server
const express = require ('express')
//mogoDB
const mongoose = require('mongoose')

//import routes

const userRoutes = require('./routes/user')

const app = express()

//підключаю конфіг
require("dotenv").config()

//DB
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser : true,
    useCreateIndex: true,
    useUnifiedTopology :true

}).then(()=>{
    console.log(`He-he ....\nDB connected`)
})

//-------МАРШРУТИ------------//Route Middleware
app.use('/api',userRoutes)

//---------------------------


const port = process.env.PORT || 8000


app.listen(port,()=>{
    console.log(`API started at...${port}`)
})