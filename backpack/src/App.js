import './App.css';
import React, { useState } from 'react';
import Routes from "./Routes";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import DataProvider from './DataProvider';
import Navbar from './components/Navbar/Navbar'
import Modal from './components/Modal/Modal'
import Button from '@material-ui/core/Button';

function App() {
  const [calendar, setCalendar] = useState();
  const Context = React.createContext();
  const store = {
    setCalendar: () => { },
    calendar: [],
  }

  const [isModalOpen, setOpen] = React.useState(false);

  const modalOpen = () => {
    setOpen(true);
  };

  const modalClose = () => {
    setOpen(false);
  };

  return (
    <Router>
    <DataProvider>
      <Navbar />
      <Routes />
      <Button onClick={modalOpen}>Open Modal</Button>
      <Modal modalClose={modalClose} isModalOpen={isModalOpen} />
    </DataProvider>
    </Router>
  );
}

export default App;
