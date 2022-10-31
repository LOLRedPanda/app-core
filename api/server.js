require('dotenv').config()
const express = require('express')
const { Routes } = require('./src/routes')

const app = express()
const port = 3000

Routes(app)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})







