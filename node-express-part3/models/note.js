const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const config = require('../utils/config')
const { infoLog, errorLog } = require('../utils/logger')

const url = config.MONGODB_URI

infoLog('Connecting to', url)
mongoose
  .connect(url, { family: 4 })
<<<<<<< HEAD:node-express-part3/models/note.js
  .then((result) => {
    infoLog('connected to MongoDB')
  })
  .catch((error) => {
    errorLog('error connecting to MongoDB', error.message)
=======
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB', error.message)
>>>>>>> f29503e4a6233ff697b376826b0e2efb941a4be0:node-express-part3/models/notes.js
  })

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Note', noteSchema)
