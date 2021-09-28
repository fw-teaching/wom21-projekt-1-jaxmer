const mongoose = require('mongoose'),
    cabinSchema = new mongoose.Schema({
        address: {
            type: String,
            required: true
        },
        size: {
            type: Number,
            required: true
        },
        sauna: {
            type: Boolean,
            required: true
        },
        beach: {
            type: Boolean,
            required: true
        },
        rent: {
            type: Number,
            required: true
        },
    }, { timestamps: true })

module.exports = mongoose.model('Cabins', cabinSchema)