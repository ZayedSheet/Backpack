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
        section: 'C02',
        isCourse: true
    },
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
            to: [9, 20],
        },
        {
            day: 2,
            from: [8, 30],
            to: [9, 20],
        },
        {
            day: 3,
            from: [8, 30],
            to: [9, 20],
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
            to: [15, 20],
        },
        {
            day: 4,
            from: [17, 30],
            to: [18, 20],
        },
        {
            day: 5,
            from: [14, 30],
            to: [15, 20],
        }],
        
    }
]