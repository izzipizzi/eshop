//server
const express = require ('express')
//mogoDB
const mongoose = require('mongoose')

const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
//import routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const deliveryRoutes = require('./routes/delivery')
const manufacturerRoutes = require('./routes/manufacturer')


const app = express()
app.use(cors())


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
app.use(expressValidator())
//-------МАРШРУТИ------------//Route Middleware
app.use('/api',authRoutes)
app.use('/api',userRoutes)
app.use('/api',categoryRoutes)
app.use('/api',productRoutes)
app.use('/api',deliveryRoutes)
app.use('/api',manufacturerRoutes)

//---------------------------


const port = process.env.PORT || 8000


app.listen(port,()=>{
    console.log(`API started at...${port}`)
})