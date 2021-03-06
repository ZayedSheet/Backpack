import React, {useEffect} from 'react';
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
import {COURSES} from '../../DefaultData';
import { useNotificationProvider } from '../../NotificationProvider';

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

const defaultColor = '#2979ff';

export default function TransitionsModal(props) {

  const { calendarEvents, setCalendarEvents, myCourses } = useDataProvider();
  const {notify} = useNotificationProvider();
  const courses = [
    {
      value: 'None',
      label: 'None',
    },
    ...myCourses.map(x => ({value: x, label: x}))
  ]
  const classes = useStyles();

  const { modalState } = props;

  useEffect(() => {
    setType(modalState?.type ?? "None");
    setCourse(modalState?.course ?? "None");
  }, [modalState]); // Only re-run the effect if count changes


  const [type, setType] = React.useState("None");

  const [course, setCourse] = React.useState("None");

  const handleType = (event) => {
    setType(event.target.value);
  };

  const handleCourse = (event) => {
    setCourse(event.target.value);
  };

  const getTime = (num) => {
    const startTime = modalState?.start ?? new Date();

    const endTime = modalState?.end ?? new Date();
   

    switch(num){
      case 0:
        return moment(startTime).format('YYYY-MM-DD');
      case 1:
        return moment(startTime).format('HH:mm');
      case 2:
        return moment(endTime).format('HH:mm');
    }
  }

  const addEvent = (e) => {
    e.preventDefault();

    const date = e.target.elements.date.value;
    let startTime = getDateObject(date, e.target.elements.from.value);
    let endTime = getDateObject(date, e.target.elements.to.value);

    let c = COURSES.find(x => x.courseCode === course);

    if(startTime > endTime){
      const tempStartTime = startTime;
      startTime = endTime;
      endTime = tempStartTime;
    }

    const newEvent = {
      title: e.target.elements.eventName.value,
      type: type,
      course: course,
      description: e.target.elements.description.value,
      color : c ? c.color : defaultColor,
      start: startTime,
      end: endTime
    };

    if(modalState?.id){
      newEvent.id = modalState.id;
      const events = calendarEvents.filter((event) =>  event.id !== modalState.id);
      setCalendarEvents([...events, newEvent]);
      notify(`${newEvent.title} has been updated!`);
    } else {
      newEvent.id = getId();
      setCalendarEvents([...calendarEvents, newEvent]);
      notify(`${newEvent.title} has been added!`);
    }

    props.modalClose();
  }

  const deleteEvent = () => {
    let events;
    if (modalState.isCourse){
      events = calendarEvents.filter((event) =>  event.courseCode !== modalState.courseCode);
      events = events.map(x => x.course === modalState.courseCode ? ({...x, course: 'None', color: defaultColor}) : x);
    }
    else{
      events = calendarEvents.filter((event) =>  event.id !== modalState.id);
    }
    setCalendarEvents([...events]);
    props.modalClose();
  }

  const getDateObject = (date, time) =>  {
    return new Date (`${date}T${time}:00`);
  }

  var getId = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  const form = (
    <form onSubmit={(e) => addEvent(e)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h2 style={{color: "#414141"}} id="modal-title">{modalState?.isCourse ? 'Course Details' :  'Event Details'}</h2>
          <IconButton onClick={props.modalClose} style={{position: "absolute", top:  "15px", right: "15px"}} aria-label="exit">
            <ClearIcon/>
          </IconButton>
          <Divider style={{margin: "10px 0px"}}/>
        </Grid>

        <Grid item xs={6}>
          <TextField
            disabled={modalState?.isCourse}
            required 
            style={{width: "100%"}} 
            id="eventName" 
            label="Event Name" 
            defaultValue={modalState?.title ?? "" } 
            variant="outlined" 
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            disabled={modalState?.isCourse}
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
            disabled={modalState?.isCourse}
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
            disabled={modalState?.isCourse}
            className={classes.textfield}
            id="date"
            label="Date"
            variant="outlined"
            helperText="Enter the event date"
            type="date"
            defaultValue={getTime(0)}
            className={classes.textfield}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            disabled={modalState?.isCourse}
            id="from"
            label="From"
            type="time"
            variant="outlined"
            defaultValue={getTime(1)}
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
            disabled={modalState?.isCourse}
            id="to"
            label="To"
            type="time"
            helperText="Enter the end time"
            variant="outlined"
            defaultValue={getTime(2)}
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
            disabled={modalState?.isCourse}
            className={classes.textfield}
            style={{margin: "15px 0px"}} 
            defaultValue={modalState?.description ?? "" }
            id="description"
            label="Description"
            multiline
            rows={5}
            variant="outlined"
          />
          <Divider style={{margin: "10px 0px"}}/>
        </Grid>


        <Grid item container justify="space-between">
         
              <Grid xs={9} spacing={2} container item>
              <Grid item>
              {
                !modalState?.isCourse &&
                  <Button type= "submit" style={{backgroundColor: "#4051B5", color: "white", width: "125px"}}>{Boolean(modalState && modalState.id) ? "Update" : "Add"}</Button>
              }

              </Grid>
              <Grid item>
              {
                !modalState?.isCourse &&
                <Button onClick={props.modalClose} style={{backgroundColor: "#414141", color: "white", width: "125px"}}>Cancel</Button>
              }
              </Grid>
            </Grid>
       
          { Boolean(modalState?.isCourse || (modalState && modalState.id)) &&
            <Grid item>
              <Button onClick={deleteEvent} style={{backgroundColor: "#ff1744", color: "white", width: "125px"}}>Delete</Button>
            </Grid>
          }
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
