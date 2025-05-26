const Product=require('../model/Product')

const addProduct=async(req,res)=>{
    try {
        let products=await Product.find({})   
        let id
        if(products.length>0) {
            last_product_array=products.slice(-1)
            last_product=last_product_array[0]
            id=last_product.id+1
        }else{
            id=1
        }
        const product=await Product.create({
            productId:id,
            name:req.body.name,
            image:req.body.image,
            category:req.body.category,
            new_price:req.body.new_price,
            old_price:req.body.old_price
        })
        console.log(product)
        return res.status(200).json({
            success:1,
            name:req.body.name
        })
    } catch (error) {
        res.json({error})
    }
}

module.exports={addProduct}