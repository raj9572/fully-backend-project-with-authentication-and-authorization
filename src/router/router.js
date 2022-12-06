const express = require('express')
const router = express.Router()
const Register = require('../models/model')
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth')



router.get('/', (req, res) => {
  res.status(200).render('index')
})
router.get('/about', (req, res) => {
  res.render('about')
})
router.get('/secret',auth, (req, res) => {
// console.log(` this is the cookies awesome ${req.cookies.jwt}`);

  res.render('secret')
})

router.get('/register', (req, res) => {
  res.render('contact')
})

router.get('/login', (req, res) => {
  res.render('login')
})
router.get('/logout',auth,async (req, res) => {
   try {
    // for single logout
    // req.user.tokens = req.user.tokens.filter(elem => elem.token !== req.token)


    // logout from all device
    req.user.tokens = [];
    
    res.clearCookie("jwt")
    // console.log("logout successfully");
     await req.user.save()
    res.render('login')
   } catch (error) {
    res.send(error)
   }
})

router.post('/register', async (req, res) => {

  // yaha per express.urlencoded likhna jaruri h
  try {
    if (req.body.password === req.body.cnfpassword) {
      const formData = new Register(req.body)

      const token = await formData.generateAuthToken()
      console.log('registration token part is ' + token);

      res.cookie("jwt", token, {
        // expires:new Date(Date.now() + 3000 )
        httpOnly: true
      })

      const data = await formData.save()
      res.status(201).render('index')

    } else {
      res.send('password didnot match')
    }

  } catch (error) {
    res.status(404).send(error);
  }

})

router.post('/login', async (req, res) => {
  try {
    const userEmail = req.body.email
    const userpassword = req.body.password
    const verifyEmail = await Register.findOne({ email: userEmail })
    const registerpassword = verifyEmail.password

    const verifypassword = await bcrypt.compare(userpassword, registerpassword)

    const token = await verifyEmail.generateAuthToken();
    console.log('login token part is '+token);

    res.cookie("jwt", token, {
      // expires:new Date(Date.now() + 3000 )
        httpOnly: true
    })

    


    if (verifypassword) {
      res.render('index')
    }
    else {
      res.status(400).send("password don't match")
    }
  } catch (error) {
    res.status(500).send('invalid user')
  }

})

router.get('*', (req, res) => {
  res.status(404).render(`<h1>page connot be found</h1>`)
})

module.exports = router;