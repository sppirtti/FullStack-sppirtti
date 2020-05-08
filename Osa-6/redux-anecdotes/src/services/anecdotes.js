import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = {content, votes: 0}
  const res = await axios.post(baseUrl, object)
  return res.data
}

const update = async (id, content, votes) => {
  const object ={content, id ,votes}
  const request = axios.put(`${baseUrl}/${id}`, object)
    return request.then(response => response.data)
}

export default { getAll, createNew, update }