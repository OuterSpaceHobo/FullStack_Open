import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../ requests'
import { useContext } from 'react'
import NotifContext from '../NotifContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useContext(NotifContext)
  
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdote')
      console.log('ello')
    },
    onError: () => {
      console.log('im error')
      notificationDispatch({
        type: 'SET', 
        payload: `to short to bee funny (less that 5)`
      })
      setTimeout(() =>  {notificationDispatch({type: 'NO'})}, 5000)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
