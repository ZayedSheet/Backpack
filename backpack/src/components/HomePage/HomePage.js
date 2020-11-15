import { Box, Grid, Button } from '@material-ui/core';
import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import Calendar from '../Calendar/Calendar';
import Modal from '../Modal/Modal';
import SideBar from  '../SideBar/SideBar';

export default () => {

  const [isModalOpen, setModal] = React.useState(false);
  const [isSideBarOpen, setSideBar] = React.useState(false);

  const modalOpen = () => {
    setModal(true);
  };

  const modalClose = () => {
    setModal(false);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setSideBar(open);
  };


  return (
    <>
      <Box mt={5} />
      <Grid container justify='center'>
        <Grid item xs={10} container>
          <Grid item xs={12}>
            <Button onClick={modalOpen}>Open Modal</Button>
            <Button onClick={toggleDrawer(true)}>Add Course</Button>
          </Grid>
          <Grid itemx xs={12}>
            <Calendar />
          </Grid>

        </Grid>
      </Grid>
      <Modal modalClose={modalClose} isModalOpen={isModalOpen} />
      <SideBar toggleDrawer={toggleDrawer} isSideBarOpen={isSideBarOpen}/>
    </>
  );
}