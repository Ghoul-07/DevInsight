const express = require("express")
const githubController = require('../controllers/github.controller')
const leetcodeController = require('../controllers/leetcode.controller')
const combinedController = require('../controllers/combinedCompare.controller')

const router = express.Router()

router.post('/github', githubController.githubCompareController)
router.post('/leetcode', leetcodeController.leetcodeCompareController)
router.post('/combined', combinedController.combinedCompareController)

module.exports = router
