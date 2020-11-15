import React, { useEffect, useState } from 'react';
//import 'resize-observer-polyfill/dist/ResizeObserver.global';
import { TimeGridScheduler, classes } from '@remotelock/react-week-scheduler';
import { DAYS, MONTHS_SHORT, TIMES, TICKS } from './Data';
import './Calendar.css';
import { Card, CardActionArea, Paper, withStyles } from '@material-ui/core';

function getMostRecentSunday() {
    let d = new Date();
    d.setDate(d.getDate() - d.getDay());
    return d;
}

const data = [
    {
        day: 0,
        start: 1,
        length: 1
    },
    {
        day: 1,
        start: 1,
        length: 1
    },
    {
        day: 2,
        start: 1,
        length: 1
    },
];

const styles = {
    border: {
        border: '1px solid black',
        borderCollapse: 'collapse'
    },
    column: {
        border: '1px solid black',
        borderCollapse: 'collapse',
        width: '150px'
    }
}


const Row = withStyles(styles)(({classes,hideBorder, children, ...rest}) => {
    return (
        <tr className={!hideBorder && classes.border} {...rest}>
            {children}
        </tr>
    )
})
const Col = withStyles(styles)(({classes, hideBorder,children, ...rest}) => {
    return (
        <td className={[!hideBorder && classes.border, classes.column].join(' ')} {...rest}>
            {children}
        </td>
    )
})

const HeadCol = withStyles(styles)(({classes, children, ...rest}) => {
    return (
        <th className={[classes.border, classes.column].join(' ')} {...rest}>
            {children}
        </th>
    )
})


export default withStyles(styles)(({classes}) => {
    const [weekDays, setWeekDays] = useState([]);
    const [formattedData, setFormattedData] = useState([...data]);

    // useEffect(() => {
    //     let data = [];
    //     for (let x of data){
    //         for(let i = 0; i < x.length; i++){
    //             data.push(...);
    //         }
    //     }
    // }, [data]);

    useEffect(() => {
        let date = getMostRecentSunday();
        let dates = [];
        for (let i = 0; i < 7; i++){
            let monthName = MONTHS_SHORT[date.getMonth()];
            dates.push({
                name: `${monthName}. ${date.getDate()}`,
                dayOfWeek: DAYS[i]
            });
            date.setDate(date.getDate() + 1);
        }
        setWeekDays(dates);
    }, []);

    const renderColumns = (i) => {
        const hideBorder = i % TICKS !== 0;
        const BorderCol = <Col hideBorder={hideBorder} />
        return (
            <>
            <Col hideBorder={hideBorder}></Col>
            <Col hideBorder={hideBorder}><Card elevation={5} style={{margin:30,marginTop:0, background:'#ffef62', height:'100px'}}><CardActionArea style={{height:'100%'}}>LHello</CardActionArea></Card></Col>
            <Col hideBorder={hideBorder}>f</Col>
            <Col hideBorder={hideBorder}>f</Col>
            <Col hideBorder={hideBorder}>f</Col>
            <Col hideBorder={hideBorder}>f</Col>
            <Col hideBorder={hideBorder}>f</Col>
            <Col hideBorder={hideBorder}>f</Col>
            </>
        )
    }

    return (
        <table className={classes.border}>
            <thead >
                <Row>
                    <HeadCol></HeadCol>
                    {
                        weekDays.map(x => (
                            <HeadCol key={x.dayOfWeek}>
                                {x.dayOfWeek}<br /> {x.name}
                            </HeadCol>
                        ))
                    }
                </Row>
            </thead>
            <tbody>
                {
                    [...new Array(TIMES.length * TICKS)].map((x,i) => {
                        const cols = renderColumns(i);
                        return(
                            <Row hideBorder={TICKS % i !== 0}>
                                {cols}
                            </Row>
                        )
                    })
                }
            </tbody>
        </table>
    );
})