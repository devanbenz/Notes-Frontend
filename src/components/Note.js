import React from 'react'

const Note = ({ note, toggleImportance }) => {
  const label = note.important 
  ? 'make not important' : 'make important'
  
  return (
    <li className='note' key={note.id}>
      {note.content}
      <button className='button-small pure-button' key={note.id} onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note