const mongoose = require('mongoose')

const auth_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required:true
    },
    Role: {
        type: String,
        required: true
    },
    isverified: {
        type: Boolean
    },
    age : {
        type: Number,
    },
    experience : {
        type: Number,
    },
    no_of_companies_funded: {
        type: Number,
    },
    total_money_funded: {
        type: Number,
    },
    startup_name: {
        type:String
    }
})
const auth_Model = mongoose.model('users', auth_schema)
module.exports = auth_Model;