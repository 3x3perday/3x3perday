import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
  userId: { type: String, required: true },
  date: { type: String, required: true },
  todos: [
    {
      sortedId: { type: Number, required: true, default: 0 },
      mainTodo: {
        content: { type: String, default: "" },
        done: { type: Boolean, required: true, default: false },
      },
      subTodos: [
        {
          content: { type: String, default: "" },
          done: { type: Boolean, default: false },
        },
      ],
    },
  ],
});

const TodoModel = mongoose.models.todos || mongoose.model("todos", todoSchema);

export default TodoModel;
