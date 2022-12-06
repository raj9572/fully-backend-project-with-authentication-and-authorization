const mongoose = require('mongoose')
const bcrypt= require('bcryptjs')
var jwt = require('jsonwebtoken');



const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    phone: {
        type: Number,
        required: true,
        unique:true

    },
    gender: {
        type: String,
        required: true,

    },
    age: {
        type: Number,
        required: true,
        
    },
    password: {
        type: String,
        required: true
    },
    cnfpassword: {
        type: String,
        required: true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
});



// middleware of generating the jwt

UserSchema.methods.generateAuthToken = async function(){
    try {
        const token = await jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        return token
    } catch (error) {
        res.send('generate token error is '+error)
    }
}







// middleware of converting the password into hash
UserSchema.pre("save",async function(next){
try {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
        this.cnfpassword= await bcrypt.hash(this.cnfpassword,10);
    }
    next();
} catch (error) {
    res.send(error)
}
    
})


const Register = mongoose.model('formData', UserSchema);

module.exports = Register;