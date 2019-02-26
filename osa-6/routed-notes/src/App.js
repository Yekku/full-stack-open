import React from 'react'
import { Container } from 'semantic-ui-react'
import { Table, Form, Button, Message, Menu } from "semantic-ui-react";
import {
  BrowserRouter as Router,
  Route, Link, Redirect
} from 'react-router-dom'

const Home = () => (
  <div>
    <h2>TKTL notes app</h2>

    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </div>
)

const Note = ({note}) => {
  return(
  <div>
    <h2>{note.content}</h2>
    <div>{note.user}</div>
    <div><strong>{note.important? 'tärkeä' : ''}</strong></div>
  </div>
)}

const Notes = ({ notes }) => (
  <div>
    <h2>Notes</h2>
    <Table striped celled>
      <Table.Body>
        {notes.map(note => (
          <Table.Row key={note.id}>
            <Table.Cell>
              <Link to={`/notes/${note.id}`}>{note.content}</Link>
            </Table.Cell>
            <Table.Cell>{note.user}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </div>
);

const Users = ({notes}) => (
  <div>
    <h2>TKTL notes app</h2>
    <ul>
      <li>Matti Luukkainen</li>
      <li>Juha Tauriainen</li>
      <li>Arto Hellas</li>
    </ul>  
  </div>
)

const Login = ({onLogin, history}) => {
  const onSubmit = (event) => {
    event.preventDefault()
    onLogin('mluukkai')
    history.push('/')
  }
  return <div>
      <h2>login</h2>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <label>username</label>
          <input name="username" />
        </Form.Field>
        <Form.Field>
          <label>password</label>
          <input type="password" />
        </Form.Field>
        <Button type="submit">login</Button>
      </Form>
    </div>;
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      notes: [
        {
          id: 1,
          content: 'HTML on helppoa',
          important: true,
          user: 'Matti Luukkainen'
        },
        {
          id: 2,
          content: 'Selain pystyy suorittamaan vain javascriptiä',
          important: false,
          user: 'Matti Luukkainen'
        },
        {
          id: 3,
          content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
          important: true,
          user: 'Arto Hellas'
        }
      ],
      user: null,
      message: ''
    }
  }

  login = (user) => {
    this.setState({ user, message: `welcome ${user}` })
    setTimeout(() => {
      this.setState({ message: null })
    }, 10000)
  }

  render() {
    const noteById = (id) =>
      this.state.notes.find(note => note.id === Number(id))
    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }
    return <Container>
        <div className="container">
          <Router>
            <div>
            <Menu inverted>
              <Menu.Item link>
                <Link to="/">home</Link>
              </Menu.Item>
              <Menu.Item link>
                <Link to="/notes">notes</Link>
              </Menu.Item>
              <Menu.Item link>
                <Link to="/users">users</Link>
              </Menu.Item>
              <Menu.Item link>
                {this.state.user
                  ? <em>{this.state.user} logged in</em>
                  : <Link to="/login">login</Link>
                }
              </Menu.Item>
            </Menu>
            {(this.state.message &&
              <Message success>
                {this.state.message}
              </Message>
            )}
              <Route exact path="/" render={() => <Home />} />
              <Route exact path="/notes" render={() => <Notes notes={this.state.notes} />} />
              <Route exact path="/notes/:id" render={({ match }) => <Note note={noteById(match.params.id)} />} />
              <Route path="/users" render={() => (this.state.user ? <Users /> : <Redirect to="/login" />)} />
              <Route path="/login" render={({ history }) => <Login history={history} onLogin={this.login} />} />
            </div>
          </Router>
          <div style={footerStyle}>
            <br />
            <em>Note app, Department of Computer Science 2018</em>
          </div>
        </div>
      </Container>
  }
}

export default App