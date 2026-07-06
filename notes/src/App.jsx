import { useEffect, useState } from 'react'
import { Link, Route, Routes, useMatch } from 'react-router-dom'
import Footer from './components/Footer'
import Home from './components/Home'
import Note from './components/Note'
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'
import noteService from './services/notes'

const App = () => {
	const [notes, setNotes] = useState([])

	useEffect(() => {
		noteService.getAll().then((initialNotes) => {
			setNotes(initialNotes)
		})
	}, [])

	function addNote(noteObject) {
		noteService.create(noteObject).then((returnedNote) => {
			setNotes(notes.concat(returnedNote))
		})
	}

	function toggleImportanceOf(id) {
		const note = notes.find((n) => n.id === id)
		const changedNote = { ...note, important: !note.important }

		noteService
			.update(id, changedNote)
			.then((returnedNote) => {
				setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
			})
			.catch(() => {
				setNotes(notes.filter((n) => n.id !== id))
			})
	}

	const padding = {
		padding: 5,
	}

	function deleteNote(id) {
		noteService.remove(id).then(() => {
			setNotes(notes.filter((n) => n.id !== id))
		})
	}

	const match = useMatch('/notes/:id')
	const note = match ? notes.find((note) => note.id === match.params.id) : null

	return (
		<>
			<div>
				<Link style={padding} to={'/'}>
					Home
				</Link>
				<Link style={padding} to={'/notes'}>
					Notes
				</Link>
				<Link style={padding} to={'/create'}>
					Create
				</Link>
			</div>
			<Routes>
				<Route path="/notes" element={<NoteList notes={notes} />} />
				<Route
					path="/notes/:id"
					element={
						<Note
							note={note}
							onToggleImportance={toggleImportanceOf}
							onDelete={deleteNote}
						/>
					}
				/>
				<Route path="/create" element={<NoteForm createNote={addNote} />} />
				<Route path="/" element={<Home />} />
			</Routes>
			<Footer />
		</>
	)

	// 	const noteFormRef = useRef() //referencia para poder controlar el componente togglable desde afuera

	// 	useEffect(() => {
	// 		const eventHandler = (initialNotes) => setNotes(initialNotes)
	// 		noteService.getAll().then(eventHandler)
	// 	}, [])

	//

	//

	// 	const addNote = async (noteObject) => {
	// 		try {
	// 			noteFormRef.current.toggleVisibility()
	// 			const returnedNote = await noteService.create(noteObject)
	// 			setNotes(notes.concat(returnedNote))
	// 			setErrorMessage(notificationOptions.addSuccess)
	// 			setNotificationStatus(notificationStatusOptions.success)
	// 			setTimeout(() => {
	// 				setErrorMessage(null)
	// 				setNotificationStatus(null)
	// 			}, 3000)
	// 		} catch {
	// 			setErrorMessage('fail to add note')
	// 			setNotificationStatus(notificationStatusOptions.error)
	// 			setTimeout(() => {
	// 				setErrorMessage(null)
	// 				setNotificationStatus(null)
	// 			}, 3000)
	// 		}
	// 	}

	// 	const noteForm = () => (
	// 		<Togglable buttonLabel={'new note'} ref={noteFormRef}>
	// 			<NoteForm createNote={addNote} />
	// 		</Togglable>
	// 	)

	// 	const handleLogin = async (event) => {
	//
	// 	}

	// 	const notesToShow = showAll ? notes : notes.filter((note) => note.important)

	// 	const onToggle = () => setShowAll(!showAll)

	// 	return (
	// 		<div>
	// 			<h1>Notes</h1>
	// 			<Notification message={errorMessage} status={notificationStatus} />

	// 			{!user && loginForm()}
	// 		
	// 			<button type="button" onClick={onToggle}>
	// 				show {showAll ? 'important' : 'all'}
	// 			</button>

	// 			<ul>
	// 				{notesToShow.map((note) => (
	// 					<Note
	// 						onToggleImportance={() => toggleImportanceOf(note.id)}
	// 						note={note}
	// 						key={note.id}
	// 					/>
	// 				))}
	// 			</ul>
	// 			<Footer />
	// 		</div>
	// 	)
}

export default App
