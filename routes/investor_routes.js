const express = require('express')
const investorController = require('../controllers/investorController')
const route = express.Router()

route.patch('/patch',investorController.patch_investor)
route.get('/get',investorController.get_investor)

module.exports = route