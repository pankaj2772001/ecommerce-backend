const mongoose = require('mongoose')

const AddressSchema = new mongoose.Schema({

    fullName: {

        type: String,
        required: true
    },

    phoneNumber: {

        type: Number,
        required: true

    },

    pincode: {
        type: Number,
        required: true
    },

    add1: {
        type: String,
        required: true
    },

    add2: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    }
})

const Address = mongoose.model("Address", AddressSchema)

module.exports = Address