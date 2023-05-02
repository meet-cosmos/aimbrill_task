const express = require("express");
const products = require("../models/product")
const protectedRoute = require("../middlewares/requireLogin")
const route = express.Router()

route.get('/', protectedRoute, async (req, res) => {
    res.send("user is authenticated")
})

route.post('/createproduct', protectedRoute, async (req, res) => {
    try {
        const { name, price, category} = req.body
        if(!name || !price || !category){
            return res.json({
                error : "Please add all the fields"
            })
        }
        const product_data = await products.create({
            name,
            price,
            category,
            user: req.user
        })
        return res.json({
            message: "Product added successfully",
            product_data
        })
    }catch(e){
        return res.status(400).json({
            error : e.message
        })
    }
})

route.get('/getproducts', protectedRoute, async (req, res)=>{
    let product_data = await products.find({user : req.user});
    if(product_data.length > 0){
        return res.send(
            product_data)
    }else{
        return res.send({error : "No record found"})
    }
})

route.delete('/product/:id', protectedRoute, async (req, res)=>{
    const product_data = await products.deleteOne({_id : req.params.id})
    res.send(product_data)
})

route.get('/product/:id', protectedRoute, async (req, res)=>{
    const product_data = await products.findOne({_id : req.params.id})
    if(product_data){
        return res.send(product_data)
    }else{
        return res.send({error : "No record found"})
    }
})

route.put('/product/:id', protectedRoute, async (req, res)=>{
    try{
        let product_data = await products.updateOne({_id : req.params.id}, {$set : req.body})
        return res.send(product_data)
    }catch(e){
        return res.send({error : "Sorry can't update"})
    }
})

module.exports = route;