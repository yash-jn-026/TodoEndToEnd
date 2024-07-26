import React, { useState, useEffect } from "react";
import CreateTodo from "./compoments/CreateTodo";
import Todos from "./Todos";


function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch("http://localhost:3000/todos");
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }

    fetchTodos();
  }, []);

  async function markAsComplete(id) {
    try {
      const response = await fetch("http://localhost:3000/completed", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });

      if (!response.ok) {
        throw new Error("Failed to mark todo as complete");
      }

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, completed: true } : todo
        )
      );
    } catch (error) {
      console.error("Error marking todo as complete:", error);
    }
  }

  return (
    <>
      <h1>To-Do List</h1>
      <CreateTodo />
      <Todos todos={todos} markAsComplete={markAsComplete} />
    </>
  );
}

export default App;
