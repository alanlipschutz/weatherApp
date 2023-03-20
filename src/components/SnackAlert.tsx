import { Snackbar, Alert } from '@mui/material';
import React from 'react';
import { severityTypes } from '../types/Types';

interface propsSnack {
  severity: severityTypes;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
}
export default function SnackAlert({
  severity = severityTypes.success,
  open,
  setOpen,
  message,
}: propsSnack) {
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
