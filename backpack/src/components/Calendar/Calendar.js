import React, { useState } from 'react';
import { render } from 'react-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box, Button, Chip, Grid, IconButton, makeStyles, Paper, Popover, Typography } from '@material-ui/core';
import { useDataProvider } from '../../DataProvider';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
    DatePicker, MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateRangeIcon from '@material-ui/icons/DateRange';
moment.locale('en-GB');
const localizer = momentLocalizer(moment);

const useStyles = makeStyles((theme) => ({
    popover: {
      pointerEvents: 'none',
      marginLeft:'10px',
      marginRight:'10px',
    },
    paper: {
      padding: theme.spacing(1),
    },
    
  }));

const MonthEvent = ({ event }) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (e) => {
        console.log('open')
      setAnchorEl(e.currentTarget);
    };
  
    const handlePopoverClose = () => {
        console.log('close')
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);

    const formatDateRange = () => {
        let {start, end} = event;
        return `${event.start.toDateString()}, ${moment(start).format('hh:mm A')} - ${moment(end).format('hh:mm A')}`;
    }

    const formatDescription = () => {
        const maxLength = 100;
        return event.description.length > maxLength ? `${event.description.substring(0, maxLength - 3)}...` : event.description;
    }

    return (
        <div  
        style={{height:'100%'}}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        >
        <Grid 
            container 
           
        >
            <Grid item xs={12}>
                <Typography variant='subtitle1'>
                    {event.isCourse ? event.courseCode : event.title}
                </Typography>
            </Grid>
            {
                event.type &&
                <Grid item xs={12}>
                    <Chip onClick={() => { }} label={event.type} color='primary' size='small' />
                </Grid>
            }
        </Grid>
        <Popover
            className={classes.popover}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            onClose={handlePopoverClose}
        >
            <Paper style={{minWidth: '200px', maxWidth:'300px'}}>
                <Box py={1} px={2}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant='caption'>
                                {formatDateRange()}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='h6'>
                                {event.title}
                            </Typography>
                        </Grid>
                        
                        {
                            Boolean(event.isCourse && event.courseCode) &&
                                <Grid item xs={12}>
                                    <Typography variant='subtitle1'>
                                        {event.courseCode}
                                    </Typography>
                                </Grid>
                            
                        }
                        {
                            Boolean(!event.isCourse && event.course) &&
                                <Grid item xs={12}>
                                    <Typography variant='subtitle1'>
                                        {event.course}
                                    </Typography>
                                </Grid>
                            
                        }
                        {
                                <Grid item xs={12}>
                                    <Typography variant='subtitle1'>
                                        {event.type === 'None' ? 'Event' : event.type}
                                    </Typography>
                                </Grid>
                        }
                        {
                            event.description &&
                            <Grid item xs={12} style={{marginTop: '10px', maxWidth:'100%', maxHeight:'100px'}}>
                            <Typography variant='body1' style={{wordWrap:'break-word'}}>
                                {formatDescription()}
                            </Typography>
                        </Grid>
                        }
                        
                    </Grid>
                </Box>
            </Paper>
      </Popover>
        </div>
    )
};

const eventPropGetter = (event, start, end, isSelected) => {
    //var backgroundColor = '#' + event.hexColor;
    var style = {
        backgroundColor: event.color,
        borderRadius: '0px',
        opacity: 0.8,
        color: 'black',
        border: '0px',
        display: 'block'
    };
    return {
        style: style
    };
}



export default (props) => {
    const [targetDate, setTargetDate] = useState(new Date());
    const CustomToolbar = ({ label }) => {
        const {modalOpen, setSideBar, isSideBarOpen} = props;
        const [openDatePicker, setOpenDatePicker] = useState(false);
        return (
            <Grid container alignItems='center'>
                <Grid item xs={4}>
                    <Button onClick={() => setSideBar(!isSideBarOpen)}>Add Course</Button>
                    <Button onClick={modalOpen}>Add Event</Button>
                </Grid>
                <Grid item xs={4} container justify='center' alignItems='center'>
                    <Typography variant='body1'>
                        {label}, {targetDate.getFullYear()}
                    </Typography>
    
                    <IconButton onClick={() => {
                        setOpenDatePicker(true)
                    }}>
                        <DateRangeIcon />
                    </IconButton>
    
                    <div style={{ display: 'none' }}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker onClose={() => setOpenDatePicker(false)} value={targetDate} autoOk okLabel='' cancelLabel='' open={openDatePicker} onChange={(date) => {
                                setTargetDate(date);
                            }} />
                        </MuiPickersUtilsProvider>
                    </div>
    
                </Grid>
                <Grid item xs={4} container justify='flex-end'>
                    <IconButton
                        onClick={() => {
                            let newDate = new Date(targetDate.getTime());
                            newDate.setDate(newDate.getDate() - 7);
                            setTargetDate(newDate);
                        }}
                    >
                        <ChevronLeftIcon />
                    </IconButton>
    
                    <Button
                        onClick={() => {
                            setTargetDate(new Date());
                        }}
                    >
                        Today
                    </Button>
    
                    <IconButton
                        onClick={() => {
                            let newDate = new Date(targetDate.getTime());
                            newDate.setDate(newDate.getDate() + 7);
                            setTargetDate(newDate);
                        }}
                    >
                        <ChevronRightIcon />
                    </IconButton>
                </Grid>
            </Grid>
        );
    }

    const { calendarEvents } = useDataProvider();
    return (
        <div style={{ height: '100%' }}>
            <Calendar
                components={{
                    event: MonthEvent,
                    toolbar: CustomToolbar
                }}
                localizer={localizer}
                events={calendarEvents.filter(x => !x.hidden)}
                view='week'
                views={['week']}
                min={new Date(0, 0, 0, 0, 0)}
                max={new Date(0, 0, 0, 23, 59)}
                date={targetDate}
                scrollToTime={new Date(0, 0, 0, 8, 0)}
                eventPropGetter={eventPropGetter}
                onSelectEvent={props.eventSelect}
                selectable
                onSelectSlot={(info) => {
                    console.log(info)
                    if (info.action == 'select') {
                        props.onSelectSlot(info.start, info.end);
                    }
                }}
               tooltipAccessor={null}
            />
        </div>
    );
}
