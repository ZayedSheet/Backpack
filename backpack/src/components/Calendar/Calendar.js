import React, { useState } from 'react';
import { render } from 'react-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box, Button, Chip, Divider, Grid, IconButton, makeStyles, Paper, Popover, Typography } from '@material-ui/core';
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
    },
    paper: {
        padding: theme.spacing(1),
    },

}));



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
    const classes = useStyles();
    const CustomToolbar = ({ label }) => {
        const { modalOpen, setSideBar, isSideBarOpen } = props;
        const [openDatePicker, setOpenDatePicker] = useState(false);
        return (
            <Grid container alignItems='center'>
                <Grid item xs={4}>
                    <Button style={{backgroundColor: "#3f51b5", color: "white", marginRight: "15px", width: "120px", textTransform: "none"}} onClick={modalOpen}>Add Event</Button>
                    <Button style={{backgroundColor: "#2196f3", color: "white", width: "120px", textTransform: "none"}} onClick={() => setSideBar(!isSideBarOpen)}>Add Course</Button>
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

    const MonthEvent = ({ event }) => {
        const { filterForm } = props;
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
            let { start, end } = event;
            return `${event.start.toDateString()}, ${moment(start).format('hh:mm A')} - ${moment(end).format('hh:mm A')}`;
        }
    
        const formatDescription = () => {
            const maxLength = 100;
            return event.description.length > maxLength ? `${event.description.substring(0, maxLength - 3)}...` : event.description;
        }
        const isSecondHalf = event.end.getDay() >= 4;
        const isSmall = Math.abs(event.end - event.start) <= 3600000;
    
        return (
            <div
                style={{ height: '100%' }}
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
                {
                    event.isCourse ?
                        <Grid container style={{textAlign:'center'}}>
                            <Grid item xs={12}>
                                <Typography variant='subtitle2'>
                                    {event.courseCode}
                                </Typography>
                            </Grid>
                            {
                                filterForm.showSection &&
                                    <Grid item xs={12}>
                                        <small>
                                            {event.section}
                                        </small>
                                    </Grid>
                            }
                              {
                                filterForm.showInstructor &&
                                    <Grid item xs={12}>
                                        <small>
                                            {event.instructor}
                                        </small>
                                    </Grid>
                            }
                            </Grid>
                        :
                        <Grid container alignItems={isSmall ? 'flex-start' : 'center'}>
                            <Grid item xs={6}>
                                <Typography variant='subtitle2' style={{ fontSize: isSmall ? '12px' : '15px', overflowX: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                    {event.title}
                                </Typography>
                            </Grid>
                            <Grid item container justify='flex-end' xs={6}>
                                <Chip style={{ height: isSmall ? '15px' : '22px' }} label={(!event.type || event.type === 'None') ? 'Event' : event.type} color='primary' size='small' />
                            </Grid>
                        </Grid>
                }
    
                <Popover
                    className={classes.popover}
                    style={{
                        marginLeft: isSecondHalf ? -10 : 10
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: isSecondHalf ? 'left' : 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: isSecondHalf ? 'right' : 'left',
                    }}
                    onClose={handlePopoverClose}
                >
                    <Paper  style={{ minWidth: '200px', maxWidth: '300px' }}>
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
                                    <Grid item container>
                                        <Grid item xs={12}>
                                                <small>
                                                {event.courseCode}
                                                </small>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <small>
                                                {event.instructor}, {event.section}
                                            </small>
                                        </Grid>
                                    </Grid>
                                   
    
                                }
                                {
                                    Boolean(!event.isCourse && event.course && event.course !== 'None') &&
                                    <Grid item xs={12}>
                                        <Typography variant='subtitle1'>
                                            {event.course}
                                        </Typography>
                                    </Grid>
    
                                }
                                {
                                    <Grid item xs={12}>
                                        <small>
                                            {!event.type || event.type === 'None' ? 'Event' : event.type}
                                        </small>
                                    </Grid>
                                }
                                {
                                    event.description &&
                                    <Grid item xs={12} container style={{marginTop: '10px'}}>
                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>
                                        <Grid item xs={12} style={{marginTop: '10px', maxWidth: '100%', maxHeight: '100px' }}>
                                            <Typography variant='body1' style={{ wordWrap: 'break-word' }}>
                                                {formatDescription()}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                }
    
                            </Grid>
                        </Box>
                    </Paper>
                </Popover>
            </div>
        )
    };

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
