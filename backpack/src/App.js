import './App.css';
import React, { useState } from 'react';
import Routes from "./Routes";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import DataProvider from './DataProvider';
import Navbar from './components/Navbar/Navbar'
import { Box } from '@material-ui/core';

function App() {
  return (
    <Router>
      <DataProvider>
        <Navbar />
        <Box pt={5} />
        <Routes />
      </DataProvider>
    </Router>
  );
}

export default App;
