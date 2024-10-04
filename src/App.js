import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  let [selectedIds, setSelectedIds] = useState([])

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

  const sendValue = async () => {
    await axios.post("https://todoapi-20h6.onrender.com/addTodo", {
      name: inputValue,
    });
    // axios.post("http://localhost:3001/addTodo", { name: inputValue });
    // setTodos([...todos, { name: inputValue }]);
    await results()
  };

  const checkTodo = (toDoId) => {
    setSelectedIds([...selectedIds, toDoId])
  }

  return (
    <div className="App">
      <label htmlFor="addToDo">Dodaj coś do zrobienia</label>
      <div className="input-wrapper">
        <input id="addToDo" onInput={handleChange} type="text" />
        <button onClick={sendValue}>Dodaj</button>
      </div>
      
      <ul style={{ listStyle: 'none' }}>
        {todos.map((todo) => (
          <li style={{ textDecorationLine: selectedIds.includes(todo._id) ? 'line-through' : 'none' }} key={todo._id}>{todo.name} <button onClick={() => checkTodo(todo._id)}>Odznacz</button><button>Usuń</button></li>
        ))}
      </ul>
    </div >
  );
}

export default App;
