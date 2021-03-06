import { Box, Grid, Paper, Select, FormControl, InputLabel, MenuItem, Divider, FormControlLabel, Checkbox } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDataProvider } from '../../DataProvider';
import Calendar from '../Calendar/Calendar';
import Modal from '../Modal/Modal';
import SideBar from '../SideBar/SideBar';

export default () => {
  const { calendarEvents, setCalendarEvents } = useDataProvider();

  const [isModalOpen, setModal] = React.useState(false);
  const [modalState, setModalState] = React.useState(null);
  const [isSideBarOpen, setSideBar] = React.useState(false);
  const [filterForm, setFilterForm] = useState({
    courseCode: '*',
    type: '*',
    showInstructor: true,
    showSection: true,
    showType: true,
  });

  const modalOpen = () => {
    setModal(true);
  };

  const modalClose = () => {
    setModal(false);
    setModalState(null);
    console.log("modalState", modalState);
  };

  const hideEvent = (event) => {
    const showEvent = (filterForm.courseCode == '*' || filterForm.courseCode == event.courseCode || filterForm.courseCode == event.course) &&
      (filterForm.type == '*' || filterForm.type == event.type);
    return !showEvent;
  }

  useEffect(() => {
    let filteredData = calendarEvents.map(x => ({ ...x, hidden: hideEvent(x) }));
    setCalendarEvents(filteredData);
  }, [filterForm]);

  const eventSelect = (event) => {
    // if(event.isCourse){
    //   return;
    // }
    
    setModalState(event);
    modalOpen();
  }

  const onSelectSlot = (start, end) => {
    setModalState({start, end });
    modalOpen();
  }

  return (
    <>
        <Box mt={5} />
        <Grid container justify='center'>
          <Grid item xs={11} container >
            <Grid itemx xs={12} container spacing={2}>
              <Grid item xs={3}>
                <Box mt={6} />
                <Paper elevation={4} style={{ height: "650px" }}>
                  <Box p={2}>
                    <Grid container item xs={7}>
                    <h3>Filter Calendar</h3>
                      <FormControl fullWidth>
                        <InputLabel>Course</InputLabel>
                        <Select
                          value={filterForm.courseCode || '*'}
                          onChange={(e) => {
                            setFilterForm({ ...filterForm, courseCode: e.target.value })
                          }}
                        >
                          <MenuItem value={'*'}>All</MenuItem>
                          {
                            [...new Set(calendarEvents.filter(x => x.courseCode).map(x => x.courseCode))].map(x => (
                              <MenuItem value={x}>{x}</MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </Grid>
                    <Box mt={3} />
                    <Grid container item xs={7}>
                      <FormControl fullWidth>
                        <InputLabel>Type</InputLabel>
                        <Select
                          value={filterForm.type || '*'}
                          onChange={(e) => {
                            setFilterForm({ ...filterForm, type: e.target.value })
                          }}
                        >
                          <MenuItem value={'*'}>All</MenuItem>
                          {
                            [...new Set(calendarEvents.filter(x => x.type).map(x => x.type))].map(x => (
                              <MenuItem value={x}>{x}</MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </Grid>
                    <Box mt={3} />
                    <Divider />
                    <Box mt={3} />

                    <Grid container item xs={12}>
                      <Grid item xs={12}>
                      <h3>Toggle Course Info</h3>
                      <FormControlLabel
                        control={<Checkbox size='small' color='primary' checked={filterForm.showSection} onChange={(e) => setFilterForm({ ...filterForm, showSection: e.target.checked })} />}
                        label="Show Section"
                      />
                      </Grid>
                      <Grid item xs={12}>
                      <FormControlLabel
                        control={<Checkbox size='small' color='primary' checked={filterForm.showInstructor} onChange={(e) => setFilterForm({ ...filterForm, showInstructor: e.target.checked })} />}
                        label="Show Instructor"
                      />
                      <Divider style={{margin: "15px 0px"}}/>
                      </Grid>
                      <h3>Toggle Event Info</h3>
                      <Grid item xs={12}>
                      <FormControlLabel
                        control={<Checkbox size='small' color='primary' checked={filterForm.showType} onChange={(e) => setFilterForm({ ...filterForm, showType: e.target.checked })} />}
                        label="Show Type"
                      />
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={9}>
                <div style={{ height: '750px' }}>
                  <Calendar filterForm={filterForm} modalOpen={modalOpen} setSideBar={setSideBar} isSideBarOpen={isSideBarOpen} eventSelect={eventSelect} onSelectSlot={onSelectSlot}/>
                </div>
              </Grid>

            </Grid>
          </Grid>
        </Grid>
      <Modal modalState={modalState} modalClose={modalClose} isModalOpen={isModalOpen} />
      <SideBar isSideBarOpen={isSideBarOpen} setSideBar={setSideBar} />
    </>
  );
}