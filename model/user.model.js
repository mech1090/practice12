const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        require:true
    }
},
{
    collection:'Practice12 User'
})

const User = mongoose.model('User',userSchema)

module.exports = User


