import { Box, Modal } from '@mui/material'
import React, { useEffect } from 'react'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export const ListModal = ({ isDialogOpened, handleCloseDialog, info }) => {

  useEffect(() => {
    handleClickOpen();
  }, []);

  const handleClickOpen = () => {
    //setOpen(true);
    //setTimeout(() => setOpen(false), 16000);
  };

  const handleClose = () => {
    //setOpen(false);
    handleCloseDialog(false);
  };

  return (
    <Modal
        open={isDialogOpened}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
    >
    <Box sx={{ ...style, width: 400 }}>
        <h2 id="parent-modal-title">{info.name}</h2>
        <ul>
          <li>Masa Corporal: {info.mass}</li>
          <li>Altura: {info.height}</li>
          <li>Genero: {info.gender}</li>
          <li>Color de cabello: {info.hair_color}</li>
          <li>Color de ojos: {info.eye_color}</li>
          <li>Año Nacimiento: {info.birth_year}</li>
        </ul>
        <p id="parent-modal-description">
          
        </p>
    </Box>
    </Modal>
  )
}
