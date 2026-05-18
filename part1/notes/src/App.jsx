import Note from './components/Note'
import { useState } from 'react'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const handleAddNote = (event) => {
    event.preventDefault()
    const newObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    }
    setNotes(notes.concat(newObject))
    setNewNote('')
  }

  const handleInputChange = (event) => setNewNote(event.target.value)

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  const onToggle = () => setShowAll(!showAll)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={onToggle}>show {showAll ? 'important' : 'all'}</button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note note={note} key={note.id} />
        ))}
      </ul>
      <form onSubmit={handleAddNote}>
        <input value={newNote} onChange={handleInputChange} />
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default App
