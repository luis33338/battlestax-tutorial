import React from "react";
import { Switch, Route } from "react-router-dom";
import NewGame from "../../pages/lobby/NewGame";

export default function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/">
          <NewGame />
        </Route>
        <Route exact path="/lobby">
          <NewGame />
        </Route>
      </Switch>
    </React.Fragment>
  );
}
