const express = require("express");
const route = express.Router();
const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "CRUDAPI"

// route.get('/', (req, res) => {
//     return res.send("route working")
// })

route.post('/signup', async (req, res) => {
    try {
        const { firstname, lastname, email, password, phone, gender, country } = req.body
        if (!firstname || !lastname || !email || !password || !phone || !gender || !country) {
            return res.json({
                error: "Please add all the fields"
            })
        }
        if(!email.match(/^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)){
            return res.json({
                error : "Please enter proper email address"
            })
        }
        if(password.length < 6){
            return res.json({
                error : "Password should have minimum length of 6"
            })
        }
        if(phone.length < 10){
            return res.json({
                error : "Phone no should be minimum of 10 numbers"
            })
        }
        if(phone.length > 12){
            return res.json({
                error : "Phone no should be maximmum of 12 numbers"
            })
        }
        if(isNaN(phone)){
            return res.json({
                error : "Please enter numbers only in mobile no field"
            })
        }
        const user_obj = await user.findOne({ email })
        if(user_obj){
            return res.json({
                error : "User already exist"
            })
        }
        const user_mob = await user.findOne({ phone })
        if(user_mob){
            return res.json({
                error : "Mobile number already registered"
            })
        }
        bcrypt.hash(password, 12, async (err, hash)=>{
            if(err){
                return res.json({
                    error : err.message
                })
            }
            const user_data = await user.create({
                firstname,
                lastname,
                email,
                password : hash,
                phone,
                gender,
                country
            })
            return res.json({
                message : "successfully registered",
                user_data
            })
        })
    }catch(e){
        return res.status(400).json({
            error : e.message
        })
    }
})

route.post('/signin', async (req, res)=>{
    try{
        const {email, password} = req.body
        console.log(req.body);
        const user_obj = await user.findOne({email})
        if(!user_obj){
            return res.status(404).json({
                error : "User not found"
            })
        }
        bcrypt.compare(password, user_obj.password, (err, result)=>{
            if(err){
                return res.json({
                    error : err.message
                })
            }
            if(result){
                const {_id, email} = user_obj
                const token = jwt.sign({
                    data : user_obj._id
                }, secret)

                return res.json({
                    message : "login successfull",
                    token,
                    user : {_id, email}
                })
            }
            else{
                return res.json({
                    error : "something went wrong"
                })
            }
        })
    }catch(e){
        return res.json({
            error : e.message 
        })
    }
})

module.exports = route