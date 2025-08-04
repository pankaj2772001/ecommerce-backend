const { default: mongoose } = require('mongoose')
const moongose = require('mongoose')

const OrderSchema = new moongose.Schema({


    cartItems: [{

        type: moongose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    }] ,


    address: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },

    totalAmount: {

        type: Number,
        required: true
    },

    orderDate: {
    type: Date,
    required: true,
  }
})

const Order = mongoose.model("Order", OrderSchema)

module.exports = Order