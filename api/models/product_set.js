const mongoose = require('mongoose')
const{ObjectId} = mongoose.Schema

//при ств схем в бд не юзти стрілкові функціїї 
const productSetSchema = new mongoose.Schema({
    name :{
        type: String,
        trim: true,
        required : true,
        maxLength :32
    },  
    products:[{
        type :ObjectId,
        ref: 'Product',
        required : true
    }],
    
    price :{
        type : Number
    }
    
},
{timestamps:true}
)


module.exports = mongoose.model('ProductSet',productSetSchema)