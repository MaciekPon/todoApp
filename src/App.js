import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [inputValue, setInputValue] = useState("");
  let [todos, setTodos] = useState([]);
  const url = process.env.REACT_APP_API_URL
  // const [data, setData] = useState("");
  const results = async () => {
    let { data } = await axios.get(url);
    setTodos(data);
  };

  useEffect(() => {
    results();
  }, [todos]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const sendValue = async () => {
    // axios.post("https://todoapi-20h6.onrender.com/addTodo", {
    // name: inputValue,
    // });
    await axios.post(url + `/addTodo`, { name: inputValue });
    results();
    setInputValue("")
  };

  const checkTodo = async (toDoId) => {
    // axios.post("https://todoapi-20h6.onrender.com/checkTodo", { toDoId });

    await axios.put(url + "/checkTodo", { toDoId });
    results();
  };

  const deleteTodo = async (toDoId) => {
    await axios.delete(`${url + toDoId}`);
    results()
  }

  const deleteAll = async () => {
    let toDosIds = []
    todos.map(todo => {
      toDosIds.push(todo._id)
    })

    await axios.put(url + '/delete-all', { toDosIds })
  }

  return (
    <div className="App">
      <label htmlFor="addToDo">Dodaj coś do zrobienia</label>
      <div className="input-wrapper">
        <input id="addToDo" onInput={handleChange} type="text" value={inputValue} />
        <button onClick={sendValue}>Dodaj</button>
      </div>

      <div>
        <button onClick={deleteAll}>Usuń wszystkie</button>
      </div>

      <ul style={{ listStyle: "none" }}>
        {todos.map((todo) => (
          <li
            key={todo._id}
            style={{ textDecoration: todo.isEnded ? "line-through" : "" }}
          >
            {todo.name}
            <button onClick={() => checkTodo(todo._id)}>Odznacz</button>
            <button onClick={() => deleteTodo(todo._id)}>Usuń</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
