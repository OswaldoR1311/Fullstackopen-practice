const express = require('express')
const { requestLogger, unknownEndpoint } = require('./middlewares/middlewares')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())

app.use(requestLogger)

let notes = [
  {
    content: 'hola',
    id: 1,
  },
  {
    content: 'hola1',
    id: 2,
  },
  {
    content: 'hola2',
    id: 3,
  },
]

const generateID = () => {
  const maxID = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0
  return String(maxID + 1)
}

app.get('/', (request, response) => {
  response.send('<h1>Hello world</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ error: 'Content missing' })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateID(),
  }

  notes = notes.concat(note)
  response.json(note)
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
