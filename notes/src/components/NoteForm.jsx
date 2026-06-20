import { useState } from 'react'

const NoteForm = ({ createNote }) => {
	const [newNote, setNewNote] = useState('')

	const addNote = (event) => {
		event.preventDefault()

		createNote({ content: newNote, important: true })
		setNewNote('')
	}

	const handleInputChange = (event) => setNewNote(event.target.value)

	return (
		<div>
			<h2>Create a new note</h2>

			<form onSubmit={addNote}>
				<input type="text" value={newNote} onChange={handleInputChange} />
				<button type="submit">save</button>
			</form>
		</div>
	)
}

export default NoteForm
