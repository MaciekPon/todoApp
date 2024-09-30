import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    // Wykonaj zapytanie do serwera Node.js
    fetch("https://todoapi-20h6.onrender.com")
      .then((response) => response.text()) // Oczekuje tekstowej odpowiedzi
      .then((data) => {
        setData(data); // Ustaw dane w stanie
      })
      .catch((error) => console.error("Błąd:", error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Siemanko deploy test</p>
        <p>{data}</p>
      </header>
    </div>
  );
}

export default App;
