import React from "react";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
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
  // Arrange : render app
  render(<App />);
  // Act : click button... get data.. from api?...
  const button = screen.queryByRole("button");
  fireEvent.click(button);

  // Assert : we should see same number of missions as returned
  await waitFor(() => {
    expect(screen.getAllByTestId("mission")).toHaveLength(2);
  });
});
