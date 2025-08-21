import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import TodoList from '../components/TodoList.jsx'

describe('TodoList', () => {
  test('renders initial todos', () => {
    render(<TodoList />)

    // Expect at least one demo todo to appear (adjust if your initial text differs)
    expect(
      screen.getByText(/read requirements|learn react|build todo/i)
    ).toBeInTheDocument()
  })

  test('adds a new todo', () => {
    render(<TodoList />)

    // Works with the placeholder "What needs doing?"
    const input =
      screen.getByPlaceholderText(/what needs doing/i) ||
      screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'New Task' } })

    // Click the Add button (text "Add")
    fireEvent.click(screen.getByText(/add/i))

    expect(screen.getByText(/new task/i)).toBeInTheDocument()
  })

  test('toggles a todo completed state', () => {
    render(<TodoList />)

    // Click the first todo text (assumes clicking text toggles)
    const anyTodo =
      screen.queryByText(/read requirements/i) ||
      screen.queryByText(/learn react/i) ||
      screen.getAllByRole('button', { name: /delete/i })[0].previousSibling

    // If your list renders text inside a <span>, click it
    fireEvent.click(anyTodo)

    // After toggle, it should appear with line-through
    expect(anyTodo).toHaveStyle({ textDecoration: 'line-through' })
  })

  test('deletes a todo', () => {
    render(<TodoList />)

    // Click the first "Delete" button
    const deleteButtons = screen.getAllByText(/delete/i)
    const firstDelete = deleteButtons[0]

    // Capture the todo text element next to it (simple heuristic)
    const li = firstDelete.closest('li')
    const textEl = li?.querySelector('span,button,div') || li?.firstChild
    const textContent = textEl?.textContent

    fireEvent.click(firstDelete)

    if (textContent) {
      expect(screen.queryByText(textContent)).not.toBeInTheDocument()
    } else {
      // Fallback: at least ensure the number of delete buttons reduced
      const after = screen.getAllByText(/delete/i)
      expect(after.length).toBeLessThan(deleteButtons.length)
    }
  })
})
