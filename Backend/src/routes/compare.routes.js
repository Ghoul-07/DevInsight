const express = require("express")
const compareController = require('../controllers/compare.controller')

const router = express.Router()

router.post('/', compareController.createCompareController)

module.exports = router