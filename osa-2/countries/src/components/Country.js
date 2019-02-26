import React from "react";

const Country = ({ country }) => {
  return <div>
      <h2>
        {country.name} {country.nativeName}
      </h2>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <img src={country.flag} alt="Flag of the country" width="300" />
    </div>;
}

export default Country;
