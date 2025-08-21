import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import TodoList from '../components/TodoList.jsx'

test('renders initial todos', () => {
  render(<TodoList />)
  expect(screen.getByText('Read requirements')).toBeInTheDocument()
  expect(screen.getByText('Build TodoList component')).toBeInTheDocument()
})

test('can add a new todo', () => {
  render(<TodoList />)
  fireEvent.change(screen.getByPlaceholderText(/what needs doing/i), {
    target: { value: 'New Task' },
  })
  fireEvent.click(screen.getByText(/add/i))
  expect(screen.getByText('New Task')).toBeInTheDocument()
})

test('can toggle a todo', () => {
  render(<TodoList />)
  const todo = screen.getByText('Build TodoList component')
  fireEvent.click(todo)
  expect(todo).toHaveStyle('text-decoration: line-through')
})

test('can delete a todo', () => {
  render(<TodoList />)
  const deleteButton = screen.getAllByText('Delete')[0]
  fireEvent.click(deleteButton)
  expect(screen.queryByText('Read requirements')).not.toBeInTheDocument()
})
