import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'
export const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0, id: getId() }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const update = async (anecdote) => {
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote);
    return response.data;
  };

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll,
    createNew,
    update,
  }