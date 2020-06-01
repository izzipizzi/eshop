const Category = require('../models/category')
const Delivery = require('../models/delivery')
const {errorHandler} = require('../helpers/dbErrorHandler')
exports.create = (req,res)=>{
    const category = new Category(req.body)

    category.save((err,data)=>{
        if(err){
            return res.status(400).json({
                err : errorHandler(err) + "Не може бути 2 однакові категорії"
            })
        }
        res.json({data,msg:'Успішно добавлено категорію'})
    })

}
exports.categoryById = (req,res,next,id)=>{
    Category.findById(id).exec((err,category)=>{
        if(err|| !category){
            return res.status(400).json({
                err : "Такої категорії не існує"
            })
        }
        req.category = category
        next();
    })
}
exports.read =(req,res)=>{
    return res.json(req.category)
}
exports.remove = (req,res)=>{
    const category = req.category
    category.remove((err,data)=>{
        if (err) {
            return res.status(400).json({
                err : errorHandler(err)
            })
        }
        res.json({"msg":"Успішно видалено категорію"})
    })

}
exports.update = (req,res)=>{
    const category = req.category
    category.name = req.body.name
    category.save((err,data)=>{
        if (err) {
            return res.status(400).json({
                err : errorHandler(err)
            })
        }
        res.json(data)
    })
}
exports.list=(req,res)=>{
    Category.find().exec((err,data)=>{
        if (err) {
            return res.status(400).json({
                err : errorHandler(err)
            })
        }
    
        res.json(data)
    })

}

exports.CategoriesandDeliveries =(req,res)=>{
    Category.find().exec((err,categories)=>{
        if (err) {
            return res.status(400).json({
                err : errorHandler(err)
            })
        }
        // let delivery;
        Delivery.find().exec((err,deliveries)=>{
            if (err) {
                return res.status(400).json({
                    err : errorHandler(err)
                })
            }
            res.json({deliveries,categories})
             
        })
    
      
    })
}