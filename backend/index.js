const express = require("express");
const { createTodo, updateTodo } = require("./types");
const cors = require("cors");
const { todo } = require("./db");
const app = express();

const port = 3000;

app.use(express.json());
app.use(cors());

app.post("/todo", async (req, res) => {
  const createPayload = req.body;
  const parsePayload = createTodo.safeParse(createPayload);
  if (!parsePayload.success) {
    res.status(411).json({
      message: "you must have invalid input",
    });
    return;
  }
  await todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false,
  });
  res.status(201).json({ message: "todo created successfully" });
});

app.get("/todos", async (req, res) => {
  try {
    const todos = await todo.find({});
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos", error });
  }
});

app.put("/completed", async (req, res) => {
  const updatePayload = req.body;
  const parsePayload = updateTodo.safeParse(updatePayload);
  if (!parsePayload.success) {
    res.status(411).json({
      message: "you must have invalid input",
    });
    return;
  }
  await todo.findByIdAndUpdate(req.body._id, {
    completed: true,
  });

  res.json({
    message: "todo completed successfully",
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
