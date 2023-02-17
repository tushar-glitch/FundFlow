const express = require('express')
const startupController = require('../controllers/startupController')
const route = express.Router()
const verifytoken = require('../middleware/verifytoken')


route.post('/create', verifytoken, startupController.poststartupdetails)
route.get('/get', verifytoken, startupController.getstartupdetails)
route.post('/start_auction', verifytoken, startupController.start_auction)

module.exports = route