import React, { createContext, useContext, useState } from 'react';

const Context = createContext();

export const useDataProvider = () => useContext(Context);
export  default ({children}) => {
  const [calendar, setCalendar] = useState();
  const store = {
    setCalendar,
    calendar
  }

  return (
    <Context.Provider value={store}>
      {children}
    </Context.Provider>
  );
}