import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './reducer'
import './index.css'

const store = createStore(counterReducer)

const Statistiikka = () => {
  const states = store.getState()
  const palautteita = states.good + states.ok + states.bad
  const keskiarvo = Math.round(((states.good - states.bad) / palautteita) * 10) / 10
  const positiiv = Math.round((states.good / palautteita) * 1000) / 10

  if (palautteita === 0) {
    return (
      <div>
        <h2>Statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{states.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{states.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{states.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{keskiarvo}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positiiv} %</td>
          </tr>
        </tbody>
      </table>

      <button onClick={e => store.dispatch({ type: "ZERO" })}>
        nollaa tilasto
      </button>
    </div>;
}

class App extends React.Component {
  klik = (nappi) => () => {
    store.dispatch({ type: nappi })
  }

  render() {
    return (
      <div>
        <h2>Anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
}

renderApp()
store.subscribe(renderApp)