import React from "react";
import Kurssi from "./components/Kurssi";

const App = ({ kurssit }) => {
  return (
    <div>
      <h1>Opetusohjelma</h1>
      <ul>
        {kurssit.map(kurssi => (
          <Kurssi key={kurssi.id} kurssi={kurssi.nimi} osat={kurssi.osat} />
        ))}
      </ul>
    </div>
  );
};

export default App;
