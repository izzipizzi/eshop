
const express = require('express')
const router = express.Router()

const {userById,update,read} = require('../controllers/user.js')
const{requireSignin,isAdmin,isAuth} = require('../controllers/auth')


router.get("/secret/:userId",requireSignin,isAuth,isAdmin,(req,res)=>{
    res.json({
        user : req.profile
    })
})
router.get('/user/:userId',requireSignin,isAuth,read)
router.put('/user/:userId',requireSignin,isAuth,update)

router.param('userId',userById)

module.exports = router