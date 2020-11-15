import React from 'react';
import { render } from 'react-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Chip, Grid, Paper, Typography } from '@material-ui/core';

moment.locale('en-GB');
const localizer = momentLocalizer(moment);
const MonthEvent = ({ event }) => (
    <Grid container>
        <Grid item xs={12}>
            <Typography variant='subtitle1'>
                Heloo
        </Typography>
        </Grid>
        <Grid item xs={12}>
            <Chip onClick={() => { }} label='test' color='primary' size='small' />
        </Grid>
    </Grid>
);

const eventPropGetter = (event, start, end, isSelected) => {
    var backgroundColor = '#' + event.hexColor;
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

export default () => (
    <div style={{ height: 700 }}>
        <Calendar
            components={{
                event: MonthEvent,
            }}
            localizer={localizer}
            events={[
                {
                    title: 'My event',
                    allDay: false,
                    start: new Date(2018, 0, 1, 10, 0), // end datetime
                    end: new Date(2018, 0, 1, 14, 20), //start datetime
                    color: '#ffef62'
                }
            ]}
            step={60}
            view='week'
            views={['week']}
            min={new Date(2008, 0, 1, 8, 0)} // 8.00 AM
            max={new Date(2008, 0, 1, 22, 0)} // Max will be 6.00 PM!
            date={new Date(2018, 0, 1)}
            eventPropGetter={eventPropGetter}
        />
    </div>
);
