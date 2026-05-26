const Note = ({ note, onToggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important'
  return (
    <li className='note'>
      {note.content}
      <button onClick={onToggleImportance}>{label}</button>
    </li>
  )
}

export default Note
