var mongoose = require('mongoose');

const vendorSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    phoneNo: Number,
    password: String
})

module.exports = mongoose.model('vendor', vendorSchema)

