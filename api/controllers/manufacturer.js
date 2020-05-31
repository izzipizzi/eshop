const Manufacturer = require('../models/manufacturer')
const {errorHandler} = require('../helpers/dbErrorHandler')

exports.create = (req,res)=>{
    const manufacturer = new Manufacturer(req.body)

    manufacturer.save((err,data)=>{
        if(err){
            return res.status(400).json({
                err : errorHandler(err) + "Не може бути 2 однакових виробника"
            })
        }
        res.json({data,msg:'Успішно добавлено виробника'})
    })

}
exports.manufacturerById = (req,res,next,id)=>{
    Manufacturer.findById(id).exec((err,manufacturer)=>{
        if(err|| !manufacturer){
            return res.status(400).json({
                err : "Такого виробника не існує"
            })
        }
        req.manufacturer = manufacturer
        next();
    })
}
exports.read =(req,res)=>{
    return res.json(req.manufacturer)
}
exports.remove = (req,res)=>{
    const manufacturer = req.manufacturer
    manufacturer.remove((err,data)=>{
        if (err) {
            return res.status(400).json({
                err : errorHandler(err)
            })
        }
        res.json({"msg":"Успішно видалено виробника"})
    })

}
exports.update = (req,res)=>{
    const manufacturer = req.manufacturer
    manufacturer.name = req.body.name
    manufacturer.save((err,data)=>{
        if (err) {
            return res.status(400).json({
                err : errorHandler(err)
            })
        }
        res.json(data)
    })
}
exports.list=(req,res)=>{
    Manufacturer.find().exec((err,manufactures)=>{
        if (err) {
            return res.status(400).json({
                err : errorHandler(err)
            })
        }
    
        res.json(manufactures)
    })

}