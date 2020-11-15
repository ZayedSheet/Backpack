import './App.css';
import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import HomePage from './components/HomePage/HomePage';

function Routes() {
  return (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>
  );
}

export default Routes;