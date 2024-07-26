/*
        todo{
        title :string,
        description: string,
        completed: boolean

*/

require("dotenv").config(); // Load environment variables from.env file.
const mongoose = require("mongoose");
const dbUri = process.env.MONGODB_URI// connect to MongoDB string 


mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

// Define the schema for a todo item.
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

// Export the model for use in other parts of the application.

const todo = mongoose.model("todo", todoSchema);
module.exports = {
  todo
};