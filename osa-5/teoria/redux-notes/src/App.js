import React from 'react'
import NoteForm from './components/NoteForm.js'
import NoteList from './components/NoteList.js'
import VisibilityFilter from './components/VisibilityFilter'
import { connect } from 'react-redux'
import { initializeNotes } from './reducers/noteReducer'

class App extends React.Component {
  componentDidMount() {
    this.props.initializeNotes()
  }

  render() {
    return <div>
      <VisibilityFilter />
      <NoteList />
      <NoteForm />
    </div>
  }
}

export default connect(
  null, { initializeNotes }
)(App)