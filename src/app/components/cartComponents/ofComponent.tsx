import { Fab, Snackbar, Alert } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';


export default function ScrollToTopButton() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    setOpen(true);
  };

  return (
    <>
      {/* Botão flutuante */}
      <Fab
        color="primary"
        onClick={handleClick}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>

      {/* Mensagem */}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="info" variant="filled">
          Mensagem definida por você 
        </Alert>
      </Snackbar>
    </>
  );
}
