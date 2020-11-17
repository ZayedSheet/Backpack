export const CALENDAR_EVENTS = [
    // {
    //     id: 1,
    //     course: "COMPSCI 4HC3",
    //     title: 'Event 1',
    //     start: new Date(2020, 10, 17, 10, 0), // end datetime
    //     end: new Date(2020, 10, 17, 14, 20), //start datetime
    //     color: '#d500f9',
    //     type: 'Lab'
    // },
    // {
    //     id: 2,
    //     title: 'Event 2',
    //     start: new Date(2020, 10, 18, 15, 0), // end datetime
    //     end: new Date(2020, 10, 18, 16, 0), //start datetime
    //     color: '#651fff',
    // },
    // {
    //     id: 3,
    //     title: 'Event 3',
    //     start: new Date(2020, 10, 17, 16, 0), // end datetime
    //     end: new Date(2020, 10, 17, 17, 30), //start datetime
    //     color: '#2979ff',
    //     type: 'Assignment'
    // },
    // {
    //     id: 4,
    //     title: 'Event 4',
    //     start: new Date(2020, 10, 16, 15, 0), // end datetime
    //     end: new Date(2020, 10, 16, 16, 30), //start datetime
    //     color: '#1de9b6',
    // }
]

export const COURSES = [
    {
        courseCode: 'COMPSCI 4HC3',
        name: 'Human Computer Interaction',
        color: "#1de9b6",
        prerequisites: 'COMPSCI 3HC3',
        antirequisites: 'SOMETHING SHR2',
        description: 'Design of user interfaces. Principles of good interface design. Task-oriented design. User experience design. Inclusive design. Communicating with graphics. Modes and mode awareness problem. Human cognition (memory, perception, motor systems). Help systems. Interface design tools. ',
        sections: ['C01', 'C02'],
        instructor: 'John Doe',
        times:[
        {
            day: 1,
            from: [8, 30],
            to: [10, 20],
        },
        {
            day: 2,
            from: [8, 30],
            to: [10, 20],
        },
        {
            day: 3,
            from: [8, 30],
            to: [10, 20],
        }]
    },
    {
        courseCode: 'SFRWENG 1234',
        color: "#d500f9",
        name: 'Coding stuff',
        prerequisites: 'MATH 1ABC',
        antirequisites: 'SFREWNG 567',
        description: 'Sustainable architectures; design for change and expansion; software architecture design space; object oriented analysis and design; architectural styles; methodology of making architecture decisions; project organization.',
        sections: ['C01'],
        instructor: 'Jane Doe',
        times:[
        {
            day: 3,
            from: [14, 30],
            to: [16, 20],
        },
        {
            day: 4,
            from: [17, 30],
            to: [19, 20],
        },
        {
            day: 5,
            from: [14, 30],
            to: [16, 20],
        }],
        
    },
    {
        courseCode: 'MATH 1FN2',
        color: "#00e676",
        name: 'Math and Fun stuff',
        prerequisites: 'None',
        antirequisites: 'Math 2FN2',
        description: 'Continuity and differentiability, with emphasis on theory (intermediate value theorem, mean value theorem), practice (how to differentiate) and applications (curve sketching, optimization), theory and techniques of integration, with emphasis onpractice (how to integrate) and applications',
        sections: ['C01'],
        instructor: 'Jeff Smith',
        times:[
        {
            day: 2,
            from: [17, 30],
            to: [19, 20],
        },
        {
            day: 3,
            from: [17, 30],
            to: [19, 20],
        },
        {
            day: 5,
            from: [17, 30],
            to: [19, 30],
        }],
        
    },
    {
        courseCode: 'SFWRENG 2DA4',
        color: "#ffef62",
        name: 'Digital Systems and Interfacing',
        prerequisites: 'SFWRENG 1DA4',
        antirequisites: 'SFWRENG 3DA4',
        description: 'Memory, binary arithmetic, hierarchical design. Hardware/software co-design and application specific processors. Interfacing to I/O devices.',
        sections: ['C01', 'C02', 'C03'],
        instructor: 'Dominik Bajinski',
        times:[
        {
            day: 1,
            from: [10, 30],
            to: [12, 20],
        },
        {
            day: 2,
            from: [10, 30],
            to: [12, 20],
        },
        {
            day: 3,
            from: [10, 30],
            to: [12, 20],
        }],
        
    }
]