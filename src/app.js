require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
require('./db/conn')
const port = process.env.PORT || 8000
const hbs = require('hbs')
const Router = require('./router/router')
const cookieParser = require('cookie-parser')



const static_path = path.join(__dirname, '../public')
// console.log(path.join(__dirname, '../public'));
app.use(express.static(static_path))



app.set('view engine', 'hbs')
const view_path = path.join(__dirname, '../templates/views')
// console.log(path.join(__dirname,'./templates/views'));
app.set('views', view_path)


const partialpath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialpath)

app.use(cookieParser())
app.use(express.urlencoded())
app.use(express.json())
app.use(Router)


// const token = await formData.generateAuthToken();
//         console.log('register token part is '+token);


// const token = await verifyEmail.generateAuthToken();
//       console.log('login token part is'+token);


// UserSchema.methods.generateAuthToken = async function(){
  //     try {
  
  //         const token = await jwt.sign({_id:this.id.toString()},"mynameissafiullahansariiamfromharihans")
  //         this.tokens = this.tokens.concat({token:token})
  //         await this.save();
  //         return token
  //     } catch (error) {
  //         res.send('the error part is '+error) 
  //     }
  // }



  // userSchema.methods.generateAuthTokens = async function(){
    // const token = await jwt.sign({_id:this._id.toString()},"thisismyfamilyplantogosomewhare")
//this.tokens = this.tokens.concat({token:token})
// await this.save();
// return tokens;
// }
// 
//generate hashing passsword
// userSchema.pre("save",async function(next){
  // this.password = await bcrypt.hash(this.password,10)
// this.cngpassword = await bcrypt.hash(this.cngpassword,10)
// next();
// })
// 
// 
// 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})