require('dotenv').config()
const swaggerUi = require('swagger-ui-express'),
	swaggerDocument = require('./swagger.json')
const express = require('express')
const { Routes } = require('./src/routes')

const app = express()
const port = 3000

Routes(app)

app.use(
	'/api-docs',
	swaggerUi.serve, 
	swaggerUi.setup(swaggerDocument)
) 

app.listen(port, () => {
	console.log(`listening on port ${port}`)
})







