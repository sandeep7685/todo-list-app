import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e) => setNewTodo(e.target.value);

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    const newTask = {
      id: Date.now(),
      text: newTodo,
      completed: false,
      urgent: false,
    };
    setTodos([...todos, newTask]);
    setNewTodo("");
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const toggleUrgency = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, urgent: !todo.urgent } : todo
      )
    );
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: editText } : todo))
    );
    setEditingId(null);
    setEditText("");
  };

 /* const deleteTodo = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };
*/
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="App">
      <h1 className="title">TaskMaster</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTodo}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
        />
        <button onClick={addTodo}>Add Task</button>
      </div>

      {todos.length === 0 && <p className="no-tasks">No tasks present</p>}

      <div className="task-container">
        {/* Not Urgent Section */}
        <div className="task-section not-urgent">
          <h2>Not Urgent</h2>
          <ul>
            {todos
              .filter((todo) => !todo.completed && !todo.urgent)
              .map((todo, index) => (
                <li key={todo.id} className="todo-item">
                  <span className="serial-no">{index + 1}.</span>
                  {editingId === todo.id ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                  ) : (
                    <span className="task-text">{todo.text}</span>
                  )}
                  <div className="actions">
                    {editingId === todo.id ? (
                      <button onClick={() => saveEdit(todo.id)}>Save</button>
                    ) : (
                      <>
                        <button onClick={() => toggleComplete(todo.id)}>
                          Complete
                        </button>
                        <button onClick={() => toggleUrgency(todo.id)}>
                          Urgent
                        </button>
                        <button onClick={() => startEditing(todo.id, todo.text)}>
                          Edit
                        </button>
                        <button onClick={() => deleteTodo(todo.id)}>
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </div>

        {/* Urgent Section */}
        <div className="task-section urgent">
          <h2>Urgent</h2>
          <ul>
            {todos
              .filter((todo) => !todo.completed && todo.urgent)
              .map((todo, index) => (
                <li key={todo.id} className="todo-item">
                  <span className="serial-no">{index + 1}.</span>
                  <span className="task-text">{todo.text}</span>
                  <div className="actions">
                    <button onClick={() => toggleComplete(todo.id)}>
                      Complete
                    </button>
                    <button onClick={() => toggleUrgency(todo.id)}>
                      Not Urgent
                    </button>
                    <button onClick={() => startEditing(todo.id, todo.text)}>
                      Edit
                    </button>
                    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                  </div>
                </li>
              ))}
          </ul>
        </div>

        {/* Completed Section */}
        <div className="task-section completed">
          <h2>Completed</h2>
          <ul>
            {todos
              .filter((todo) => todo.completed)
              .map((todo, index) => (
                <li key={todo.id} className="todo-item">
                  <span className="serial-no">{index + 1}.</span>
                  <span className="task-text">{todo.text}</span>
                  <div className="actions">
                    <button onClick={() => toggleComplete(todo.id)}>Undo</button>
                    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
