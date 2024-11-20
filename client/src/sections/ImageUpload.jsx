import React, { useState } from 'react'
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
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

export default function ImageUploadModal() {
  const [open, setOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setSelectedImage(null)
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setSelectedImage(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = () => {
    console.log('Subiendo imagen:', selectedImage)
    handleClose()
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
            <img src={selectedImage} alt="Vista previa" style={{ width: '100%', marginTop: 16 }} />
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