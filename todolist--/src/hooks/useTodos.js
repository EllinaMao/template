import { useState, useRef, useEffect } from "react";

export const useTodos = (initialTasks = []) => {
  const [tasks, setTasks] = useState(initialTasks);
  const nextId = useRef(1);


  useEffect(() => {
    setTasks(initialTasks);
    
    if (initialTasks.length > 0) {
      const maxId = Math.max(...initialTasks.map(t => t.id));
      nextId.current = maxId + 1;
    }
  }, [initialTasks]); 
  const addTask = (text) => {
    if (!text || text.trim() === "") return;
    const newItem = {
      id: nextId.current++,
      text: text,
      completed: false,
    };
    setTasks((prev) => [newItem, ...prev]);
  };

  const toggleTaskCompletion = (id) => {
    setTasks((prev) => prev.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return { tasks, addTask, toggleTaskCompletion, deleteTask };
};