import React from 'react'
import axios from 'axios'
import styled from "styled-components";
import PromisePolyfill from "promise-polyfill"
import Hello from './components/Hello'
import NoteCount from './components/NoteCount'

if (!window.Promise) {
  window.Promise = PromisePolyfill;
}

const Button = styled.button `
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid black;
  border-radius: 3px;
`
const StyledHello = styled(Hello) `
color: blue;
font - weight: bold;
`
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
      noteCount: 0
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3001/notes").then(result => {
      this.setState({ noteCount: result.data.length });
    });
  }

  onClick = () => {
    this.setState({ counter: this.state.counter + 1 });
  };

  render() {
    return (
      <div className="container">
        <StyledHello counter={this.state.counter} />
        <Button onClick={this.onClick}>click</Button>
        <NoteCount noteCount={this.state.noteCount} />
      </div>
    );
  }
}

export default App
