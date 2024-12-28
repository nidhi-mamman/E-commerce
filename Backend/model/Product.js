const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  productId: {
    type: Number,
    unique:true
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  stock: {
    type: Boolean,
    default: true,
  }
});

module.exports=new mongoose.model('Product',ProductSchema)