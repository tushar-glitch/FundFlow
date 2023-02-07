const express = require('express')
const startupController = require('../controllers/startupController')
const route = express.Router()

route.post('/create',startupController.poststartupdetails)
route.get('/get',startupController.getstartupdetails)

module.exports = route