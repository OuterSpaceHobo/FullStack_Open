import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notifReducer'
// import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        console.log(content)
        // event.target.anecdote.value = ''

        // const newAnecdote = await anecdoteService.createNew(content)
        // dispatch(createAnecdote(newAnecdote))

        dispatch(createAnecdote(content))
        dispatch(createNotification(`New anecdote added: ${content}`, 5));

        // dispatch({
        //   type: 'NEW_ANECDOTE',
        //   payload: {
        //     content: content,
        //     id: getId(),
        //     votes: 0 
        //   }
        // })
      }

    return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </>
    )
  }
  
  export default AnecdoteForm