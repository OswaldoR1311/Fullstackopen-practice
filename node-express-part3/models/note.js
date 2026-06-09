const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const config = require('../utils/config')
const { infoLog, errorLog } = require('../utils/logger')

const url = config.MONGODB_URI

infoLog('Connecting to', url)
mongoose
	.connect(url, { family: 4 })
	.then((result) => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connecting to MongoDB', error.message)
	})

const noteSchema = new mongoose.Schema({
	content: {
		type: String,
		minLength: 5,
		required: true,
	},
	important: Boolean,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
})

noteSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	},
})

module.exports = mongoose.model('Note', noteSchema)
