import { expect, test } from 'playwright/test'
import { createNote, loginWith } from './helpers'

test.describe('Note app', () => {
	test.beforeEach(async ({ page, request }) => {
		// await request.post('http://localhost:3001/api/testing/reset')
		await request.post('/api/testing/reset')
		await request.post('/api/users', {
			data: {
				name: 'Oswaldo Rodríguez',
				username: 'O1311',
				password: 'oswaldo',
			},
		})

		// await page.goto('http://localhost:5173') // usamos el método goto para poder abrir la página
		await page.goto('/')
	})

	test('front page can be opened', async ({ page }) => {
		const locator = page.getByText('Notes') // Encontramos el elemento que contiene el texto que pasamos como argumento

		await expect(locator).toBeVisible() //Luego, confirmamos que sea visible
		await expect(
			page.getByText(
				'Note app, Department of Computer Science, University of Helsinki 2024'
			)
		).toBeVisible() //Confirmamos tambien que se muestre el footer en este caso
	})

	test('user can log in', async ({ page }) => {
		// await page.getByRole('button', { name: 'login' }).click() //encontramos un boton con el role 'button' y con el nombre 'login' y hacemos click
		// // await page.getByRole('textbox').fill('KaroR1311') // Esto funciona bien si solo hay un input, pero si hay varios dará error.
		// // await page.getByRole('textbox').first().fill('O1311') //para 2 inputs si sabemos su orden
		// // await page.getByRole('textbox').last().fill('oswaldo')

		// await page.getByLabel('username').fill('O1311') //Para más precisión usamos obtener el input por su etiqueta label asociada.
		// await page.getByLabel('password').fill('oswaldo')
		// await page.getByRole('button', { name: 'login' }).click() //encontramos un boton con el role 'button' y con el nombre 'login' y hacemos click
		await loginWith(page, 'O1311', 'oswaldo')
		await expect(page.getByText('Oswaldo Rodríguez logged in')).toBeVisible()
	})

	test('login fails with wrong password', async ({ page }) => {
		await loginWith(page, 'O1311', 'wrong')

		const errorDiv = page.locator('.error')
		await expect(errorDiv).toContainText('wrong credentials')
		await expect(errorDiv).toHaveCSS('border-style', 'solid')

		await expect(
			page.getByText('Oswaldo Rodríguez logged in')
		).not.toBeVisible()
	})

	test.describe('when logged in', () => {
		test.beforeEach(async ({ page }) => {
			await loginWith(page, 'O1311', 'oswaldo')
		})

		test.describe('and several notes exists', () => {
			test.beforeEach(async ({ page }) => {
				await createNote(page, 'first note')
				await createNote(page, 'second note')
				await createNote(page, 'third note')
			})

			test('one of those can be made nonimportant', async ({ page }) => {
				await page.pause()
				const otherNoteText = page.getByText('second note')
				const otherNoteElement = otherNoteText.locator('..')

				await otherNoteElement
					.getByRole('button', {
						name: 'make not important',
					})
					.click()

				await expect(otherNoteElement.getByText('make important')).toBeVisible()
			})
		})

		test('a new note can be created', async ({ page }) => {
			await createNote(page, 'a note created by playwright')

			await expect(page.getByText('a note created by playwright')).toBeVisible()
		})

		test.describe('and a note exists', () => {
			test.beforeEach(async ({ page }) => {
				await createNote(page, 'another note by playwright')
			})

			test('importance can be changed', async ({ page }) => {
				await page.getByRole('button', { name: 'make not important' }).click()
				await expect(page.getByText('make important')).toBeVisible()
			})
		})
	})
})
