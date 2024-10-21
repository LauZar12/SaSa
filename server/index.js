import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import ddb from './ddbClient.js';
import dynamoose from 'dynamoose'
import { testConnection, getAllStuff } from './ddbClient.js';


import businessRoutes from './routes/business.routes.js';
import productRoutes from './routes/product.routes.js';
import userRoutes from './routes/user.routes.js';
import surpriseBoxRoutes from './routes/surprisebox.routes.js'

dynamoose.aws.ddb.set(ddb);

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

app.get('/all', getAllStuff);
app.get('/businesses', businessRoutes);

app.get('/businesses/:businessId', productRoutes);
app.get('/businesses/ola', businessRoutes);
app.get('/admin/businesses/:businessId/products', productRoutes); // para ver los productos del negocio
app.get("/admin/businesses/:businessId", businessRoutes)
app.get('/users', userRoutes);
app.post('/auth/register', userRoutes);
app.post('/auth/login', userRoutes);

app.put('/admin/businesses/:businessId/edit-info', businessRoutes)
app.post('/admin/businesses/:businessId/products/create-product', productRoutes)
app.get('/admin/businesses/:businessId/products/:productId', productRoutes);
app.put('/admin/businesses/:businessId/products/:productId/edit-product', productRoutes);
app.delete('/admin/businesses/:businessId/products/:productId/delete-product', productRoutes);

app.post('/admin/businesses/:businessId/surprise-boxes/create-surprise-box', surpriseBoxRoutes);
app.get('/admin/businesses/:businessId/surprise-boxes', surpriseBoxRoutes);
app.put('/admin/businesses/:businessId/surprise-boxes/:surpboxId/edit-surprise-box', surpriseBoxRoutes);
app.delete('/admin/businesses/:businessId/surprise-boxes/:surpboxId/delete-surprise-box', surpriseBoxRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  console.log(testConnection());
});