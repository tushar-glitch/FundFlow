const express = require('express')
const biddingController = require('../controllers/biddingController')
const route = express.Router()
const verifytoken = require('../middleware/verifytoken')

route.post('/postbid',verifytoken, biddingController.postbid)

module.exports = route