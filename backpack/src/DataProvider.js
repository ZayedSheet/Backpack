import React, { createContext, useContext, useState } from 'react';
import { CALENDAR_EVENTS } from './DefaultData';
const Context = createContext();

export const useDataProvider = () => useContext(Context);
export default ({ children }) => {
  const [calendarEvents, setCalendarEvents] = useState([...CALENDAR_EVENTS]);
  const store = {
    setCalendarEvents,
    calendarEvents
  }
  return (
    <Context.Provider value={store}>
      {children}
    </Context.Provider>
  );
}