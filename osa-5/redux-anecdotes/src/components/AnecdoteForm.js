import React from 'react'
import PropTypes from "prop-types";
import actionFor from "../actionCreators";

class AnecdoteForm extends React.Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  handleSubmit = e => {
    e.preventDefault();
    this.context.store.dispatch(actionFor.anecdoteCreation(e.target.anecdote.value))
    e.target.anecdote.value = "";
  };
  render() {
    return (
      <div>
        <h2>Create new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input name="anecdote" />
          </div>
          <button>create</button>
        </form>
      </div>
    );
  }
}
AnecdoteForm.contextTypes = {
  store: PropTypes.object
};

export default AnecdoteForm