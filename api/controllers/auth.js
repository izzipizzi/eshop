const User = require('../models/user')
const {errorHandler} = require('../helpers/dbErrorHandler')
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')
require('dotenv').config()
// реєстрація
exports.signup = (req,res)=>{
    const user = new User(req.body)
    user.save((err,user)=>{
        if (err) {
            return res.status(400).json({
                err : errorHandler(err)
            })
        }
        //щоб надіслати безпечні данні
        user.salt = undefined
        user.hashed_password = undefined
        
        res.json({
            user
        })
    })
}
// авторизація
exports.signin = (req,res)=>{
    //шукаю юзера по Email
    const{email,password} = req.body
    User.findOne({email},(err,user)=>{
        if (err || !user) {
            return res.status(400).json({
                err:"Користувача з таким email не існує.Будь-ласка зареєструйтесь"
            })

        }
        //перевірка мейла і пароля
        if (!user.authenticate(password)) {
            return res.status(401).json({
                err : "Пошта і пароль не співпадають"
            })
        }
        
        //генерую вебтокен з юзер_ід
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)
        //надсилаю токен в куки
        res.cookie('token',token,{expire: new Date()+1000})
        //деструктурую юзера якого знайшло в бд
        const{_id,name,email,role} = user
        //надсилаю респонс на фронт
        return res.json({token,user:{_id,email,name,role}})
    })
}
const secret  = {
    secret : process.env.JWT_SECRET,
    userProperty : "auth"
}
exports.signout =(req,res)=>{
    res.clearCookie('token')
    res.json({msg:"Успішно деавторизовано"})
}


exports.requireSignin = expressJWT(secret)