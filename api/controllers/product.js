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
                err: 'Ця картинка не може бути загружена'
            })
        }
        // check fields
        const{name,description,price,category,quantity,shipping} = fields
        if(!name || !description || !price || !category ||! quantity ||! shipping){
            return res.status(400).json({
                err: 'Всі поля мають бути заповнені'
            })
        }

        let product = new Product(fields)
        // 1kb =1000
        //1 mb == 1000000
        if(files.photo){
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    err: 'Максимальний розмір картинки 1 мегабайт.'
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
            res.json(result)
        })
    })

}
exports.productById =(req,res,next,id)=>{
    Product.findById(id).exec((err,product)=>{
        if (err || !product) {
            return res.status(400).json({
                err : "Товар  не знайдено"
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
                err : errorHandler(err)
            })
        }
        res.json({
            "msg" : "Успішно видалено"
        })
    })
}