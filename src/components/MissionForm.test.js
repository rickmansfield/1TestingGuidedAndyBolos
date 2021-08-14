import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import MissionForm from "./MissionForm";
import userEvent from '@testing-library/user-event';

test("MissionForm renders correctly without errors", () => {
  render(<MissionForm />);
});

// Does the component render correctly when isFetchingData is true?
test("renders message correctly when isFetchingData is true", () => {
  // Arrange: render the component
  render(<MissionForm isFetchingData={true} />);
  // Act: get loading message
  const item = screen.queryByText(/we are fetching data/i);// query is better than "get" when using "expect"
  const button = screen.queryByRole("button");
  // Assert: does loading message exist on the screen
  expect(item).not.toBeNull();
  expect(item).toBeTruthy();
  expect(item).toBeInTheDocument();
  expect(item).not.toBeFalsy();
  expect(item).toHaveTextContent(/we are fetching data/i);
  expect(button).not.toBeInTheDocument();
});


// Does the component render correctly when isFetchingData is false?
test("renders button correctly when isFetchingData is false", () => {
  // Arrange
  render(<MissionForm isFetchingData={false} />);
  // Act
  const item = screen.queryByText(/we are fetching data/i);
  const button = screen.getByRole("button");
  // Assert
  expect(item).not.toBeInTheDocument();
  expect(button).toBeInTheDocument();
  
});


// When button is clicked, does getData execute?
test("calls getData when button is clicked", () => {
  const fakeGetData = jest.fn(() => {
    return "This is fake data";
  });
  // Arrange: renders component
  render(
    <MissionForm
      isFetchingData={false}
      getData={() => fakeGetData("Fake Data")}
    />
  );
  // Act: click button
  const button = screen.queryByRole("button");
  //use screen.getByRole when not explicity testing. 
  // fireEvent.click(button);
  userEvent.click(button);//will also work. Note, this will break the test because props.getData() doesn't exist before adding fakedata to the render function. 
  userEvent.click(button);
  userEvent.click(button);
console.log(fakeGetData.mock);
  // Assert
  console.log(fakeGetData.mock);
  expect(fakeGetData.mock.calls.length).toBe(3);
  expect(fakeGetData.mock.calls.length === 3).toBeTruthy();
  expect(fakeGetData).toHaveBeenCalled();
  expect(fakeGetData).toHaveBeenCalledTimes(3);
  
});
