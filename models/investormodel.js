const mongoose = require('mongoose')

const investor_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age : {
        type: Number,
        required: true
    },
    experience : {
        type: Number,
        required:true
    },
    no_of_companies_funded: {
        type: Number,
        required: true
    },
    total_money_funded: {
        type: Number,
        required: true
    }
})
const investor_model = mongoose.model('users', investor_schema)
module.exports = investor_model;