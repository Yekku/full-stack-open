import React from "react";
import ReactDOM from "react-dom";

const Title = () => (
  <div>
    <h1>Anna palautetta</h1>
  </div>
);

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = props => {
  const lukumara = props.state.hyva + props.state.huono + props.state.neutraali;
  const keskiarvo =
    Math.round(((props.state.hyva - props.state.huono) / lukumara) * 10) / 10;
  const positiv = Math.round((props.state.hyva / lukumara) * 1000) / 10;
  const prosent = positiv + " %";
  if (lukumara > 0) {
    return (
      <div>
        <h2>Statistiikka</h2>
        <table>
          <tbody>
            <Statistic text="Hyvä" stat={props.state.hyva} />
            <Statistic text="Neutraali" stat={props.state.neutraali} />
            <Statistic text="Huono" stat={props.state.huono} />
            <Statistic text="Keskiarvo" stat={keskiarvo} />
            <Statistic text="Positiivisia" stat={prosent} />
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Statistiikka</h2>
        <p>Ei yhtään palautetta annettu</p>
      </div>
    );
  }
};

const Statistic = ({ text, stat }) => (
  <tr>
    <td>{text}</td>
    <td> {stat}</td>
  </tr>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    };
  }

  paivitaTila = tila => {
    return () => {
      this.setState({ [tila]: this.state[tila] + 1 });
    };
  };

  render() {
    return (
      <div>
        <Title />
        <div>
          <Button handleClick={this.paivitaTila("hyva")} text="hyvä" />
          <Button
            handleClick={this.paivitaTila("neutraali")}
            text="neutraali"
          />
          <Button handleClick={this.paivitaTila("huono")} text="huono" />
        </div>
        <Statistics state={this.state} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
