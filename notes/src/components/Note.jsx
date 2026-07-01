const Note = ({ note, onToggleImportance }) => {
	const label = note.important ? 'make not important' : 'make important'
	return (
		<li className="note">
			<span>{note.content}</span>
			<button type="button" onClick={onToggleImportance}>
				{label}
			</button>
		</li>
	)
}

export default Note
