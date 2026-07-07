const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({

    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    name:{
        type:String,
        required:true,
    },
    isverified:{
        type:Boolean,
        default:false,
    },
    otp:{
        type:String,
    },
    otpexpiry:{
        type:Date,
    }
})

//middleware for hashing the password
userSchema.pre('save', async function() {
    if(!this.isModified('password')){
        return ;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
})

//method defining to compare the password
userSchema.methods.comparePassword = async function (candidatePassword){
    return await bcrypt.compare(candidatePassword , this.password)
}

const User = mongoose.model("User" , userSchema);

module.exports =  User;