const mongoose = require('mongoose')
const { describe, test, beforeEach, after } = require('node:test')
const supertest = require('supertest')
const assert = require('node:assert')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { usersInDb } = require('./test_helper')
const app = require('../app')

const api = supertest(app)

describe('when there is initially one user in db', () => {
	const baseUrl = '/api/users'
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('sekret', 10)
		const user = new User({ username: 'root', passwordHash })
		await user.save()
	})

	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await usersInDb()

		const newUser = {
			username: 'mluukkai',
			name: 'Matti Luukkainen',
			password: 'salainen',
		}

		await api
			.post(baseUrl)
			.expect(201)
			.send(newUser)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await usersInDb()
		assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

		const usernames = usersAtEnd.map((u) => u.username)
		assert(usernames.includes(newUser.username))
	})

	test('creation fails with propper status code and message if username already taken', async () => {
		const usersAtStart = await usersInDb()
		const newUser = {
			username: 'root',
			name: 'Superuser',
			password: 'salainen',
		}

		const result = await api
			.post(baseUrl)
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await usersInDb()
		assert(result.body.error.includes('expected `username` to be unique'))

		assert.strictEqual(usersAtEnd.length, usersAtStart.length)
	})
})

after(async () => {
	await mongoose.connection.close()
})
