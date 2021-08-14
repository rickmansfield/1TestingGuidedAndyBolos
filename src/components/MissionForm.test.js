import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import MissionForm from "./MissionForm";

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
  const button = screen.queryByRole("button");
  // Assert
  expect(button).not.toBeNull();
  expect(button).toBeInTheDocument();
});
// When button is clicked, does getData execute?
test("calls getData when button is clicked", () => {
  const fakeGetData = jest.fn(() => {
    return "This is fake data";
  });
  // Arrange
  render(
    <MissionForm
      isFetchingData={false}
      getData={() => fakeGetData("Fake Data")}
    />
  );
  // Act
  const button = screen.queryByRole("button");
  fireEvent.click(button);

  // Assert
  console.log(fakeGetData.mock);
  expect(fakeGetData.mock.calls.length).toBe(1);

  expect(fakeGetData).toHaveBeenCalled();
  expect(fakeGetData).toHaveBeenCalledTimes(1);
});
