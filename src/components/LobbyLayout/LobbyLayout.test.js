import React from "react";
import { render } from "@testing-library/react";
import LobbyLayout from "./LobbyLayout";

test("renders without crashing", () => {
  render(<LobbyLayout />);
});
