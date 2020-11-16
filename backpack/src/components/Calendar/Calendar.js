import React, { useState } from 'react';
import { render } from 'react-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button, Chip, Grid, IconButton, Paper, Typography } from '@material-ui/core';
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
const MonthEvent = ({ event }) => {
    return (
        <Grid container>
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
            />
        </div>
    );
}
