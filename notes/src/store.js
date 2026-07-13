import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import noteService from './services/notes'

const logger = (config) => (set, get) =>
	config((...args) => {
		console.log('prev state', get())
		set(...args)
		console.log('next state', get())
	}, get)

const useNoteStore = create(
	devtools((set, get) => ({
		// notes: initialNotes,
		notes: [],
		filter: 'all',
		actions: {
			// add: (note) => set((state) => ({ notes: state.notes.concat(note) })),
			add: async (content) => {
				const newNote = await noteService.createNew(content)
				set((state) => ({ notes: [...state.notes, newNote] }))
			},
			// toggleImportance: (id) =>
			// 	set((state) => ({
			// 		notes: state.notes.map((note) =>
			// 			note.id === id ? { ...note, important: !note.important } : note,
			// 		),
			// 	})),
			toggleImportance: async (id) => {
				const note = get().notes.find((n) => n.id === id)
				const updated = await noteService.update(id, {
					...note,
					important: !note.important,
				})
				set((state) => ({
					notes: state.notes.map((n) => (n.id === id ? updated : n)),
				}))
			},
			setFilter: (value) => set(() => ({ filter: value })),
			initialize: async () => {
				const notes = await noteService.getAllNotes()
				set(() => ({ notes: notes }))
			},
		},
	})),
)

export const useNotes = () => {
	const notes = useNoteStore((state) => state.notes)
	const filter = useNoteStore((state) => state.filter)

	if (filter === 'important') return notes.filter((n) => n.important)
	if (filter === 'nonimportant') return notes.filter((n) => !n.important)
	return notes
}
export const useFilter = () => useNoteStore((state) => state.filter)
export const useNoteActions = () => useNoteStore((state) => state.actions)
