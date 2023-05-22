import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import store from "./store.js";
// import { appendAnecdote, setAnecdotes } from './reducers/anecdoteReducer';
// import anecdoteService from './services/anecdotes'

// anecdoteService.getAll().then(anecdotes =>
//   anecdotes.forEach(anecdote => {
//     store.dispatch(appendAnecdote(anecdote))
//   })
// )

// anecdoteService.getAll().then(anecdotes =>
//   store.dispatch(setAnecdotes(anecdotes))
// )

store.subscribe(() => {
  const storeNow = store.getState()
  console.log('storeNow', storeNow)
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)