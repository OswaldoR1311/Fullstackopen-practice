import { useNavigate, useParams } from 'react-router-dom'

const Note = ({ note, onToggleImportance, onDelete }) => {
	const id = useParams().id
	const navigate = useNavigate()

	if (!note) {
		return null
	}

	const label = note.important ? 'make not important' : 'make important'

	function handleDelete() {
		if (window.confirm(`Delete note "${note.content}"`)) {
			onDelete(id)
			navigate('/notes')
		}
	}

	return (
		<li className="note">
			<span>{note.content}</span>
			<button type="button" onClick={() => onToggleImportance(id)}>
				{label}
			</button>
			<button type="button" onClick={handleDelete}>
				delete
			</button>
		</li>
	)
}

export default Note
