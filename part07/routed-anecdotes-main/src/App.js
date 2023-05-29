import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom'
import { useField } from './hooks'

const Menu = (props) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <>
      <div>
        <Link style={padding} to="/">anecdotes</Link>
        <Link style={padding} to="/create">create new</Link>
        <Link style={padding} to="/about">about</Link>
      </div>
      <p>{props.notification}</p>
      <Routes>
        <Route path="/:id" element={<Anecdote anecdotes={props.anecdotes} />} />
        <Route path="/create" element={<CreateNew addNew={props.addNew} />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<AnecdoteList anecdotes={props.anecdotes} />} />
      </Routes>
    </>
  )
}

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecd = anecdotes.find(n => n.id === Number(id)) 

  return (
      <div>
        <h2>{anecd.content}</h2>
        <div>{anecd.author}</div>
        <div>{anecd.info}</div>
        <div>{anecd.votes}</div>
      </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
      <li key={anecdote.id}>
        <Link to={`/${anecdote.id}`}>{anecdote.content}</Link>
      </li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  // const [content, setContent] = useState('')
  // const [author, setAuthor] = useState('')
  // const [info, setInfo] = useState('')
  const {reset: resetContent, ...content } = useField('content')
  const {reset: resetAuthor, ...author } = useField('author')
  const {reset: resetInfo, ...info } = useField('info')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const handleReset = (e) => {
    e.preventDefault()
    resetContent()
    resetAuthor()
    resetInfo()
    // content.reset()
    // author.reset()
    // info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form>
        <div>
          content
          {/* <input name={content.name} value={content.value} onChange={content.onChange} /> */}
          <input {...content} />
        </div>
        <div>
          author
          {/* <input name={author.name} value={author.value} onChange={author.onChange} /> */}
          <input {...author} />
        </div>
        <div>
          url for more info
          {/* <input name={info.name} value={info.value} onChange={info.onChange} /> */}
          <input {...info} />

        </div>
        <button type='submit' onClick={handleSubmit}>create</button>
        <button type='reset' onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

const App = () => {
  const navigate = useNavigate()
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote ${anecdote.content} created!`)
    setTimeout(() => {setNotification('')}, 5000)
    navigate('/')
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
      <div>
        <h1>Software anecdotes</h1>
        <Menu addNew={addNew} anecdotes={anecdotes} notification={notification} />
        <Footer />
      </div>
  )
}

export default App
