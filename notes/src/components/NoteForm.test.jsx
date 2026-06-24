import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NoteForm from './NoteForm'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
	const mockCreateNote = vi.fn()
	const user = userEvent.setup()

	const { container } = render(<NoteForm createNote={mockCreateNote} />)

	// const input = screen.getByRole('textbox') //accedemos al input mediante su rol.(optimo cuando es solo 1 input)
	// const input = screen.getByLabelText('content') // obtenemos el contenido del input desde su label asociado para ser mas precisos si hay varios inputs

	// const input = screen.getByPlaceholderText('write note content here') //obtener el contenido por medio del atributo placeholder, tambien preciso

	console.log(container.querySelector)

	const sendButton = screen.getByText('save')

	await user.type(input, 'testing a form...') //el método type es usado para escribir texto en el input
	await user.click(sendButton)

	expect(mockCreateNote.mock.calls).toHaveLength(1)
	expect(mockCreateNote.mock.calls[0][0].content).toBe('testing a form...')
})
