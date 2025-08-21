import { useState } from 'react'
import AddTodoForm from './AddTodoForm.jsx'

const initialTodos = [
  { id: 1, text: 'Read requirements', completed: true },
  { id: 2, text: 'Build TodoList component', completed: false },
  { id: 3, text: 'Write tests with RTL', completed: false },
]

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos)

  const addTodo = (text) => {
    setTodos((prev) => [
      ...prev,
      { id: prev.length + 1, text, completed: false },
    ])
  }

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    )
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div>
      <AddTodoForm onAdd={addTodo} />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <button onClick={() => toggleTodo(todo.id)}>
              {todo.completed ? <s>{todo.text}</s> : todo.text}
            </button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
