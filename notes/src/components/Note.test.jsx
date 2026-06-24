import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

test('renders content', () => {
	const note = {
		content: 'Component testing is done with react-testing-library',
		important: true,
	} //contenido a renderizar

	render(<Note note={note} />) //simulando renderizado

	screen.debug() //método para imprimir el contenido html en la consola de la terminal
	// screen.debug(element) //para renderizar solo el contenido pasado como argumento.

	const element = screen.getByText(
		'Component testing is done with react-testing-library',
	) // obteniendo el elemento mediante el texto

	// const element = screen.getByText(
	// 	'Component testing is donde with react-testing-library',
	// 	{ exact: false }, //con este objeto como segundo parametro indicamos que buscamos un elemento que contenga el texto pasado como argumento.
	// )

	// const element = await screen.findByText('Component testing is done with react-testing-library') // cabe destacar que este metodo retorna una promesa.

	expect(element).toBeDefined() //confirmando que el texto aparezca en pantalla y este definido
})

test('clicking the button calls event handler once', async () => {
	const note = {
		content: 'Component testing is done with react-testing-library',
		important: true,
	}

	const mockHandler = vi.fn() //función simulada

	console.log(mockHandler)

	render(<Note note={note} onToggleImportance={mockHandler} />)

	screen.debug()

	const user = userEvent.setup() //creando sesión de usuario
	const button = screen.getByText('make not important', { exact: false }) //obteniendo el elemento boton por su contenido de texto
	await user.click(button) //esperamos la simulacion del click

	expect(mockHandler.mock.calls).toHaveLength(1) //esperamos que el array de llamadas a la funcion simulada tenga la longitud de 1.
})
