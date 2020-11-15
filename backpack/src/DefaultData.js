export const CALENDAR_EVENTS = [
    {
        title: 'Event 1',
        start: new Date(2018, 0, 1, 10, 0), // end datetime
        end: new Date(2018, 0, 1, 14, 20), //start datetime
        color: '#ffef62',
        type: 'type1'
    },
    {
        title: 'Event 2',
        start: new Date(2018, 0, 1, 15, 0), // end datetime
        end: new Date(2018, 0, 1, 16, 0), //start datetime
        color: '#ffef62',
        type: 'type2'

    },
    {
        title: 'Event 3',
        start: new Date(2018, 0, 1, 16, 0), // end datetime
        end: new Date(2018, 0, 1, 17, 30), //start datetime
        color: 'blue',
        type: 'type3'
    },
    {
        title: 'Event 4',
        start: new Date(2018, 0, 5, 15, 0), // end datetime
        end: new Date(2018, 0, 5, 16, 30), //start datetime
        color: 'red',
        type: 'type4'
    },
    {
        title: 'Event 5',
        start: new Date(2018, 0, 4, 10, 0), // end datetime
        end: new Date(2018, 0, 4, 10, 30), //start datetime
        color: 'green',
        type: 'type5'
    },
    {
        title: 'Course 1',
        start: new Date(2018, 0, 3, 11, 30), // end datetime
        end: new Date(2018, 0, 3, 15, 30), //start datetime
        color: '#ffef62',
        type: 'type6',
        courseCode: 'COMPSCI 4HC3',
        isCourse: true
    },
]

export const COURSES = [
    {
        courseCode: 'COMPSCI 4HC3',
        name: 'Human Computer Interaction',
        prerequisites: 'COMPSCI 3HC3',
        antirequisites: 'SOMETHING SHR2',
        description: 'UI stuff',
        times:[
        {
            day: 0,
            from: [8, 30],
            to: [9, 20],
        },
        {
            day: 1,
            from: [8, 30],
            to: [9, 20],
        },
        {
            day: 2,
            from: [8, 30],
            to: [9, 20],
        }]
    },
    {
        courseCode: 'SFRWENG 1234',
        name: 'Coding stuff',
        prerequisites: 'MATH 1ABC',
        antirequisites: 'SFREWNG 567',
        description: 'How to software',
        times:[
        {
            day: 2,
            from: [4, 30],
            to: [5, 20],
        },
        {
            day: 3,
            from: [5, 30],
            to: [6, 20],
        },
        {
            day: 4,
            from: [4, 30],
            to: [5, 20],
        }],
        
    }
]