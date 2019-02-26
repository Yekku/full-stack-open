import React from "react";
import Country from "./components/Country";
import axios from "axios";
import "./App.css";

const Countries = ({ countries, handleClick }) => {
  return (
    <ul>
      {countries.map(country => (
        <li key={country.name} onClick={handleClick(country.name)}>
          {country.name}
        </li>
      ))}
    </ul>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      filter: ''
    };
  }

  componentDidMount() {
    const promise = axios.get("https://restcountries.eu/rest/v2/all")
    promise.then(response => {
      this.setState({ countries: response.data })
    });
  }

  handleFilterChange = event => {
    this.setState({ filter: event.target.value });
  };

  setFilterTo = name => () => {
    this.setState({ filter: name });
  };

  render() {
    const countries = this.state.countries.filter(country =>
      country.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    
    let result;

    if (countries.length === 0) {
      result = "no matches, specify another filter";
    } else if (countries.length === 1) {
      result = <Country country={countries[0]} />;
    } else if (countries.length <= 10) {
      result = <Countries countries={countries} handleClick={this.setFilterTo} />;
    } else {
      result = "too many matches, specify another filter";
    }

    return <div>
        <h1>Countries info</h1>
        <div>
          <p>
            find countries:
            <input value={this.state.filter} onChange={this.handleFilterChange} />
          </p>
        </div>
        {result}
      </div>;
  }
};

export default App;
