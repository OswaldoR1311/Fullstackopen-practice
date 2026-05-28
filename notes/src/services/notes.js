import axios from 'axios'

<<<<<<< HEAD:part1/notes/src/services/notes.js
const baseUrl = 'http://localhost:3001/api/notes'
=======
const baseUrl = '/api/notes'
>>>>>>> a28ad43ad36b5d26f4233a335caccbb4f5c18d2b:notes/src/services/notes.js

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default {
  getAll,
  create,
  update,
}
