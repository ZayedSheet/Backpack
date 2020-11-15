import './App.css';
import React, { useState } from 'react';
import Routes from "./Routes";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import DataProvider from './DataProvider';
import Navbar from './components/Navbar/Navbar'

function App() {
  return (
    <Router>
      <DataProvider>
        <Navbar />
        <Routes />
      </DataProvider>
    </Router>
  );
}

export default App;
