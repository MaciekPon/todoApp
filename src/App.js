import "./App.css";
import { useState /*,useEffect*/ } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  // const [data, setData] = useState("");

  // useEffect(() => {
  //   fetch("https://todoapi-20h6.onrender.com")
  //     .then((response) => response.text())
  //     .then((data) => {
  //       setData(data);
  //     })
  //     .catch((error) => console.error("Błąd:", error));
  // }, []);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const sendValue = () => {
    setTodos([...todos, inputValue]);
  };

  return (
    <div className="App">
      <div className="input-wrapper">
        <label htmlFor="addToDo">Dodaj coś do zrobienia</label>
        <input id="addToDo" onInput={handleChange} type="text" />
        <button onClick={sendValue}>Dodaj</button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
