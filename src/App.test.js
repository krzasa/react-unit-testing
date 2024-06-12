import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

test('Checks existance of  To-Do List text', () => {
  const app = render(<App />);
  const headingElement = app.getByText("To-Do List"); 
  expect(headingElement).toBeInTheDocument(); // "Is the sentence "To do list" in the document
});

test('can I add a new task?', () => { // Tests adding a new task and checks if the new task is displayed.
  const app = render(<App />);
  const inputElement = app.getByPlaceholderText("Add a new task"); // this checks if the hint is in the input element 
  const addButton = app.getByText("Add");

  fireEvent.change(inputElement, { target: { value: 'New Task' } }); // checks if the input box value is changed
  fireEvent.click(addButton);

  const taskElement = app.getByText("New Task");
  expect(taskElement).toBeInTheDocument(); // check if the element that was created is in the file.
});

test('can I delete a task?', () => {  // Tests deleting a task and checks if the task is removed from the document
  const app = render(<App />);
  const inputElement = app.getByPlaceholderText("Add a new task");  // this checks if the hint is in the input element 
  const addButton = app.getByText("Add");

  fireEvent.change(inputElement, { target: { value: 'Task to Delete' } });
  fireEvent.click(addButton);

  const deleteButton = app.getByText("Delete");  // is there a button with the text "delete"
  fireEvent.click(deleteButton);  // if you get a text of "delete" after click

  expect(app.queryByText("Task to Delete")).not.toBeInTheDocument(); // check if the list item was deleted and not in the document anymore
});