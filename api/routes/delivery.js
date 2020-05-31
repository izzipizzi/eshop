
const express = require('express')
const router = express.Router()

const {create,deliveryById,read,update,remove,list} = require('../controllers/delivery')
const{requireSignin,isAdmin,isAuth} = require('../controllers/auth')
const{userById} = require('../controllers/user')

router.put('/delivery/:deliveryId/:userId',requireSignin,isAdmin,isAuth,update) 
router.post('/delivery/create/:userId',requireSignin,isAdmin,isAuth,create) 
router.delete('/delivery/:deliveryId/:userId',requireSignin,isAdmin,isAuth,remove) 
router.get('/delivery/:deliveryId',read) 
router.get('/deliveries',list) 

router.param('userId',userById)
router.param('deliveryId',deliveryById)

module.exports = router