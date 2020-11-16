import './App.css';
import React, { useState } from 'react';
import Routes from "./Routes";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import DataProvider from './DataProvider';
import Navbar from './components/Navbar/Navbar'
import { Box } from '@material-ui/core';
import NotificationProvider from './NotificationProvider';

function App() {
  return (
    <Router>
      <DataProvider>
        <Navbar />
        <Box pt={5} />
        <NotificationProvider>
          <Routes />
        </NotificationProvider>
      </DataProvider>
    </Router>
  );
}

export default App;
