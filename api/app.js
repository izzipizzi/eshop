//server
const express = require ('express')
//mogoDB
const mongoose = require('mongoose')

const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
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
//middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
//-------МАРШРУТИ------------//Route Middleware
app.use('/api',userRoutes)

//---------------------------


const port = process.env.PORT || 8000


app.listen(port,()=>{
    console.log(`API started at...${port}`)
})