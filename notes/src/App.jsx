import { useEffect, useState } from 'react'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import Note from './components/Note'
import Notification from './components/Notification'
import { notificationOptions, notificationStatusOptions } from './constants'
import loginService from './services/login'
import noteService from './services/notes'

const App = () => {
	const [notes, setNotes] = useState([])
	const [newNote, setNewNote] = useState('')
	const [showAll, setShowAll] = useState(true)
	const [errorMessage, setErrorMessage] = useState(null)
	const [notificationStatus, setNotificationStatus] = useState(null)
	const [user, setUser] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [loginVisible, setLoginVisible] = useState(false)

	useEffect(() => {
		console.log('Effect')
		const eventHandler = (initialNotes) => setNotes(initialNotes)
		noteService.getAll().then(eventHandler)
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			noteService.setToken(user.token)
		}
	}, [])

	const loginForm = () => {
		const hideWhenVisible = { display: loginVisible ? 'none' : '' }
		const showWhenVisible = { display: loginVisible ? '' : 'none' }

		return (
			<div>
				<div style={hideWhenVisible}>
					<button type="button" onClick={() => setLoginVisible(true)}>
						log in
					</button>
				</div>
				<div style={showWhenVisible}>
					<LoginForm
						username={username}
						password={password}
						handleLogin={handleLogin}
						handlePasswordChange={setPassword}
						handleUsernameChange={setUsername}
					/>
					<button type="button" onClick={() => setLoginVisible(false)}>
						cancel
					</button>
				</div>
			</div>
		)
	}

	const noteForm = () => (
		<form onSubmit={handleAddNote}>
			<input value={newNote} onChange={handleInputChange} />
			<button type="submit">save</button>
		</form>
	)

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({ username, password })
			window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
			noteService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch {
			setErrorMessage('wrong credentials')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	console.log('render', notes.length, 'notes')

	const handleAddNote = (event) => {
		event.preventDefault()
		const newObject = {
			content: newNote,
			important: Math.random() < 0.5,
		}

		const eventHandler = (returnedObject) => {
			setNotes(notes.concat(returnedObject))
			setNewNote('')
		}
		noteService.create(newObject).then(eventHandler)
		setErrorMessage(notificationOptions.addSuccess)
		setNotificationStatus(notificationStatusOptions.success)
		setTimeout(() => {
			setErrorMessage(null)
			setNotificationStatus(null)
		}, 3000)
	}

	const handleInputChange = (event) => setNewNote(event.target.value)

	const notesToShow = showAll ? notes : notes.filter((note) => note.important)

	const onToggle = () => setShowAll(!showAll)

	const toggleImportanceOf = (id) => {
		const note = notes.find((note) => note.id === id)
		const changedNote = { ...note, important: !note.important }

		const eventHandler = (newNote) => {
			setNotes(notes.map((note) => (note.id === id ? newNote : note)))
		}

		const errorHandler = (error) => {
			setErrorMessage(
				`the note '${note.content}' was already deleted from the server, ${error}`,
			)
			setNotificationStatus(notificationStatusOptions.error)
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
			setNotes(notes.filter((note) => note.id !== id))
		}
		noteService.update(id, changedNote).then(eventHandler).catch(errorHandler)
		setErrorMessage(notificationOptions.editSuccess)
		setNotificationStatus(notificationStatusOptions.success)
		setTimeout(() => {
			setErrorMessage(null)
		}, 5000)
	}

	return (
		<div>
			<h1>Notes</h1>
			<Notification message={errorMessage} status={notificationStatus} />

			{!user && loginForm()}
			{user && (
				<div>
					<p>{user.name} logged in</p>
					{noteForm()}
				</div>
			)}
			<button type="button" onClick={onToggle}>
				show {showAll ? 'important' : 'all'}
			</button>

			<ul>
				{notesToShow.map((note) => (
					<Note
						onToggleImportance={() => toggleImportanceOf(note.id)}
						note={note}
						key={note.id}
					/>
				))}
			</ul>
			<Footer />
		</div>
	)
}

export default App
