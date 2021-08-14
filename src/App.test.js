import React from "react";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { fetchMissions as mockFetchMissions } from "./api/fetchMissions";
jest.mock("./api/fetchMissions");

// Add sanity test
test("renders App without error", () => {
  render(<App />);
});

test("renders mission data when button is clicked", async () => {
  mockFetchMissions.mockResolvedValueOnce({
    data: [
      { mission_name: "Mission 1", mission_id: 1 },
      { mission_name: "Mission 2", mission_id: 2 },
    ],
  });
  // Arrange : render App Component
  render(<App />);
  // Act : click button... get data.. from api?...
  const button = screen.queryByRole("button");
  // fireEvent.click(button);
  userEvent.click(button);//also works

  // Assert : we should see same number of missions as returned. i.e. find mission entries and test that all of them are there. They are asynchronous event so you need and await.
  await waitFor(() => {
    expect(screen.getAllByTestId("mission")).toHaveLength(2);
  });
});

//Note using a live api can be problematic. 
//Provider Servers are down 
//Data might change
//CORS policy errors
//Throtled api calls 
