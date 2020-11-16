import React, { createContext, useContext, useEffect, useState } from 'react';
import { CALENDAR_EVENTS } from './DefaultData';
const Context = createContext();

export const useDataProvider = () => useContext(Context);
export default ({ children }) => {
  const [calendarEvents, setCalendarEvents] = useState([...CALENDAR_EVENTS]);
  const [myCourses, setMyCourses] = useState(CALENDAR_EVENTS.filter(x => x.courseCode).map(x => x.courseCode));
  const [targetDate, setTargetDate] = useState(new Date());
  const store = {
    setCalendarEvents,
    calendarEvents,
    myCourses,
    targetDate,
    setTargetDate,
  }

  useEffect(() => {
    setMyCourses([...new Set(calendarEvents.filter(x => x.courseCode).map(x => x.courseCode))]);
  },[JSON.stringify([...new Set(calendarEvents.filter(x => x.courseCode).map(x => x.courseCode))])])
  return (
    <Context.Provider value={store}>
      {children}
    </Context.Provider>
  );
}