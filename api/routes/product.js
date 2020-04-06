
const express = require('express')
const router = express.Router()

const {create} = require('../controllers/product')
const{requireSignin,isAdmin,isAuth} = require('../controllers/auth')
const{userById} = require('../controllers/user')
const{productById,read,remove,photo,update,listBySearch,list,listRelated,listCategories} = require('../controllers/product')

router.post('/product/create/:userId',requireSignin,isAdmin,isAuth,create) 
router.get('/product/:productId',read)
router.get('/products',list)
router.delete('/product/:productId/:userId',requireSignin,isAuth,isAdmin,remove)
router.put('/product/:productId/:userId',requireSignin,isAuth,isAdmin,update)

router.post('/products/by/search',listBySearch)
router.get('/products/related/:productId',listRelated)
router.get('/products/categories',listCategories)
router.get('/products/photo/:productId',photo)


router.param('userId',userById)
router.param('productId',productById)

module.exports = router