const express = require('express')
const cors = require('cors') // Cross-Origin Resource Sharing MY project has two different servers: Frontend & Backend
const authRoutes = require('./routes/authRoutes')
const app = express()

app.use(cors()) // This allows the frontend to call the backend API.
app.use(express.json())

app.use('/api/auth', authRoutes)

module.exports = app 