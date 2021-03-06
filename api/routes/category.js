
const express = require('express')
const router = express.Router()

const {create,categoryById,read,update,remove,list,CategoriesandDeliveries} = require('../controllers/category')
const{requireSignin,isAdmin,isAuth} = require('../controllers/auth')
const{userById} = require('../controllers/user')

router.put('/category/:categoryId/:userId',requireSignin,isAdmin,isAuth,update) 
router.post('/category/create/:userId',requireSignin,isAdmin,isAuth,create) 
router.delete('/category/:categoryId/:userId',requireSignin,isAdmin,isAuth,remove) 
router.get('/category/:categoryId',read) 
router.get('/categories',list) 
router.get('/categories_and_deliveries',CategoriesandDeliveries) 

router.param('userId',userById)
router.param('categoryId',categoryById)

module.exports = router