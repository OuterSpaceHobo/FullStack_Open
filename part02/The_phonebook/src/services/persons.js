import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const GetAll = () => {
  return axios.get(baseUrl)
}

const Create = newObject => {
  return axios.post(baseUrl, newObject)
}

const Update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const Delete = (id, newObject) => {
  return axios.delete(`${baseUrl}/${id}`, newObject)
}

export { GetAll, Create, Delete, Update }
