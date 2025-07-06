var mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    itemDescription: {
        type: String,
        required: true,
    },
    itemPerDayPrice: {
        type: Number,
        required: true,
    },
    itemImage: {
        type: String,
        required: true,
    },
    itemCategory: {
        type: String,
        required: true,
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model('item', itemSchema);