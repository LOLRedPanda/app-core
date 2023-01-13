require('dotenv').config()
const swaggerUi = require('swagger-ui-express'),
	swaggerDocument = require('./swagger.json')
const express = require('express')
const { Routes } = require('./src/routes')

const app = express()
const port = process.env.PORT || 3000
const apiURL = process.env.API_URL

Routes(app)

app.use(
	'/api-docs',
	swaggerUi.serve,
	swaggerUi.setup(swaggerDocument, null, null, null, null, apiURL)
)

app.listen(port, () => {
	console.log(`listening on port ${port}`)
})







