const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack-oswaldo:${password}@cluster0.wo2v9ry.mongodb.net/noteApp?appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

Note.find({ important: true }).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})

// const note = new Note({
//   content: 'Mongo DB makes things',
//   important: true,
// })

// note.save().then((result) => {
//   console.log('noted saved!')
//   mongoose.connection.close()
// })
