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


//Arrange: render missionList with no mission inside
test("renders missions list correctly", () => {
  const { rerender } = render(<MissionsList missions={[]} />);
  //Act find missions on scree
  let missionObjects = screen.queryAllByTestId("mission");
  //Assert: verify that no missions are on creen
  expect(missionObjects).toEqual([]);
  //Append & repeat
  rerender(<MissionsList missions={missions} />);
  missionObjects = screen.queryAllByTestId("mission");
  expect(missionObjects).toHaveLength(2);
});
