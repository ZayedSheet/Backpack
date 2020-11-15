import { Grid } from '@material-ui/core';
import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import Calendar from './Calendar/Calendar';

export default () => {
  return (
      <Grid container justify='center'>
        <Grid item xs={10}>
          <Calendar />
        </Grid>
      </Grid>
  );
}