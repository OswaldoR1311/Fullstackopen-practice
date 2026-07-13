import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import noteService from '../services/notes'
import { useNoteActions } from '../store'

// const NoteForm = ({ createNote }) => {
// 	const [newNote, setNewNote] = useState('')
// 	const navigate = useNavigate()

// 	const addNote = (event) => {
// 		event.preventDefault()

// 		createNote({ content: newNote, important: true })
// 		navigate('/notes')
// 		setNewNote('')
// 	}

// 	return (
// 		<div>
// 			<h2>Create a new note</h2>

// 			<form onSubmit={addNote}>
// 				<TextField
// 					label="note content"
// 					value={newNote}
// 					onChange={(event) => setNewNote(event.target.value)}
// 				/>
// 				<div>
// 					<Button type="submit" variant="contained" style={{ marginTop: 10 }}>
// 						save
// 					</Button>
// 				</div>
// 			</form>
// 		</div>
// 	)
// }

function NoteForm() {
	const { add } = useNoteActions()

	// function generatedID() {
	// 	return Number(Math.random() * 1000000).toFixed(0)
	// }

	async function addNote(event) {
		event.preventDefault()
		const content = event.target.note.value
		add(content)
		event.target.reset()
	}

	return (
		<form onSubmit={addNote}>
			<input name="note" />
			<button type="submit">add</button>
		</form>
	)
}

export default NoteForm
