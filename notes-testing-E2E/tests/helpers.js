async function loginWith(page, username, password) {
	await page.getByRole('button', { name: 'login' }).click()
	await page.getByLabel('username').fill(username)
	await page.getByLabel('password').fill(password)

	await page.getByRole('button', { name: 'login' }).click()
}

async function createNote(page, content) {
	await page.getByRole('button', { name: 'new note' }).click()
	await page.getByRole('textbox').fill(content)
	await page.getByRole('button', { name: 'save' })
}

export { createNote, loginWith }
