import React from 'react'
import PropTypes from "prop-types";
import actionFor from "../actionCreators"
import Anecdote from './Anecdote'

class AnecdoteList extends React.Component {
  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }
  voteAnecdote = (id) => () => {
    this.context.store.dispatch(actionFor.voteAnecdote(id))
  }

  render() {
    const anecdotes = this.context.store.getState()
    return <div>
        <h2>Anecdotes</h2>
        {anecdotes
          .sort((a, b) => b.votes - a.votes)
          .map(anecdote => (
            <Anecdote
              key={anecdote.id}
              anecdote={anecdote}
              handleClick={this.voteAnecdote(anecdote.id)}
            />
          ))}
      </div>;
  }
}

AnecdoteList.contextTypes = {
  store: PropTypes.object
}

export default AnecdoteList