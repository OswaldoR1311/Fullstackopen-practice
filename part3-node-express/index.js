const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const { unknownEndpoint } = require('./middlewares')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

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
]

const generateID = () => {
  const maxID = Math.max(...notes.map(n => n.id))
  return String(maxID + 1)
}

app.get('/', (request, response) => {
  response.send('<h1>Hello world</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(n => n.id === id)

  if (note) {
    return response.status(200).json(note)
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const findNote = notes.find(note => note.id === id)

  if (findNote) {
    notes = notes.filter(note => note.id !== findNote.id)
    return response.status(204).end()
  } else {
    return response.status(404).json({ error: 'Note does not exist' })
  }
})

app.post('/api/notes', (request, response) => {
  const payload = request.body
  if (!payload.content) {
    return response.status(404).json({ error: 'missing content' })
  }

  const newNote = {
    id: generateID(),
    content: payload.content,
    important: payload.important || false,
  }

  notes = notes.concat(newNote)
  response.status(201).json(newNote)
})

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
