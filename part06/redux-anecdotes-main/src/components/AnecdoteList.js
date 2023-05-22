import { useSelector, useDispatch } from 'react-redux'
// import { addVote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notifReducer'
// import anecdoteService from '../services/anecdotes'
import { updateAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    // const anecdotes = useSelector(state => state)
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const vote = async (anecdote) => {
        console.log('vote', anecdote.id)
        console.log('vote', anecdote.id)
        // dispatch(addVote(id))
        dispatch(updateAnecdote(anecdote))

        // const updatedAnecdote = {
        //     id: anecdote.id,
        //     votes: anecdote.votes + 1,
        //     content: anecdote.content
        // }
        // const votedAnecdote = await anecdoteService.update(updatedAnecdote);
        // dispatch(addVote(votedAnecdote));

        dispatch(createNotification(`Anecdote liked: ${anecdote.content}`, 5));
        // dispatch({
        //   type: 'VOTE',
        //   payload: { id }
        // })
      }

    return (
    <>
        {/* <h2>Anecdotes</h2> */}
        {anecdotes
        .filter(anecdote => 
            anecdote.content.includes(filter))
        .sort(function(a, b){return b.votes - a.votes})
        .map(anecdote =>
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>
                    like
                </button>
            </div>
        </div>
        )}
    </>
    )
  }
  
  export default AnecdoteList