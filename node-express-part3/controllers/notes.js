const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

notesRouter.get('/', async (request, response) => {
	const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
	response.status(200).json(notes)
})

notesRouter.get('/:id', async (request, response) => {
	const findedNote = await Note.findById(request.params.id)
	if (findedNote) {
		response.json(findedNote)
	} else {
		response.status(404).end()
	}
})

notesRouter.post('/', async (request, response) => {
	const body = request.body

	console.log(body)

	const user = await User.findById(body.userId)

	if (!user) {
		return response.status(400).json({ error: 'userId missing or not valid' })
	}

	const note = new Note({
		content: body.content,
		important: body.important || false,
		user: user.id,
	})

	const savedNote = await note.save()
	user.notes = user.notes.concat(savedNote._id)
	await user.save()
	response.status(201).json(savedNote)
})

notesRouter.delete('/:id', async (request, response) => {
	await Note.findByIdAndDelete(request.params.id)
	response.status(204).end()
})

notesRouter.put('/:id', async (request, response) => {
	const { content, important } = request.body

	const findedNote = await Note.findById(request.params.id)
	if (!findedNote) return response.status(404).end()

	findedNote.content = content
	findedNote.important = important

	const updatedNote = await findedNote.save()
	return response.json(updatedNote)
})

module.exports = notesRouter
