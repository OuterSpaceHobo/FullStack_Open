import { useQuery, useQueryClient, useMutation } from 'react-query'
import { getAnecdotes, updateAnecdote } from './ requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useReducer } from 'react'
import NotifContext from './NotifContext'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return state = action.payload  
    case "NO":
        return state = ''
    default:
        return state
  }
}

const App = () => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '') //

  const queryClient = useQueryClient()
  const updateNoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const handleVote = (anecdote) => {
    updateNoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })

    notificationDispatch({
      type: 'SET', 
      payload: `you voted '${anecdote.content}'`
    }) 
    setTimeout(() =>  {notificationDispatch({type: 'NO'})}, 5000)
    // console.log('voted')
  }
  
  const result = useQuery('anecdotes', getAnecdotes)
  if ( result.isLoading ) {
    return <div>loading data...</div>
  } else if (result.isError) {
    return <div>service is down (check server)</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <NotifContext.Provider value={[notification, notificationDispatch]}>
        <h3>Anecdote app</h3>
      
        <Notification />
        <AnecdoteForm />
      
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </NotifContext.Provider>
    </div>
  )
}

export default App
