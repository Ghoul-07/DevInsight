const express = require('express')
const axios = require('axios')
const cors = require('cors')
const analyzeRoutes = require('./routes/analyze.routes')
const compareRoutes = require('./routes/compare.routes')


const app = express()

app.use(express.json())
app.use(cors())


app.use('/api/analyze', analyzeRoutes)
app.use('/api/compare', compareRoutes)


module.exports = app
