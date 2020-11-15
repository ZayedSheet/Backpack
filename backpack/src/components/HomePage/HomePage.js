import { Box, Grid, Button } from '@material-ui/core';
import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import Calendar from '../Calendar/Calendar';
import Modal from '../Modal/Modal'

export default () => {

  const [isModalOpen, setOpen] = React.useState(true);

  const modalOpen = () => {
    setOpen(true);
  };

  const modalClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box mt={5} />
      <Grid container justify='center'>
        <Grid item xs={10} container>
          <Grid item xs={12}>
            <Button onClick={modalOpen}>Open Modal</Button>
          </Grid>
          <Grid itemx xs={12}>
            <Calendar />
          </Grid>

        </Grid>
      </Grid>
      <Modal modalClose={modalClose} isModalOpen={isModalOpen} />
    </>
  );
}