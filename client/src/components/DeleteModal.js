import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AuthContext from '../auth';
import { useContext, useState } from 'react';
import Alert from '@mui/material/Alert';
import GlobalStoreContext from '../store';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 500,
  bgcolor: 'background.paper',
  p: 4,
};

export default function DeleteModal() {
  const { store } = useContext(GlobalStoreContext);

  function handleClose() {
    store.unmarkListForDeletion()
  }

  function handleDelete() {
    store.deleteMarkedList()
  }

  return(
   (store.listMarkedForDeletion)?
    <div>
        <Modal
            open={true}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Alert severity = "error"> Delete the Top 5 {store.listMarkedForDeletion.name}?</Alert>
            <Button variant = "text" onClick = {handleDelete}> Confirm </Button>
            <Button variant = "text" onClick = {handleClose}> Cancel </Button>
          </Box>
        </Modal>
    </div>:"");

;
}