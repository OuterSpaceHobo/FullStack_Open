import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
// import anecdoteService from './services/anecdotes'
// import { setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes()) 
  }, [dispatch]) 
  
  // useEffect(() => {
  //   anecdoteService
  //     .getAll().then(anecdote => dispatch(setAnecdotes(anecdote)))
  // }, [dispatch])

  return (
    <>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </>
  )
}

export default App