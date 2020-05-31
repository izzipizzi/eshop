
const express = require('express')
const router = express.Router()

const {signup,signin,signout,requireSignin,userByToken} = require('../controllers/auth.js')
const{userSignUpValidator} = require('../validator')
 
router.post('/signup',userSignUpValidator,signup) 
router.post('/signin',signin) 
router.get('/signout',signout)
//router.get('/user',userByToken)

router.get('/hello',requireSignin,(req,res)=>{
    res.send("hello kiska")
})


module.exports = router