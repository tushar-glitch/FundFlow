const mongoose = require('mongoose')

const startup_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type_of_company: {
        type: String,
        required: true
    },
    est_year: {
        type: Number,
        required:true
    },
    revenue_of_last_year: {
        type: Number,
        required: true
    },
    video_link: {
        type: String,
        required:true
    },
    evaluation_of_last_year: {
        type: String,
        required:true
    },
    founder: {
        type: String,
        required:true
    },
    co_founder: {
        type: String,
        required:true
    },
    location: {
        type: String,
        required:true
    },
    ask_money: {
        type: Number,
        required:true
    },
    give_equity: {
        type: Number,
        required:true
    }
})
const startup_model = mongoose.model('startup', startup_schema)
module.exports = startup_model;