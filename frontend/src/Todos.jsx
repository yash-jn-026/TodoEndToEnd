import React from "react";

function Todos({ todos, markAsComplete }) {
  return (
    <div>
      {todos.map((todo, index) => (
        <div key={index}>
          <h2>{todo.title}</h2>
          <p>{todo.description}</p>
          <button onClick={() => markAsComplete(todo._id)}>
            {todo.completed ? "Complete" : "Incomplete"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Todos;
