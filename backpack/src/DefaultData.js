export const CALENDAR_EVENTS = [
    // {
    //     id: 1,
    //     course: "COMPSCI 4HC3",
    //     title: 'Event 1',
    //     start: new Date(2020, 10, 17, 10, 0), // end datetime
    //     end: new Date(2020, 10, 17, 14, 20), //start datetime
    //     type: 'Lab'
    // },
    // {
    //     id: 2,
    //     title: 'Event 2',
    //     start: new Date(2020, 10, 18, 15, 0), // end datetime
    //     end: new Date(2020, 10, 18, 16, 0), //start datetime
    // },
    // {
    //     id: 3,
    //     title: 'Event 3',
    //     start: new Date(2020, 10, 17, 16, 0), // end datetime
    //     end: new Date(2020, 10, 17, 17, 30), //start datetime
    //     color: 'blue',
    //     type: 'Assignment'
    // },
    // {
    //     id: 4,
    //     title: 'Event 4',
    //     start: new Date(2020, 10, 16, 15, 0), // end datetime
    //     end: new Date(2020, 10, 16, 16, 30), //start datetime
    //     color: 'red',
    // },
    // {
    //     id: 5,
    //     title: 'Event 5',
    //     start: new Date(2020, 10, 16, 10, 0), // end datetime
    //     end: new Date(2020, 10, 16, 10, 30), //start datetime
    //     color: 'green',
    // },
    // {
    //     id: 6,
    //     title: 'Course 1',
    //     start: new Date(2020, 10, 19, 11, 30), // end datetime
    //     end: new Date(2020, 10, 19, 15, 30), //start datetime
    //     type: 'Lab',
    //     courseCode: 'COMPSCI 4HC3',
    //     section: 'C02',
    //     isCourse: true
    // },
]

export const COURSES = [
    {
        courseCode: 'COMPSCI 4HC3',
        name: 'Human Computer Interaction',
        color: "blue",
        prerequisites: 'COMPSCI 3HC3',
        antirequisites: 'SOMETHING SHR2',
        description: 'UI stuff',
        sections: ['C01', 'C02'],
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
        color: "red",
        name: 'Coding stuff',
        prerequisites: 'MATH 1ABC',
        antirequisites: 'SFREWNG 567',
        description: 'lorem fhsdaj fjdsiofj sdljf sdilj afhdsijfh sadiulthasdouhfaslid u hfsdiuhfasidlu yhfasiu ghfasdhfsadiuhf alisodhfsadilu fhsadsdilj afhdsijfh sadiulthasdouhfaslid u hfsdiuhfasidlu yhfasiu ghfasdhfsadiuhf alisodhfsadilu fhsadsdilj afhdsijfh sadiulthasdouhfaslid u hfsdiuhfasidlu yhfasiu ghfasdhfsadiuhf alisodhfsadilu fhsadsdilj afhdsijfh sadiulthasdouhfaslid u hfsdiuhfasidlu yhfasiu ghfasdhfsadiuhf alisodhfsadilu fhsadsdilj afhdsijfh sadiulthasdouhfaslid u hfsdiuhfasidlu yhfasiu ghfasdhfsadiuhf alisodhfsadilu fhsadhsdjkfh sdilj afhdsijfh sadiulthasdouhfaslid u hfsdiuhfasidlu yhfasiu ghfasdhfsadiuhf alisodhfsadilu fhsad',
        sections: ['C01'],
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
        
    }
]