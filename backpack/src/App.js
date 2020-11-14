import './App.css';
import React, { useState } from 'react';
import Routes from "./Routes";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import DataProvider from './DataProvider';

function App() {
  const [calendar, setCalendar] = useState();
  const Context = React.createContext();
  const store = {
    setCalendar: () => { },
    calendar: [],
  }

  return (
    <Router>
    <DataProvider>
      <Routes />
    </DataProvider>
    </Router>
  );
}

export default App;
