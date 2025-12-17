// Crie um novo arquivo, por exemplo: AddItemNotification.tsx

import { Snackbar, Alert } from '@mui/material';

type NotificationProps = {
  open: boolean;
  onClose: () => void;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
};

export default function AddItemNotification({ open, onClose, message, severity }: NotificationProps) {
  
  // Removemos toda a lógica de estado local e o botão FAB de rolagem.
  // O estado de 'open' agora é controlado pelo componente pai (AddToCartButton).

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      // Posição ajustada para ser uma notificação de sucesso
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} 
    >
      <Alert onClose={onClose} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
}