import {PutObjectCommand} from '@aws-sdk/client-s3';
import { s3Client } from '../s3Client.js'

export const uploadImage = async (req, res) => {
    const file = req.file;

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.originalname,
        Body: file.buffer
    }

    try {
        await s3Client.send(new PutObjectCommand(params));
        res.send('File uploaded successfully!!');
    } catch (error){
        console.error(error);
        res.status(500).send('Error uploading file to s3');
    }
}
