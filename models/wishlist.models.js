const mongoose = require('mongoose')

const WishlistSchema = new mongoose.Schema({


    product: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Product'
    }
})

const Wishlist = mongoose.model("Wishlist", WishlistSchema)

module.exports = Wishlist