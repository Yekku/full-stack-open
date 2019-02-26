import React from "react";
import ReactDOM from "react-dom";

const Anecdote = props => {
  return (
    <div>
      <p>{props.anecdote}</p>
      <p>This anecdote has {props.vote} votes</p>
    </div>
  )
};

const Paras = props => {
  const paras = Math.max(...props.pisteet)
  const index = props.pisteet.indexOf(paras)
  return (
    <div>
      <p>{props.anecdotes[index]}</p>
      <p>This anecdote has {paras} votes.</p>
    </div>
    )
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pisteet: new Array(props.anecdotes.length).fill(0),
      selected: 0,
    }
  };

  voteAnecdote = () => {
    const newPisteet = this.state.pisteet
    newPisteet[this.state.selected] += 1
    this.setState({
      pisteet: newPisteet
    })
  };

  randomAnecdote = () => {
    const anLength = anecdotes.length;
    const ranAnecdote = Math.floor(Math.random() * anLength);
    this.setState({ selected: ranAnecdote });
  };

  render() {
    const boldText = {
      fontWeight: 'bold'
    }
    return (
      <div>
        <h1 style={boldText}>Anecdote of day:</h1>
        <Anecdote anecdote={this.props.anecdotes[this.state.selected]} vote={this.state.pisteet[this.state.selected]} />
        <div>
          <Button handleClick={this.voteAnecdote} text="Vote this" />
          <Button handleClick={this.randomAnecdote} text="Next anecdote" />
        </div>
        <h2 style={boldText}>Anecdote with most votes:</h2>
        <Paras pisteet={this.state.pisteet} anecdotes={this.props.anecdotes}/>
      </div>
    )
  }
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
