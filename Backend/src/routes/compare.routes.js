const express = require("express")
const githubController = require('../controllers/github.controller')
const leetcodeController = require('../controllers/leetcode.controller')

const router = express.Router()

router.post('/github', githubController.githubCompareController)
router.post('/leetcode', leetcodeController.leetcodeCompareController)

module.exports = router
