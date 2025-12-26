import React, { useState, useEffect } from "react";
import { useTodos } from "../hooks/useTodos";
import "../assets/css/ToDoList.css";

const ToDoList = () => {
  const [fetchedTasks, setFetchedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);//

  useEffect(() => {
    fetch("https://dummyjson.com/todos")
      .then((res) => {
        if (!res.ok) throw new Error("Ошибка сети");
        return res.json(); 
      })
      .then((data) => {
        console.log("Данные с сервера:", data);

        if (!data || !data.todos) {
          throw new Error("Некорректный формат данных");
        }

        const formatted = data.todos.map((t) => ({
          id: t.id,
          text: t.todo,
          completed: t.completed,
        }));
        setFetchedTasks(formatted);
      })
      .catch((err) => {
        console.error("Не удалось загрузить задачи:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const { tasks, addTask, toggleTaskCompletion, deleteTask } =
    useTodos(fetchedTasks);

  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(inputValue);
    setInputValue("");
  };

  if (isLoading) return <p>loading...</p>;

  return (
    <div className="todo-container">
      <h1 className="todo-header">To do</h1>

      <form onSubmit={handleSubmit} className="todo-form">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="New task..."
          className="todo-input"
        />
        <button type="submit" className="btn-primary">
          Add
        </button>
      </form>

      <ul className="todo-list">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`todo-item ${task.completed ? "completed" : ""}`}
          >
            <span
              onClick={() => toggleTaskCompletion(task.id)}
              className="todo-text"
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)} className="btn-delete">
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
