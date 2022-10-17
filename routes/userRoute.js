const express = require('express')
const router = express.Router()
const User = require('../models/user')

// Register API
router.post('/register', async(req, res) =>{

    const newuser = new User({

        // we can use req.body directly 
        name: req.body.name,
        email: req.body.email,
        password: req.body.password

    })

    try {
        const user = await newuser.save()
        res.send('User Registered Successfully')
    } catch (error) {
        return res.status(400).json({error})
    }
});


// Login API
router.post('/login', async(req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email: email , password: password})
        if(user){
            const temp = {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                _id: user._id
            }
            res.send(temp)
        }
        else{
            return res.status(400).json({ message: 'Login Faield' })
        }
    } catch (error) {
        return res.status(400).json({error})
    }
});


// getAllUsers
router.get('/getAllUsers', async(req, res)=> {
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        return res.status(400).json({error})
    }
})
module.exports = router


























