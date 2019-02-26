import React from "react";

const Kurssi = props => {
  return (
    <div>
      <Otsikko kurssi={props.kurssi} />
      <Sisalto osat={props.osat} />
      <Yhteensa osat={props.osat} />
    </div>
  );
};

const Otsikko = props => {
  return (
    <div>
      <h2>{props.kurssi}</h2>
    </div>
  );
};

const Osa = props => {
  return (
    <div>
      <p>
        {props.osa.nimi} {props.osa.tehtavia}
      </p>
    </div>
  );
};

const Sisalto = ({ osat }) => {
  return (
    <div>
      {osat.map(osa => (
        <Osa key={osa.id} osa={osa} />
      ))}
    </div>
  );
};

const Yhteensa = props => {
  let sumOffTehtavia = props.osat.reduce((sum, osa) => sum + osa.tehtavia, 0);
  return (
    <div>
      <p>Yhteensä {sumOffTehtavia} tehtävää</p>
    </div>
  );
};

export default Kurssi;