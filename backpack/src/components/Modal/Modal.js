import React from 'react';
import getColor from '../../utils/colorUtil';
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
import moment from 'moment';
import { useDataProvider } from '../../DataProvider';

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
  textfield: {
    width: "100%",
  }
}));

const types = [
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

const courses = [
  {
    value: 'None',
    label: 'None',
  },
  {
    value: 'COMPSCI 4HC3',
    label: 'COMPSCI 4HC3',
  },
  {
    value: 'SFRWENG 1234',
    label: 'SFRWENG 1234',
  },
  {
    value: '4AA4',
    label: '4AA4',
  },
  {
    value: '4MC3',
    label: '4MC3',
  }
]

export default function TransitionsModal(props) {
  const { calendarEvents, setCalendarEvents } = useDataProvider();

  const classes = useStyles();

  const currentDate = moment(new Date()).format("YYYY-MM-DD");

  const [type, setType] = React.useState('None');

  const handleType = (event) => {
    setType(event.target.value);
  };

  const [course, setCourse] = React.useState('None');

  const handleCourse = (event) => {
    setCourse(event.target.value);
  };

  const addEvent = (e) => {
    e.preventDefault();

    const newEvent = {};
    newEvent.title = e.target.elements['eventName'].value
    newEvent.type = type;
    newEvent.course = course;
    newEvent.description = e.target.elements['description'].value;
    newEvent.color = getColor(newEvent.course);

    const date = e.target.elements['date'].value;
    const startTime = e.target.elements['from'].value;
    const endTime = e.target.elements['to'].value;

    newEvent.start = getDateObject(date, startTime);
    newEvent.end = getDateObject(date, endTime);

    setCalendarEvents([...calendarEvents, newEvent]);
    props.modalClose();
  }

  const getDateObject = (date, time) =>  {
    return new Date (`${date}T${time}:00`);
  }

  const form = (
    <form onSubmit={(e) => addEvent(e)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h2 style={{color: "#414141"}} id="modal-title">Event Details</h2>
          <IconButton onClick={props.modalClose} style={{position: "absolute", top:  "15px", right: "15px"}} aria-label="exit">
            <ClearIcon/>
          </IconButton>
          <Divider style={{margin: "10px 0px"}}/>
        </Grid>

        <Grid item xs={6}>
          <TextField style={{width: "100%"}} id="eventName" label="Event Name" variant="outlined" />
        </Grid>
        <Grid item xs={3}>
          <TextField
            className={classes.textfield}
            id="course"
            select
            label="Course"
            value={course}
            onChange={handleCourse}
            variant="outlined"
          >
            {courses.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={3}>
          <TextField
              className={classes.textfield}
              id="eventType"
              select
              label="Type"
              value={type}
              onChange={handleType}
              variant="outlined"
            >
              {types.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
        </Grid>

        <Grid item xs={6}>
          <TextField
            className={classes.textfield}
            id="date"
            label="Date"
            variant="outlined"
            helperText="Enter the event date"
            type="date"
            defaultValue={currentDate}
            className={classes.textfield}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="from"
            label="From"
            type="time"
            variant="outlined"
            defaultValue="08:00"
            helperText="Enter the start time"
            className={classes.textfield}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 60, // 1 min
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="to"
            label="To"
            type="time"
            helperText="Enter the end time"
            variant="outlined"
            defaultValue="08:15"
            className={classes.textfield}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 60, // 1 min
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            className={classes.textfield}
            style={{margin: "15px 0px"}} 
            id="description"
            label="Description"
            multiline
            rows={5}
            variant="outlined"
          />
          <Divider style={{margin: "10px 0px"}}/>
        </Grid>

        <Grid item xs={2}>
          <Button type= "submit" style={{backgroundColor: "#4051B5", color: "white", width: "95%"}}>Update</Button>
        </Grid>
        <Grid item xs={2}>
          <Button onClick={props.modalClose} style={{backgroundColor: "#414141", color: "white", width: "95%"}}>Cancel</Button>
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
