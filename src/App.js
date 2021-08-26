import React, { useEffect, useState } from 'react'
import Note from './components/Note'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  //useEffect allows you to manipulate DOM renders outside of re-rendering
  // This will fetch the data from the json server
  useEffect(() => {
    noteService.getAll().then(res => setNotes(res)).catch(err => console.log(err))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  // This will create a new note object then use fetch to POST the new note 
  const handleNewNote = (e) => {
    e.preventDefault()
    const NoteObj = {
      content: newNote,
      date: new Date().toLocaleDateString(),
      important: Math.random() < 0.5
    }
    noteService.create(NoteObj)
    .then(json => {
      // Cannot forget to update the state or else it won't show up on screen
      setNotes(notes.concat(NoteObj))
      setNewNote('')
    })
    .catch(err => console.log(err))
  }
  
  const newNoteForm = (event) => {
    setNewNote(event.target.value)
  }
  
  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    noteService.update(id, changedNote).then(data => {
      setNotes(notes.map(note => note.id !== id ? note:data))
    }).catch(err => {
      setErrorMessage(`Note ${note.content} was already removed from server.`)
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
    setNotes(notes.filter(n => n.id !== id))
    })
  }
  
  const showNotes = showAll ? notes : notes.filter(note => note.important)
  
  const showImportant = () => {
    setShowAll(!showAll)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try{  
      const user = await noteService.login({
        username, password,
      }) 
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch(e){
      console.log('SHOULD BE INSIDE THE CATCH BLOCK WTF!!!')
      setUser(null)
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleUser =(event) => {
    setUsername(event.target.value)
  }

  const handlePass =(event) => {
    setPassword(event.target.value)
  }

  const LoginForm = () => (
    <form onSubmit={handleLogin} >
      <div>Username <input type="text" value={username} onChange={handleUser}></input></div>
      <div>Password <input type="password" value={password} onChange={handlePass}></input></div>
      <button className='pure-button' type='submit'>login</button>
    </form>
  )
  
  const NoteForm = () => (
    <form onSubmit={handleNewNote}>
      <input value={newNote} onChange={newNoteForm} />
      <button className='pure-button' type='submit'>Add Note</button>
    </form>
  )

  
  return (
    <div>
      <h3>{errorMessage}</h3>
      <h1>Notes</h1>
      {
      user === null ? LoginForm() : 
            <div>
            <p>{user.name} logged-in</p>
            {NoteForm()}
            </div>
      }
      <button className='button-small pure-button' onClick={showImportant}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {showNotes.map(note => 
            <Note key={note.id} note={note}
             toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>
    
    </div>
  )
}

export default App