const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      default: "Generic",
    },
    price: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
    },
    discountPercentage: {
      type: Number,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    image: {
      type: String,
      required: true,
      default: "https://placehold.co/600x400?text=Dressified",
    },
    sizes: [
      {
        type: String,
        enum: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
      },
    ],
    description: [
      {
        type: String,
      },
    ],

     inStock: {
    type: Boolean,
    default: true
  },
   
   // Reference to section like "Mens", "Womens", "Kids"
  section: {
    type: String,
    enum: ["Mens", "Womens", "Kids"],
    required: true
  },

  // Category name like "T-Shirts", "Jeans", etc.
  category: {
    type: String,
    required: true,
    enum: ["Shirts","T-shirts","Shorts","Bottoms","Jackets","Sneakers","Tops","Dress","Kurta","Pants","Pyjamas","Joggers","Trousers","Flipflops"]
  },

  
  },

  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
