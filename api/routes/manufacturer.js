
const express = require('express')
const router = express.Router()

const {create,manufacturerById,read,update,remove,list} = require('../controllers/manufacturer')
const{requireSignin,isAdmin,isAuth} = require('../controllers/auth')
const{userById} = require('../controllers/user')

router.put('/manufacturer/:manufacturerId/:userId',requireSignin,isAdmin,isAuth,update) 
router.post('/manufacturer/create/:userId',requireSignin,isAdmin,isAuth,create) 
router.delete('/manufacturer/:manufacturerId/:userId',requireSignin,isAdmin,isAuth,remove) 
router.get('/manufacturer/:manufacturerId',read) 
router.get('/manufactures',list) 

router.param('userId',userById)
router.param('manufacturerId',manufacturerById)

module.exports = router