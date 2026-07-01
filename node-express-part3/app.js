const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const { infoLog, errorLog } = require('./utils/logger')
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
require('dotenv').config()

const {
	requestLogger,
	unknownEndpoint,
	errorHandler,
} = require('./utils/middleware')

const app = express()

infoLog('connecting to', config.MONGODB_URI)

mongoose
	.connect(config.MONGODB_URI)
	.then(() => infoLog('connected to MongoDB'))
	.catch((error) => errorLog('error connection to MongoDB: ', error.message))

// app.use(express.static())
app.use(express.json())
// app.use(requestLogger)

app.use('/api/login', loginRouter)
app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)

if (process.env.NODE_ENV === 'test') {
	const testingRouter = require('./controllers/testing')
	app.use('/api/testing', testingRouter)
}

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
