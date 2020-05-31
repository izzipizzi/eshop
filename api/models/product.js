const mongoose = require('mongoose')
const{ObjectId} = mongoose.Schema

//при ств схем в бд не юзти стрілкові функціїї 
const productSchema = new mongoose.Schema({
    name :{
        type: String,
        trim: true,
        required : true,
        maxLength :32
    },
    description :{
        type: String,
        required : true
    },
    price :{
        type :Number,
        trim: true,
        required :true
    },
    category :{
        type :ObjectId,
        ref: 'Category',
        required : true
    },
    manufacturer:{
        type:ObjectId,
        ref : "Manufacturer",
        required : true
    },
    quantity :{
        type : Number
    },
    sold :{
        type : Number,
        default : 0
    },
    photo:{
        data : Buffer,
        contentType : String
    },
    shipping:{
        type :ObjectId,
        ref: 'Delivery',
        required : true
    }
  
    
},
{timestamps:true}
)


module.exports = mongoose.model('Product',productSchema)