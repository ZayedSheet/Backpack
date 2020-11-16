import React, { createContext, useContext, useState } from 'react';
import { CALENDAR_EVENTS } from './DefaultData';
const Context = createContext();

export const useDataProvider = () => useContext(Context);
export default ({ children }) => {
  const [calendarEvents, setCalendarEvents] = useState([...CALENDAR_EVENTS]);
  const [myCourses, setMyCourses] = useState(CALENDAR_EVENTS.filter(x => x.courseCode).map(x => x.courseCode));
  const store = {
    setCalendarEvents,
    calendarEvents,
    myCourses,
    setMyCourses
  }
  return (
    <Context.Provider value={store}>
      {children}
    </Context.Provider>
  );
}