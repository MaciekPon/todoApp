import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [inputValue, setInputValue] = useState("");
  let [todos, setTodos] = useState([]);
  // const [data, setData] = useState("");

  const results = async () => {
    // let { data } = await axios.get("http://localhost:3001");
    let { data } = await axios.get("https://todoapi-20h6.onrender.com");

    setTodos(data);
  };

  useEffect(() => {
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
    results();
  };

  const checkTodo = (todoId) => {
    axios.post("https://todoapi-20h6.onrender.com/checkTodo", { todoId });

    // axios.post("http://localhost:3001/checkTodo", { todoId });
    results();
  };

  return (
    <div className="App">
      <label htmlFor="addToDo">Dodaj coś do zrobienia</label>
      <div className="input-wrapper">
        <input id="addToDo" onInput={handleChange} type="text" />
        <button onClick={sendValue}>Dodaj</button>
      </div>
      <ul style={{ listStyle: "none" }}>
        {todos.map((todo) => (
          <li
            key={todo._id}
            style={{ textDecoration: todo.isEnded ? "line-through" : "" }}
          >
            {todo.name}
            <button onClick={() => checkTodo(todo._id)}>Odznacz</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
