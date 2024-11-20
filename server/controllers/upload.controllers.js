import {PutObjectCommand} from '@aws-sdk/client-s3';
import { s3Client } from '../s3Client.js'
import SasaModel from "../models/singleTableModel.js";

export const uploadImage = async (req, res) => {
  const file = req.file;  

  if (!req.file) {
    return res.status(400).send('No se ha enviado ningún archivo');
  }

  const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.originalname,
      Body: file.buffer
  }

  try {
      await s3Client.send(new PutObjectCommand(params));
      const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${file.originalname}`;
      console.log(imageUrl);
      return(imageUrl);
  } catch (error){
      console.error(error);
      res.status(500).send('Error uploading file to s3');
  }
}

export const editBusinessImage = async (req, res) => {
    try {
      const businessId = req.params.businessId;
      console.log('BusinessId:', businessId);
  
      if (!req.cookies.user) {
        return res.status(400).json({ message: 'Usuario no autenticado' });
      }
      
      const user = JSON.parse(req.cookies.user);
      const userId = user.PK;

      const file = req.file;  // Asegúrate de que `req.file` esté definido antes de continuar
      if (!file) {
        return res.status(400).json({ message: 'No se proporcionó un archivo de imagen' });
      }
  
      const Business_Logo_Url = await uploadImage(req, res);  // Aquí llamamos a la función uploadImage y esperamos la URL
      if (!Business_Logo_Url) {
        return res.status(500).json({ message: 'No se pudo subir la imagen.' });
      }
  
      if (!Business_Logo_Url) {
        return res.status(400).json({ message: 'No hay campos para actualizar' });
      }
  
      const updateData = {};
      if (Business_Logo_Url) updateData.Business_Logo_Url = Business_Logo_Url;

      console.log(updateData);
  
      const PK = `${businessId}`;
      const SK = `${businessId}${userId}`;
      console.log('Datos para actualizar:', { PK, SK, updateData });
      const updatedBusiness = await SasaModel.update({ PK, SK }, updateData);
  
      res.status(200).json({ message: 'Logo de Negocio agregada correctamente', business: updatedBusiness });
    } catch (error) {
      console.error('Error actualizando la foto', error);
      res.status(500).json({ message: 'No se pudo actualizar la foto del negocio' });
    }
  };
