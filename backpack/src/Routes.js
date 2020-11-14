import './App.css';
import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";

function Routes() {
  return (
        <Switch>
          <Route exact path="/">
            Home
          </Route>
          <Route exact path="/a">
            A
          </Route>
        </Switch>
  );
}

export default Routes;
