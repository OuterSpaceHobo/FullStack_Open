import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// export const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0 
//   }
// }

// let initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  // initialState,
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
      // console.log('human state', JSON.parse(JSON.stringify(state)))
      // console.log('non human state', state)
      // const content = action.payload
      // console.log('action.payload', action.payload)
      // return state.concat({
      //   content,
      //   votes: 0,
      //   id: getId(),
      // })
    },
    addVote(state, action) {
      const id = action.payload.id
      console.log('id', id)
      console.log('human state', JSON.parse(JSON.stringify(state)))
      console.log('non human state', state)
      const noteToVote = state.find(votedNote => votedNote.id === action.payload.id)
      const votedNote = {
        ...noteToVote,
        votes: noteToVote.votes + 1
      }
      console.log('votedNote', votedNote)
      return state.map(note => note.id !== action.payload.id ? note : votedNote)     
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateAnecdote = content => {
  return async dispatch => {
    const updatedAnecdote = {
      id: content.id,
      votes: content.votes + 1,
      content: content.content
    }
    const votedAnecdote = await anecdoteService.update(updatedAnecdote);
    dispatch(addVote(votedAnecdote));
  }
}

export const { addVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer