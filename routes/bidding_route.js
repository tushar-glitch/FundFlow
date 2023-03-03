const express = require('express')
const biddingController = require('../controllers/biddingController')
const route = express.Router()
const verifytoken = require('../middleware/verifytoken')

route.post('/postbid',verifytoken, biddingController.postbid)
route.post('/get_leaderboard',verifytoken, biddingController.get_leaderboard)

module.exports = route