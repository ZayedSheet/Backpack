import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import { COURSES } from '../../DefaultData';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useDataProvider } from '../../DataProvider';

const drawerWidth = '26.5%';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    left: drawerWidth
  },
}));

//date fns
const getFirstSunday = () => {
  let today = new Date();
  //let date = new Date(today.getFullYear(),8, 1);
  let date = new Date(2018,0, 1);
  // while (date.getDay() !== 0){
  //   date.setDate(date.getDate() + 1);
  // }
  return date;
}


const CourseAccordion = ({ course }) => {
  const {setCalendarEvents, calendarEvents} = useDataProvider();
  const addedEvent = calendarEvents.find(x => x.isCourse && x.courseCode == course.courseCode);
  const isAdded = Boolean(addedEvent);
  const [selectedSection, setSelectedSection] = useState(isAdded ? addedEvent.section : course.sections[0]);

  const addCourse = () => {
    const baseDate = getFirstSunday();

    const courseEvents = [];
    for (let i = 0; i < 16; i++){
      for (let time of course.times){
        while (baseDate.getDay() !== time.day){
          baseDate.setDate(baseDate.getDate() + 1);
        }
        let newEvent = {
          title: course.name,
          description: course.description,
          start: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate(), time.from[0], time.from[1]), // end datetime
          end: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate(), time.to[0], time.to[1]), // end datetime
          color: course.color,
          type: 'Lecture',
          courseCode: course.courseCode,
          section: selectedSection,
          isCourse: true
        }
        courseEvents.push(newEvent);
      }
    }
    console.log(courseEvents);
    setCalendarEvents([...calendarEvents, ...courseEvents])
  }

  return (
    <Accordion style={{ width: '100%' }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Grid container>
          <Grid item xs={12}>
            <Typography variant={'h6'}>{course.courseCode}</Typography>

          </Grid>
          <Grid item xs={12}>
            <Typography variant={'subtitle1'}>{course.name}</Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <Box px={2} pb={3}>
        <div>
          <Grid container spacing={3} alignItems='center'>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Section</InputLabel>
                <Select
                  disabled={isAdded}
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                >
                  {
                    course.sections.map(x => (
                      <MenuItem value={x}>{x}</MenuItem>

                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Button
                style={{ minWidth: '100px' }}
                variant='contained'
                disabled={isAdded}
                color='primary'
                onClick={() => {
                  addCourse();
                }}

              >
                {isAdded ? "Added" : "Add"}
          </Button>
            </Grid>
          </Grid>
          <Box mt={5}/>
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <strong>Prerequisite(s)</strong>
              <Typography variant={'body1'}>{course.prerequisites}</Typography>
            </Grid>
            <Grid item xs={12}>
              <strong>Antirequisite(s)</strong>
              <Typography variant={'body1'}>{course.antirequisites}</Typography>
            </Grid>
            <Grid item xs={12} style={{ marginTop: 50 }}>
              <Typography variant='body1'>
                {
                  course.description
                }
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Box>
    </Accordion>
  )
}

export default ({ isSideBarOpen }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={isSideBarOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Box pt={10} px={2}>
          <Grid container>
            <Grid item xs={6}>
              Search Text
            </Grid>
            <Grid item xs={6} container xs={6} justify='flex-end'>
              Filter
            </Grid>
          </Grid>

          <Box py={4}>
            <Divider />
          </Box>
          <Grid container>
            {
              COURSES.map(x => {
                return (
                  <CourseAccordion course={x} />
                )
              })
            }
          </Grid>
        </Box>
      </Drawer>
    </div>
  );
}
