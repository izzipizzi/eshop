const mongoose = require('mongoose')


//при ств схем в бд не юзти стрілкові функціїї 
const categorySchema = new mongoose.Schema({
    name :{
        type: String,
        trim: true,
        required : true,
        maxLength :32
    }
  
    
},
{timestamps:true}
)


module.exports = mongoose.model('Category',categorySchema)