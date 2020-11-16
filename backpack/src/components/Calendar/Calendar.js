import React from 'react';
import { render } from 'react-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Chip, Grid, IconButton, Paper, Typography } from '@material-ui/core';
import { useDataProvider } from '../../DataProvider';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
moment.locale('en-GB');
const localizer = momentLocalizer(moment);
const MonthEvent = ({ event }) => (
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
);

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

const CustomToolbar = (props) => {
    const { setTargetDate, targetDate } = useDataProvider();
    const {label} = props;
    return (
        <Grid container alignItems='center'>
            <Grid item xs={4} >
                <IconButton 
                 onClick={() => {
                    let newDate = new Date(targetDate.getTime());
                    newDate.setDate(newDate.getDate() - 7);
                    setTargetDate(newDate);
                }}
                >
                    <ChevronLeftIcon fontSize="large" />
                </IconButton>
            </Grid>
            <Grid item xs={4} container justify='center'>
                <Typography variant='body1'>
                    {label}
                </Typography>
            </Grid>
            <Grid item xs={4} container justify='flex-end'>
                <IconButton 
                    onClick={() => {
                        let newDate = new Date(targetDate.getTime());
                        newDate.setDate(newDate.getDate() + 7);
                        setTargetDate(newDate);
                    }}
                >
                    <ChevronRightIcon fontSize="large" />
                </IconButton>
            </Grid>
        </Grid>
    );
}

export default () => {
    const { calendarEvents, targetDate } = useDataProvider();
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
            />
        </div>
    );
}
