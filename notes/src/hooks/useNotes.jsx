import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createNote, getNotes, updateNote } from '../requests'

export async function useNotes() {
	const queryClient = useQueryClient()

	const result = useQuery({
		queryKey: ['notes'],
		queryFn: getNotes,
		refetchOnWindowFocus: false,
	})

	const newNoteMutation = useMutation({
		mutationFn: createNote,
		onSuccess: (newNote) => {
			const notes = queryClient.getQueryData(['notes'])
			queryClient.setQueryData(['notes', notes.concat(newNote)])
		},
	})

	const updateNoteMutation = useMutation({
		mutationFn: updateNote,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['notes'] })
		},
	})

	return {
		notes: result.data,
		isPending: result.isPending,
		addNote: (content) => newNoteMutation.mutate({ content, important: true }),
		toggleImportance: (note) =>
			updateNoteMutation.mutate({
				...note,
				important: !note.important,
			}),
	}
}
