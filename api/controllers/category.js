const Category = require('../models/category')
const {errorHandler} = require('../helpers/dbErrorHandler')
exports.create = (req,res)=>{
    const category = new Category(req.body)

    category.save((err,data)=>{
        if(err){
            return res.status(400).json({
                err : errorHandler(err)
            })
        }
        res.json({data})
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