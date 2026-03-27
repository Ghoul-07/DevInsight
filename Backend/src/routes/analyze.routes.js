const express = require('express')
const analyzeController = require('../controllers/analyze.controller')

const router = express.Router()

router.get('/:username', analyzeController.createAnalyzeController)

module.exports = router
