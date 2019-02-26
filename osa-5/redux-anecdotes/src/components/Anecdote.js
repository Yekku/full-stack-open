import React from 'react'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id} style={{
          paddingTop: 10,
          paddingLeft: 2,
          marginBottom: 5
          }} >
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>
          vote
        </button>
      </div>
    </div>
  )
}

export default Anecdote