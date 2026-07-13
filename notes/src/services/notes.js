// import axios from 'axios'

// const baseUrl = '/api/notes'

// let token = null

// const setToken = (newToken) => {
// 	token = `Bearer ${newToken}`
// }
// const getAll = () => {
// 	const request = axios.get(baseUrl)
// 	return request.then((response) => response.data)
// }

// const create = (newObject) => {
// 	const config = {
// 		headers: { Authorization: token },
// 	}
// 	const request = axios.post(baseUrl, newObject, config)
// 	return request.then((response) => response.data)
// }

// const update = (id, newObject) => {
// 	const request = axios.put(`${baseUrl}/${id}`, newObject)
// 	return request.then((response) => response.data)
// }

// function remove(id) {
// 	return axios.delete(`${baseUrl}/${id}`)
// }

// export default {
// 	getAll,
// 	create,
// 	update,
// 	setToken,
// 	remove,
// }

const baseUrl = 'http://localhost:3001/notes'

async function getAllNotes() {
	const response = await fetch(baseUrl)

	if (!response.ok) {
		throw new Error('Failed to fetch notes')
	}

	const data = await response.json()
	return data
}

async function createNew(content) {
	const response = await fetch(baseUrl, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ content, important: false }),
	})

	if (!response.ok) throw new Error('Failed to create note')

	return await response.json()
}

async function update(id, note) {
	const options = {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(note),
	}
	const response = await fetch(`${baseUrl}/${id}`, options)

	if (!response.ok) throw new Error('Failed to update note')

	return await response.json()
}

export default { getAllNotes, createNew, update }
