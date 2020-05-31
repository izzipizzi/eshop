
const express = require('express')
const router = express.Router()

const {create} = require('../controllers/product')
const{requireSignin,isAdmin,isAuth} = require('../controllers/auth')
const{userById} = require('../controllers/user')
const {categoryById} = require ('../controllers/category')
const {manufacturerById} = require ('../controllers/manufacturer')
const{productMin,productMax,productById,read,remove,photo,update,randomProduct,listBySearch,list,listRelated,manufactureRelated,listCategories,productSetList,productByManufacturer} = require('../controllers/product')

const {productFormValidator} = require ('../validator/index')

router.post('/product/create/:userId',requireSignin,isAdmin,isAuth,create) 
router.get('/product/:productId',read)

router.get('/random/product',randomProduct)

router.get('/products',list)

router.get('/products_set/:manufacturerId',productSetList)

router.delete('/product/:productId/:userId',requireSignin,isAuth,isAdmin,remove)
router.put('/product/:productId/:userId',requireSignin,isAuth,isAdmin,update)

router.post('/products/by/search',listBySearch)

router.get('/products/related/:productId',listRelated)

router.get('/products/manufacturer/related/:productId',manufactureRelated)

router.get('/products/categories',listCategories)

router.get('/products/manufacturer/:manufacturerId',productByManufacturer)

router.get('/products/photo/:productId',photo)


router.get('/products/min_price',productMin)
router.get('/products/max_price',productMax)


router.param('userId',userById)
router.param('productId',productById)
router.param('manufacturerId',manufacturerById)

module.exports = router