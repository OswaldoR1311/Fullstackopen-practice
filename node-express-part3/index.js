const express = require('express')
require('dotenv').config()
const Note = require('./models/notes')
const { requestLogger, unknownEndpoint } = require('./middlewares/middlewares')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())

app.use(requestLogger)

let notes = [
  {
    id: '1',
    content: 'HTML is easy',
    important: true,
  },
  {
    id: '2',
    content: 'Browser can execute only JavaScript',
    important: false,
  },
  {
    id: '3',
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true,
  },
  {
    content: '',
    important: true,
    id: 'gzaBmVHU2KU',
  },
  {
    content: 'post',
    important: false,
    id: 'wVEnmFqhSRE',
  },
  {
    content: 'otra nota',
    important: false,
    id: 'xQYOHeoErfY',
  },
  {
    content: 'otra',
    important: false,
    id: '5TXEYM1PNho',
  },
  {
    content: 'blabla',
    important: false,
    id: 'EAY_ZVuqPY0',
  },
  {
    content: 'adasd',
    important: false,
    id: '9N3C2pKRl7c',
  },
  {
    content: 'probando otra nota',
    important: false,
    id: '0LJi8_DbFFI',
  },
  {
    content: 'haciendo otra cosa',
    important: true,
    id: '7DoMiszALIM',
  },
  {
    content: 'porque me das',
    important: true,
    id: 'h1yGacy6Wkw',
  },
]

app.get('/', (request, response) => {
  response.send('<h1>Hello world</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ error: 'Content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then((savedNote) => {
    response.json(savedNote)
  })
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter((note) => note.id !== id)

  response.status(204).end()
})

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
