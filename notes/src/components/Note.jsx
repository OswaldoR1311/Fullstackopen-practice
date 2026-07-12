import { useNavigate, useParams } from 'react-router-dom'
import { useNoteActions } from '../store'

// const Note = ({ note, onToggleImportance, onDelete }) => {
// 	const id = useParams().id
// 	const navigate = useNavigate()

// 	if (!note) {
// 		return null
// 	}

// 	const label = note.important ? 'make not important' : 'make important'

// 	function handleDelete() {
// 		if (window.confirm(`Delete note "${note.content}"`)) {
// 			onDelete(id)
// 			navigate('/notes')
// 		}
// 	}

// 	return (
// 		<li className="note">
// 			<span>{note.content}</span>
// 			<button type="button" onClick={() => onToggleImportance(id)}>
// 				{label}
// 			</button>
// 			<button type="button" onClick={handleDelete}>
// 				delete
// 			</button>
// 		</li>
// 	)
// }

function Note({ note }) {
	const { toggleImportance } = useNoteActions()
	return (
		<li>
			{note.important ? <strong>{note.content}</strong> : note.content}
			<button onClick={() => toggleImportance(note.id)}>
				{note.important ? 'make not important' : 'make important'}
			</button>
		</li>
	)
}

export default Note
