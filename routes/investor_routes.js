const express = require('express')
const investorController = require('../controllers/investorController')
const route = express.Router()
const verifytoken = require('../middleware/verifytoken')

route.patch('/patch',verifytoken, investorController.patch_investor)
route.get('/get',verifytoken, investorController.get_investor)
route.get('/get_detail',verifytoken, investorController.single_investor_details)

module.exports = route