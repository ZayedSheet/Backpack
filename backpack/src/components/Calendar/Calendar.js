import React from 'react';
import { render } from 'react-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Chip, Grid, Paper, Typography } from '@material-ui/core';
import { useDataProvider } from '../../DataProvider';

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

const CustomToolbar = ({ }) => {
    return (
        <div>
            todos
        </div>
    );
}

export default () => {
    const { calendarEvents, setCalendarEvents } = useDataProvider();
    return (
        <div style={{ height: '100%' }}>
            <Calendar
                components={{
                    event: MonthEvent,
                    //toolbar: CustomToolbar
                }}
                localizer={localizer}
                events={calendarEvents.filter(x => !x.hidden)}
                view='week'
                views={['week']}
                min={new Date(2008, 0, 1, 0, 0)}
                max={new Date(2008, 0, 1, 23, 59)} 
                date={new Date(2018, 0, 1)}
                scrollToTime={new Date(0, 0, 0, 8,0)}
                eventPropGetter={eventPropGetter}
            />
        </div>
    );
}
