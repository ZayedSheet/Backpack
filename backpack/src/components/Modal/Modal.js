import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #4051B5',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(0, 3, 3),
    width: "50%",
    position: "relative"
  },
}));

const times = [
  {
    value: 'None',
    label: 'None',
  },
  {
    value: 'Assignment',
    label: 'Assignment',
  },
  {
    value: 'Midterm',
    label: 'Midterm',
  },
  {
    value: 'Exam',
    label: 'Exam',
  },
  {
    value: 'Lab',
    label: 'Lab',
  },
];

export default function TransitionsModal(props) {
  const classes = useStyles();

  const [time, setTime] = React.useState('None');

  const handleChange = (event) => {
    setTime(event.target.value);
  };

  const form = (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h2 style={{color: "#414141"}} id="modal-title">Event Details</h2>
          <IconButton style={{position: "absolute", top:  "15px", right: "15px"}} aria-label="exit">
            <ClearIcon/>
          </IconButton>
          <Divider style={{margin: "10px 0px"}}/>
        </Grid>

        <Grid item xs={6}>
          <TextField style={{width: "100%"}} id="outlined-multiline-static" label="Outlined" variant="outlined" />
        </Grid>
        <Grid item xs={3}>
          <TextField
            style={{width: "100%"}}
            id="outlined-select-currency"
            select
            label="Select"
            value={time}
            onChange={handleChange}
            helperText="Please select your currency"
            variant="outlined"
          >
            {times.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={3}>
          <TextField
            style={{width: "100%"}}
            id="outlined-select-currency"
            select
            label="Select"
            value={time}
            onChange={handleChange}
            helperText="Please select your currency"
            variant="outlined"
          >
            {times.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={6}>
          <TextField style={{width: "100%"}} id="outlined-multiline-static" label="Outlined" variant="outlined" />
        </Grid>
        <Grid item xs={3}>
          <TextField
            style={{width: "100%"}}
            id="outlined-select-currency"
            select
            label="Select"
            value={time}
            onChange={handleChange}
            helperText="Please select your currency"
            variant="outlined"
          >
            {times.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={3}>
          <TextField
            style={{width: "100%"}}
            id="outlined-select-currency"
            select
            label="Select"
            value={time}
            onChange={handleChange}
            helperText="Please select your currency"
            variant="outlined"
          >
            {times.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            style={{width: "100%", margin: "15px 0px"}} 
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows={5}
            defaultValue="Default Value"
            variant="outlined"
          />
          <Divider style={{margin: "10px 0px"}}/>
        </Grid>

        <Grid item xs={2}>
          <Button style={{backgroundColor: "#4051B5", color: "white", width: "95%"}}>Update</Button>
        </Grid>
        <Grid item xs={2}>
          <Button style={{backgroundColor: "#414141", color: "white", width: "95%"}}>Cancel</Button>
        </Grid>
      </Grid>
    </form>
  );

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.isModalOpen}
        onClose={props.modalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.isModalOpen}>
          <div style={{outline: "none"}} className={classes.paper}>
            {form}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
