const express = require('express')
const Router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

// signup api
Router.post('/signup',async(req,res)=>{
    try
    {
        console.log(req.body)
        const user = await User.find({email:req.body.email})
        if(user.length > 0)
        {
           return  res.status(200).json({
            error:'email already registered...'
           })
        }
        const hash = await bcrypt.hash(req.body.password,10)
        console.log(hash)
        const newUser = new User({
            fullName:req.body.fullName,
            email:req.body.email,
            phone:req.body.phone,
            password:hash
        })

        const result = await newUser.save()
        res.status(200).json({
            msg:"account created",
            data:{
                fullName:result.fullName,
                email:result.email,
                phone:result.phone
            }
        })

    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({
            error:err
        })
    }
})


module.exports = Router