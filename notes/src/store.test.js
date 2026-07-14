import { act, renderHook } from '@testing-library/react' //renderizar hooks y componentes
import { beforeEach, describe, expect, it, vi } from 'vitest' //motor de pruebas
import noteService from './services/notes'
import useNoteStore, { useFilter, useNoteActions, useNotes } from './store'

vi.mock('./services/notes', () => ({
	default: {
		getAllNotes: vi.fn(),
		createNew: vi.fn(),
		update: vi.fn(),
	},
}))

beforeEach(() => {
	// beforeEach para limpiar el state y las funciones antes de cada test
	useNoteStore.setState({ notes: [], filter: '' })
	vi.clearAllMocks()
})

describe('useNoteActions', () => {
	it('initialize loads notes from service', async () => {
		const mockNotes = [{ id: 1, content: 'mock test', important: false }]
		noteService.getAllNotes.mockResolvedValue(mockNotes)

		const { result } = renderHook(() => useNoteActions())

		await act(async () => {
			await result.current.initialize()
		})

		const { result: notesResult } = renderHook(() => useNotes())
		expect(notesResult.current).toEqual(mockNotes)
	})

	it('add appends a new note', async () => {
		const newNote = { id: 2, content: 'new note', important: false }
		noteService.createNew.mockResolvedValue(newNote)

		const { result } = renderHook(() => useNoteActions())
		await act(async () => {
			await result.current.add('new note')
		})

		const { result: notesResult } = renderHook(() => useNotes())
		expect(notesResult.current).toContainEqual(newNote)
	})

	it('toggleImportance flips important flag', async () => {
		const note = { id: 1, content: 'test', important: false }
		useNoteStore.setState({ notes: [note] })
		noteService.update.mockResolvedValue({ ...note, important: true })

		const { result } = renderHook(() => useNoteActions())
		await act(async () => {
			await result.current.toggleImportance(1)
		})

		const { result: notesResult } = renderHook(() => useNotes())
		expect(notesResult.current[0].important).toBe(true)
	})
})

describe('useNotes filtering', () => {
	const notes = [
		{ id: 1, content: 'A', important: true },
		{ id: 2, content: 'B', important: false },
	]

	beforeEach(() => {
		useNoteStore.setState({ notes })
	})

	it('returns all notes with no filter', () => {
		const { result } = renderHook(() => useNotes())
		expect(result.current).toHaveLength(2)
	})

	it('filter important notes', () => {
		useNoteStore.setState({ notes, filter: 'important' })
		const { result } = renderHook(() => useNotes())
		expect(result.current).toEqual([notes[0]])
	})

	it('filters nonimportant notes', () => {
		useNoteStore.setState({ notes, important: 'nonimportant' })
		const { result } = renderHook(() => useNotes())
		expect(result.current).toEqual([notes[1]])
	})
})
