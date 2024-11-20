import React, { useState} from 'react'
import { useParams } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import axios from 'axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

export default function ImageUpload() {
  const [open, setOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const { businessId } = useParams();

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setSelectedImage(null)
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file); 
    }
  }

  const handleUpload = async () => {
    console.log('Subiendo imagen:', selectedImage)

    const formData = new FormData();
    formData.append('image', selectedImage);
    console.log('FormData:', formData);

    const encodedBusinessId = encodeURIComponent(businessId);
    console.log(encodedBusinessId);

    try{
      const response = await axios.put(`http://3.144.21.138:5000/admin/businesses/${encodedBusinessId}/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Esto es importante para enviar archivos
          },
          withCredentials: true,
        }
      );
      
      // Aquí manejas la respuesta, si es exitosa
      console.log('Imagen subida correctamente:', response.data);
      handleClose(); // Cerrar el modal si la subida fue exitosa
  
    } catch (error) {
      console.error('Error subiendo la imagen:', error);
    }
    
    handleClose();
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen} startIcon={<CloudUploadIcon />}>
        Subir Imagen
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          Subir Imagen
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Selecciona una imagen de tu dispositivo para subirla a tu negocio.
          </DialogContentText>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="raised-button-file">
            <Button variant="outlined" component="span" fullWidth sx={{ mt: 2, mb: 2 }}>
              Seleccionar Imagen
            </Button>
          </label>
          {selectedImage && (
            <img src={URL.createObjectURL(selectedImage)} alt="Vista previa" style={{ width: '100%', marginTop: 16 }} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleUpload} color="primary" disabled={!selectedImage}>
            Subir
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}