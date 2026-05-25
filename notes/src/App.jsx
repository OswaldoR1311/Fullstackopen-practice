import Note from './components/Note'
import { useEffect, useState } from 'react'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('Effect')
    const eventHandler = (initialNotes) => setNotes(initialNotes)
    noteService.getAll().then(eventHandler)
  }, [])

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
      alert(
        `the note '${note.content}' was already deleted from the server, ${error}`,
      )
      setNotes(notes.filter((note) => note.id !== id))
    }
    noteService.update(id, changedNote).then(eventHandler).catch(errorHandler)
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={onToggle}>show {showAll ? 'important' : 'all'}</button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            onToggleImportance={() => toggleImportanceOf(note.id)}
            note={note}
            key={note.id}
          />
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
