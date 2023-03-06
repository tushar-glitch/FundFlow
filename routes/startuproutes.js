const express = require('express')
const startupController = require('../controllers/startupController')
const route = express.Router()
const verifytoken = require('../middleware/verifytoken')


route.post('/create', verifytoken, startupController.poststartupdetails)
route.get('/get', verifytoken, startupController.getstartupdetails)
route.get('/get_details', verifytoken, startupController.single_startup_details)
route.post('/start_auction', verifytoken, startupController.start_auction)
route.post('/end_auction', verifytoken, startupController.end_auction)
route.patch('/patch_startup', verifytoken, startupController.patch_startup)

module.exports = route