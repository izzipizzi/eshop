const mongoose = require('mongoose')
const crypto = require('crypto')
const uuidv1 = require('uuid/v1')

//при ств схем в бд не юзти стрілкові функціїї 
const userSchema = new mongoose.Schema({
    name :{
        type: String,
        trim: true,
        required : true,
        maxLength :32
    },
    email :{
        type: String,
        trim: true,
        required : true,
        maxLength :32
    },
    hashed_password :{
        type: String,
        required : true
    },
    about:{
        type: String,
        trim: true        
    },
    salt : String,
    role:{
        type: Number,
        default: 0
    },
    history:{
        type : Array,
        default:[]
    }
},
{timestamps:true}
)

//Віртуальне поле?
userSchema.virtual('password')
.get(function(){
    return this._password
})
.set(function(password){
    this._password = password
    this.salt =uuidv1()
    this.hashed_password = this.encryptPassword(password)

})

userSchema.methods.encryptPassword = function(password){
        if(!password) return ''
        try {
            return crypto.createHmac('sha1',this.salt)
            .update(password)
            .digest('hex')
        } catch (error) {
            return ''
        }
    
}

module.exports = mongoose.model('User',userSchema)