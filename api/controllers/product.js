const formidable = require('formidable')
const fs = require('fs')
const _ = require('lodash')

const Product = require('../models/product')
const {errorHandler} = require('../helpers/dbErrorHandler')
exports.create = (req,res)=>{
    let form = new formidable.IncomingForm()


    form.keepExtensions = true

    form.parse(req,(err,fields,files)=>{
        if(err){
            return res.status(400).json({
                error: 'Ця картинка не може бути загружена'
            })
        }
        // check fields
        const{name,description,price,category,quantity,shipping} = fields
        if(!name || !description || !price || !category ||! quantity ||! shipping){
            return res.status(400).json({
                error: 'Всі поля мають бути заповнені'
            })
        }

        let product = new Product(fields)
        // 1kb =1000
        //1 mb == 1000000
        if(files.photo){
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Максимальний розмір картинки 1 мегабайт.'
                })
                
            }
            console.log('files_phot ',files.photo)
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }
        product.save((err,result)=>{
            if (err) {
                return res.status(400).json({
                    error : err.message
                })
            }
            res.json({'msg' : 'Успішно добавленно'})
        })
    })

}
exports.productById =(req,res,next,id)=>{
    Product.findById(id).exec((err,product)=>{
        if (err || !product) {
            return res.status(400).json({
                error : "Товар  не знайдено"
            })
        }
        req.product = product
        next()
    })

}
exports.read = (req,res)=>{
    // фото буде сильно грузити сервер тому потім зроблю метод
    req.product.photo = undefined
    // повертаю продукт без фото
    return res.json(req.product)
}
exports.remove = (req,res)=>{
    let product = req.product
    product.remove((err,deletedProduct)=>{
        if (err) {
            return res.status(400).json({
                error : errorHandler(err)
            })
        }
        res.json({
            "msg" : "Успішно видалено"
        })
    })
}
exports.update =(req,res)=>{
    let form = new formidable.IncomingForm()

    form.keepExtensions = true

    form.parse(req,(err,fields,files)=>{
        if(err){
            return res.status(400).json({
                error: 'Ця картинка не може бути загружена'
            })
        }
        // check fields
        const{name,description,price,category,quantity,shipping} = fields
        if(!name || !description || !price || !category ||! quantity ||! shipping){
            return res.status(400).json({
                error: 'Всі поля мають бути заповнені'
            })
        }

        let product = req.product
        product =_.extend(product,fields)
        // 1kb =1000
        //1 mb == 1000000
        if(files.photo){
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Максимальний розмір картинки 1 мегабайт.'
                })
                
            }
            console.log('files_phot ',files.photo)
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }
        product.save((err,result)=>{
            if (err) {
                return res.status(400).json({
                    err : errorHandler(err)
                })
            }
            res.json({result,"msg":"Продукт успішно оновлено"})
        })
    })
}

//сортування товарів по продажам і по поступленні
//сортую по продажам по спаданню з лімітом видачі 10
//* /products?sortBy=sold&order=desc&limit=10
//сортую по поступленню 
//* /products?sortBY=createdAt&order=desc&limit=10
//якщо не буде параметрів повертає всі продукти
exports.list= (req,res)=>{
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    // .select("-photo") не буде грузити фото з бд щоб не тормозити сайт
    Product.find()
        .select("-photo")
        .populate('category')
        .sort([[sortBy,order]])
        .limit(limit)
        .exec((err,products)=>{
            if(err){
                return res.status(400).json({
                    'msg' : 'Не знайдено продуктів'
                })
            }
            res.json(products)
        })

}
// знаходить продукти в категоріїї ???

exports.listRelated = (req,res)=>{
    let limit = req.query.limit ? parseInt(req.query.limit) : 10

    Product.find({_id:{$ne: req.product},category: req.product.category})
    .limit(limit)
    .populate('categoty','_id  name')
    .exec((err,products)=>{
        if(err){
            return res.status(400).json({
                'msg' : 'Не знайдено продуктів'
            })
        }
        res.json(products)
    })

}
exports.listCategories = (req,res)=>{
    Product.distinct('category',{},(err,categories)=>{
        if(err){
            return res.status(400).json({
                'msg' : 'Не знайдено продуктів'
            })
        }
        res.json(categories)
    })
}

//пошук товарів 
// на фронті будуть чекбокси слайдер з ціною і радіобатони
// кароч фільтрація
exports.listBySearch =(req,res) =>{
    let order = req.body.order ? req.body.order : 'desc'
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id'
    let limit = req.body.limit ? parseInt(req.body.limit) : 100
    let skip = parseInt(req.body.skip)
    let findArgs ={}

    for(let key in req.body.filters){
        if (req.body.filters[key].length > 0) {
            if(key === 'price'){
                findArgs[key] ={
                    //gte greater than- більше ніж ціна
                    //lte less than менше ніж ціня
                    // пошук в ціновій категорії нприклад між 132 - 1000 грн
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }else{
                findArgs[key]= req.body.filters[key]
            }
        }
    }
    Product.find(findArgs)
    .select('-photo')
    .populate('category')
    .sort([[sortBy,order]])
    .skip(skip)
    .limit(limit)
    .exec((err,data)=>{
        if(err){
            //send zamist json
            return res.status(400).json({
                error : "Товари не знайдено"
            })
        }
        res.json({
            size:data.length,
            data
        })
    })
}
exports.photo =(req,res,next)=>{
    if (req.product.photo.data) {
        res.set('Content-Type',req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next();
}