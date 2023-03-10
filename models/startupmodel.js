const mongoose = require('mongoose')

const startup_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type_of_company: {
        type: String
    },
    est_year: {
        type: Number
    },
    revenue_of_last_year: {
        type: Number
    },
    video_link: {
        type: String
    },
    evaluation_of_last_year: {
        type: String
    },
    founder: {
        type: String
    },
    co_founder: {
        type: String
    },
    location: {
        type: String
    },
    ask_money: {
        type: Number
    },
    give_equity: {
        type: Number
    },
    leaderboard: {
        type: Array
    },
    isstart: {
        type:Boolean
    },
    email: {
        type:String
    },
    password: {
        type:String
    },
    Role: {
        type:String
    }
})
const startup_model = mongoose.model('startup', startup_schema)
module.exports = startup_model;