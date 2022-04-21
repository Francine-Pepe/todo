import "./App.css";
import { useState, useEffect } from "react";
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill } from "react-icons/bs";
import Loading from "./Components/Loading";
import Calendario from "./Components/Calendario";
import Logo from './Images/to-do-list.png';
import Footer from './Components/Footer';

const API = "https://my-json-server.typicode.com/francine-pepe/todo-db";

function App() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  // load todos on page load

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      const res = await fetch(API + "/todos", { mode: 'cors', headers: 
        {'Access-Control-Allow-Origin':'*'}, Accept: 'application/json;odata.metadata=full', 'Content-Type': 'application/json' })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err));

      setLoading(false);

      setTodos(res);
    };

    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Enviou!");

    // envio das tarefas para o backend: (objeto)
    const todo = {
      id: Math.random(),
      title,
      time,
      done: false,
    };
    // Envio para a API:
    // requisicao assíncrona
    await fetch(API + "/todos", {
      
      mode: 'cors',
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
        Accept: 'application/json;odata.metadata=full',
        'Access-Control-Allow-Origin':'*'

      },
    });

    // atualiza as insercoes no Frontend:
    setTodos((prevState) => [...prevState, todo]);

    setTitle("");
    setTime("");
  };

  // para deletar a tarefa:
  const handleDelete = async (id) => {
    await fetch(API + "/todos/" + id, {
      mode: 'cors',
      method: "DELETE",
    });

    setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
  };

  const handleEdit = async (todo) => {
    // para fazer a acao contraria (marcado/desmarcado):
    todo.done = !todo.done;

    const data = await fetch(API + "/todos/" + todo.id, {
      mode: 'cors',
      method: "PUT",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
        Accept: 'application/json;odata.metadata=full',
        'Access-Control-Allow-Origin':'*'
      },
    });

    setTodos((prevState) =>
      prevState.map((t) => (t.id === data.id ? (t = data) : t))
    );
  };

  // loading...
  if (loading) {
    return (
      <div className="loading">
        <Loading />
      </div>
    );
  }

  return (
    <div className="app-background">
      <div className="App">
        <div className="todo-header">
          <img src={Logo} alt="Logo" className="logo-todo" />
          <h1>React Todo</h1>
        </div>
        <div className="form-todo">
          <h2>What is your task?</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="title">Insert your new todo:</label>
              <input
                type="text"
                name="title"
                placeholder="Todo title"
                onChange={(e) => setTitle(e.target.value)}
                value={title || ""}
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="time">Duration:</label>
              <input
                type="text"
                name="time"
                placeholder="Estimated time (in hours)"
                onChange={(e) => setTime(e.target.value)}
                value={time || ""}
                required
              />
            </div>
            <input type="submit" value="Create" />
          </form>
        </div>

        <div className="list-todo">
          <h2>Todo List:</h2>
          {todos.length === 0 && <p>There is nothing to do!</p>}
          {todos.map((todo) => (
            <div className="todo" key={todo.id}>
              <h3 className={todo.done ? "todo-done" : ""}>{todo.title}</h3>
              <p>Duration: {todo.time}</p>
              <div className="due_date">
                <p>Due date:</p>
                <Calendario />
              </div>
              <div className="actions">
                <span onClick={() => handleEdit(todo)}>
                  {!todo.done ? <BsBookmarkCheck /> : <BsBookmarkCheckFill />}
                </span>
                <BsTrash onClick={() => handleDelete(todo.id)} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
