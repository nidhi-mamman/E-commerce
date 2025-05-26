const express=require('express')
const{addProduct}=require('../controllers/product')

const productRouter=express.Router()

productRouter.post('/addProduct',addProduct)

module.exports=productRouter