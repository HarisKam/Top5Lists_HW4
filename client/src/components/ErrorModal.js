import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AuthContext from '../auth';
import { useContext, useState } from 'react';
import Alert from '@mui/material/Alert';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ErrorModal() {
  const { auth } = useContext(AuthContext);
  const [open, setOpen] = useState(true);
  const handleClose = () => {setOpen(false);};

  return (
    (auth.error)?
      <div>
          <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
              <Box sx={style}>
                  <Alert severity = "error">{auth.error}</Alert>
                  <Button variant = "text" onClick = {auth.closeError}> Hide </Button>
              </Box>
          </Modal>
      </div>:"");
}