import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  // const [data, setData] = useState("");

  useEffect(() => {
    const results = async () => {
      // let { data } = await axios.get("http://localhost:3001");
      let { data } = await axios.get("https://todoapi-20h6.onrender.com");

      setTodos(data);
    };
    results();
  }, []);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const sendValue = () => {
    axios.post("https://todoapi-20h6.onrender.com/addTodo", {
      name: inputValue,
    });
    // axios.post("http://localhost:3001/addTodo", { name: inputValue });
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
        {todos.map((todo) => (
          <li key={todo._id}>{todo.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
