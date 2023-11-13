import mongoose, { Schema } from "mongoose";

const todoModel = new Schema({
  userId: { type: String, required: true },
  date: { type: String, required: true },
  todos: [
    {
      sortedId: { type: Number, required: true, default: 0 },
      mainTodo: {
        content: { type: String, default: "" },
        done: { type: Boolean, required: true },
      },
      subTodos: [
        {
          content: { type: String, default: "" },
          done: { type: Boolean },
        },
      ],
    },
  ],
});

const TodoModel = mongoose.models.todos || mongoose.model("todos", todoModel);

export default TodoModel;
