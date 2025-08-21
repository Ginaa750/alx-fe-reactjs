import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

test("renders initial todos", () => {
  render(<TodoList />);
  expect(screen.getByText(/Read requirements/i)).toBeInTheDocument();
});

test("can add a new todo", () => {
  render(<TodoList />);
  fireEvent.change(screen.getByPlaceholderText(/What needs doing/i), {
    target: { value: "New Task" },
  });
  fireEvent.click(screen.getByText(/Add/i));
  expect(screen.getByText(/New Task/i)).toBeInTheDocument();
});

test("can toggle a todo", () => {
  render(<TodoList />);
  const todo = screen.getByText(/Read requirements/i);
  fireEvent.click(todo);
  expect(todo).toHaveStyle("text-decoration: line-through");
});

test("can delete a todo", () => {
  render(<TodoList />);
  const todo = screen.getByText(/Read requirements/i);
  fireEvent.click(screen.getAllByText(/Delete/i)[0]);
  expect(todo).not.toBeInTheDocument();
});
