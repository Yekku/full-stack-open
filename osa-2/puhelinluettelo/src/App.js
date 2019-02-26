import React from "react";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notifications";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      newName: "",
      newNumber: "",
      filter: "",
      success: null,
      error: null
    };
  }

  componentDidMount() {
    personService.getAll().then(response => {
      this.setState({ persons: response });
    });
  }

  addPerson = event => {
    event.preventDefault();
    const name = this.state.newName;
    const number = this.state.newNumber;
    const findPerson = this.state.persons.find(person => person.name === name);
    
    if (findPerson) {
      this.updatePerson(findPerson, number);
    } else {
      personService
        .create({ name, number })
        .then(newPerson => {
          this.setState({
            persons: this.state.persons.concat(newPerson),
            newName: "",
            newNumber: "",
            success: `lisättiin ${name}`
          });
          setTimeout(() => {
            this.setState({ success: null });
          }, 5000);
        });
    }
  };

  deletePerson = person => () => {
    if (window.confirm(`poistetaanko ${person.name}`)) {
      personService.remove(person.id).then(response => {
        this.setState({
          persons: this.state.persons.filter(p => p.id !== person.id),
          success: `poistettiin ${person.name}`
        });
        setTimeout(() => {
          this.setState({ success: null });
        }, 5000);
      });
    }
  };

  updatePerson = (person, number) => {
    if (
      window.confirm(
        `${person.name} on jo luettelossa, korvataanko vanha numero uudella?`
      )
    ) {
      const changedPerson = { ...person, number };

      personService
        .update(person.id, changedPerson)
        .then(updatedPerson => {
          this.setState({
            persons: this.state.persons.map(
              p => (p.id !== updatedPerson.id ? p : updatedPerson)
            ),
            newName: "",
            newNumber: "",
            success: `muokattiin henkilön ${updatedPerson.name} numeroa`
          });
          setTimeout(() => {
            this.setState({ success: null });
          }, 5000);
        })
        .catch(error => {
          this.setState({
            error: `'${person.name}' on jo valitettavasti poistettu palvelimelta`,
            persons: this.state.persons.filter(p => p.id !== person.id)
          });
          setTimeout(() => {
            this.setState({ error: null })
          }, 5000)
        });
    }
  };

  handleNameChange = event => {
    this.setState({ newName: event.target.value });
  };

  handleNamberChange = event => {
    this.setState({ newNumber: event.target.value });
  };

  handleFilterChange = event => {
    this.setState({ filter: event.target.value });
  };

  render() {
    const personsToShow = this.state.persons.filter(person =>
      person.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    return <div className="App">
        <h2>Puhelinluettelo</h2>
        <Notification.Success message={this.state.success} />
        <Notification.Alert message={this.state.error} />
        <div>
          rajaa näytettäviä: <input value={this.state.filter} onChange={this.handleFilterChange} />
        </div>
        <h2>Lisää uusi / muuta olemassaolevan numeroa</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleNameChange} />
          </div>
          <div>
            numero: <input value={this.state.newNumber} onChange={this.handleNamberChange} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <Persons persons={personsToShow} deletePerson={this.deletePerson} />
      </div>;
  }
}

export default App;
