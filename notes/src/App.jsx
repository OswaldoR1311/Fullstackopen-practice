import { AppBar, Button, Container, Toolbar } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, Route, Routes, useMatch } from 'react-router-dom'
import FilterVisibility from './components/FilterVisibility'
import Footer from './components/Footer'
import Home from './components/Home'
import Note from './components/Note'
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'
import Notification from './components/Notification'
import noteService from './services/notes'
import { useNoteActions, useNotes } from './store'

const App = () => {
	// 	const [notes, setNotes] = useState([])
	// 	const [notification, setNotification] = useState(null)
	// 	useEffect(() => {
	// 		noteService.getAll().then((initialNotes) => {
	// 			setNotes(initialNotes)
	// 		})
	// 	}, [])
	// 	function addNote(noteObject) {
	// 		noteService.create(noteObject).then((returnedNote) => {
	// 			setNotes(notes.concat(returnedNote))
	// 			setNotification({
	// 				text: `Note '${returnedNote.content}' added!`,
	// 				type: 'success',
	// 			})
	// 			setTimeout(() => {
	// 				setNotification(null)
	// 			}, 5000)
	// 		})
	// 	}
	// 	function toggleImportanceOf(id) {
	// 		const note = notes.find((n) => n.id === id)
	// 		const changedNote = { ...note, important: !note.important }
	// 		noteService
	// 			.update(id, changedNote)
	// 			.then((returnedNote) => {
	// 				setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
	// 			})
	// 			.catch(() => {
	// 				setNotes(notes.filter((n) => n.id !== id))
	// 			})
	// 	}
	// 	function deleteNote(id) {
	// 		noteService.remove(id).then(() => {
	// 			setNotes(notes.filter((n) => n.id !== id))
	// 		})
	// 	}
	// 	const match = useMatch('/notes/:id')
	// 	const note = match ? notes.find((note) => note.id === match.params.id) : null
	// 	const style = { '&:hover': { bgcolor: 'rgba(255, 255, 255, .3)' } }
	// 	return (
	// 		<Container>
	// 			<AppBar position="static">
	// 				<Toolbar>
	// 					<Button color="inherit" component={Link} to={'/'} sx={style}>
	// 						home
	// 					</Button>
	// 					<Button color="inherit" component={Link} to={'/notes'} sx={style}>
	// 						Notes
	// 					</Button>
	// 					<Button color="inherit" component={Link} to={'/create'} sx={style}>
	// 						new note
	// 					</Button>
	// 				</Toolbar>
	// 			</AppBar>
	// 			<Notification notification={notification} />
	// 			<Routes>
	// 				<Route path="/notes" element={<NoteList notes={notes} />} />
	// 				<Route
	// 					path="/notes/:id"
	// 					element={
	// 						<Note
	// 							note={note}
	// 							onToggleImportance={toggleImportanceOf}
	// 							onDelete={deleteNote}
	// 						/>
	// 					}
	// 				/>
	// 				<Route path="/create" element={<NoteForm createNote={addNote} />} />
	// 				<Route path="/" element={<Home />} />
	// 			</Routes>
	// 			<Footer />
	// 		</Container>
	// 	)

	return (
		<div>
			<h2>Notes with Zustand</h2>
			<br />
			<NoteForm />
			<FilterVisibility />
			<NoteList />
		</div>
	)
}

export default App
