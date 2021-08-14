import React from "react";
import { render, screen } from "@testing-library/react";
import MissionsList from "./MissionsList";

const missions = [
  { mission_name: "Mission 1", mission_id: 1 },
  { mission_name: "Mission 2", mission_id: 2 },
];

// sanity test
test("render without errors", () => {
  render(<MissionsList missions={[]} />);
});

test("renders missions list correctly", () => {
  const { rerender } = render(<MissionsList missions={[]} />);

  let missionObjects = screen.queryAllByTestId("mission");
  expect(missionObjects).toEqual([]);

  rerender(<MissionsList missions={missions} />);
  missionObjects = screen.queryAllByTestId("mission");
  expect(missionObjects).toHaveLength(2);
});
