const Delivery = require('../models/delivery')
const {errorHandler} = require('../helpers/dbErrorHandler')
exports.create = (req,res)=>{
    const delivery = new Delivery(req.body)

    delivery.save((err,data)=>{
        if(err){
            return res.status(400).json({
                err : errorHandler(err) + "Не може бути 2 однакові доставки"
            })
        }
        res.json({data,msg:'Успішно добавлено доставку'})
    })

}
exports.deliveryById = (req,res,next,id)=>{
    Delivery.findById(id).exec((err,delivery)=>{
        if(err|| !delivery){
            return res.status(400).json({
                err : "Такої служби доставки не існує"
            })
        }
        req.delivery = delivery
        next();
    })
}
exports.read =(req,res)=>{
    return res.json(req.delivery)
}
exports.remove = (req,res)=>{
    const delivery = req.delivery
    delivery.remove((err,data)=>{
        if (err) {
            return res.status(400).json({
                err : errorHandler(err)
            })
        }
        res.json({"msg":"Успішно видалено доставку"})
    })

}
exports.update = (req,res)=>{
    const delivery = req.delivery
    delivery.name = req.body.name
    delivery.save((err,data)=>{
        if (err) {
            return res.status(400).json({
                err : errorHandler(err)
            })
        }
        res.json(data)
    })
}
exports.list=(req,res)=>{
    Delivery.find().exec((err,data)=>{
        if (err) {
            return res.status(400).json({
                err : errorHandler(err)
            })
        }
    
        res.json(data)
    })

}