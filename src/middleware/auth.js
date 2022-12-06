const jwt = require('jsonwebtoken')
const Register = require('../models/model')

const auth = async (req,res,next)=>{
try {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token,process.env.SECRET_KEY);
    console.log(verifyUser);
    const userData = await Register.findOne({_id:verifyUser._id})
    console.log(userData.email);

    req.token = token
    req.user = userData
    
     next()


} catch (error) {
    res.status(400).send(error)
}
}

module.exports=auth