import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (newObject) => {
    return axios.post(baseUrl, newObject)
}

const update = (id,newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = (id) => {
    axios.delete(`${baseUrl}/${id}`)
    return getAll()
  }


export default {
    getAll: getAll,
    create: create,
    update: update,
    remove: remove
}

