import React from "react";
import { render } from "@testing-library/react";
import NewGame from "./NewGame";

test("renders without crashing", () => {
  render(<NewGame />);
});
