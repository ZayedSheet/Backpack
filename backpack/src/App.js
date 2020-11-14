import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';

function App() {
  const [calendar, setCalendar] = useState();
  const Context = React.createContext();
  const store = {
    setCalendar : () => {},
    calendar : [],
  }

  return (
    <Context.Provider value={store}>
      {/* routes */}
      hello
    </Context.Provider>
  );
}

export default App;
