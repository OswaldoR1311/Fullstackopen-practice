// import {
// 	Paper,
// 	Table,
// 	TableBody,
// 	TableCell,
// 	TableContainer,
// 	TableHead,
// 	TableRow,
// } from '@mui/material'
// import { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import loginService from '../services/login'
// import noteService from '../services/notes'
// import LoginForm from './LoginForm'
// import Notification from './Notification'
// import Togglable from './Togglable'

// function NoteList({ notes }) {
// 	const [showAll, setShowAll] = useState(true)
// 	const [errorMessage, setErrorMessage] = useState(null)
// 	const [notificationStatus, setNotificationStatus] = useState(null)
// 	const [user, setUser] = useState(null)
// 	const [username, setUsername] = useState('')
// 	const [password, setPassword] = useState('')

// 	useEffect(() => {
// 		const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
// 		if (loggedUserJSON) {
// 			const user = JSON.parse(loggedUserJSON)
// 			setUser(user)
// 			noteService.setToken(user.token)
// 		}
// 	}, [])

// 	async function handleLogin(event) {
// 		event.preventDefault()
// 		try {
// 			const user = await loginService.login({ username, password })
// 			window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
// 			noteService.setToken(user.token)
// 			setUser(user)
// 			setUsername('')
// 			setPassword('')
// 		} catch {
// 			setErrorMessage('wrong credentials')
// 			window.setTimeout(() => {
// 				setErrorMessage(null)
// 			}, 5000)
// 		}
// 	}

// 	function loginForm() {
// 		return (
// 			<Togglable buttonLabel={'login'}>
// 				<LoginForm
// 					username={username}
// 					password={password}
// 					handleLogin={handleLogin}
// 					handlePasswordChange={setPassword}
// 					handleUsernameChange={setUsername}
// 				/>
// 			</Togglable>
// 		)
// 	}

// 	const notesToShow = showAll ? notes : notes.filter((note) => note.important)

// 	return (
// 		<div>
// 			<h1>Notes</h1>
// 			<Notification message={errorMessage} />
// 			<TableContainer component={Paper}>
// 				<Table>
// 					<TableHead>
// 						<TableRow>
// 							<TableCell>content</TableCell>
// 							<TableCell>user</TableCell>
// 							<TableCell>important</TableCell>
// 						</TableRow>
// 					</TableHead>
// 					<TableBody>
// 						{notes.map((note) => {
// 							console.log(note)
// 							console.log(user)
// 							return (
// 								<TableRow key={note.id}>
// 									<TableCell>
// 										<Link to={`/notes/${note.id}`}>{note.content}</Link>
// 									</TableCell>
// 									<TableCell>{username}</TableCell>
// 									<TableCell>{note.important ? 'yes' : ''}</TableCell>
// 								</TableRow>
// 							)
// 						})}
// 					</TableBody>
// 				</Table>
// 			</TableContainer>
// 			{/* {!user && loginForm()}
// 			{user && (
// 				<div>
// 					<p>{user.name} logged in</p>
// 				</div>
// 			)}
// 			<div>
// 				<button type="button" onClick={() => setShowAll(!showAll)}>
// 					show {showAll ? 'important' : 'all'}
// 				</button>
// 			</div>
// 			<ul>
// 				{notesToShow.map((note) => (
// 					<li key={note.id}>
// 						<Link to={`/notes/${note.id}`}>{note.content}</Link>
// 					</li>
// 				))}
// 			</ul> */}
// 		</div>
// 	)
// }

import { useNotes } from '../store'
import Note from './Note'

function NoteList() {
	const notes = useNotes()

	return (
		<ul>
			{notes.map((note) => (
				<Note key={note.id} note={note} />
			))}
		</ul>
	)
}

export default NoteList
