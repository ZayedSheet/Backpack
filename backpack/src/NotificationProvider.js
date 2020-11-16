import { IconButton, Snackbar } from '@material-ui/core';
import React, { createContext, useContext, useEffect, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';


const Context = createContext();

export const useNotificationProvider = () => useContext(Context);
export default ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();

  const notify = (m) => {
    setMessage(m);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 4000);
  }
  
  const store = {
    notify
  }

  return (
    <Context.Provider value={store}>
      {children}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        message={message}
        action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={() => setOpen(false)}>
              <CloseIcon fontSize="small" />
          </IconButton>
        }
        onExited={() => {
          setMessage('');
        }}
      />
    </Context.Provider>
  );
}