const getId = () => Number((Math.random() * 1000000).toFixed(0))

export default {
  anecdoteCreation(anecdote) {
    return {
      type: 'NEW_ANECDOTE',
      data: {
        content: anecdote,
        id: getId(),
        votes:0
      }
    }
  },
  voteAnecdote(id) {
    return {
      type: 'VOTE_ANECDOTE',
      data: { id }
    }
  }
}