import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import ddb from './ddbClient.js';
import dynamoose from 'dynamoose'
import { testConnection, getAllStuff } from './ddbClient.js';


import businessRoutes from './routes/business.routes.js'
import productRoutes from './routes/product.routes.js'
import userRoutes from './routes/user.routes.js'


dynamoose.aws.ddb.set(ddb);

dotenv.config();

const app = express();


app.get('/all', getAllStuff);
app.get('/businesses', businessRoutes);

app.get('/businesses/:businessId', productRoutes);
app.get('/businesses/ola', businessRoutes);
app.get('/admin/businesses/:businessId/products', productRoutes); // para ver los productos del negocio
app.get("/admin/businesses/:businessId", businessRoutes)
app.get('/users', userRoutes);

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
}));

app.use(express.json());
app.post('/register', userRoutes);
app.post('/admin/businesses/:businessId/products/create-product', productRoutes)
app.get('/admin/businesses/:businessId/products/:productId', productRoutes);
app.put('/admin/businesses/:businessId/products/:productId/edit-product', productRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  console.log(testConnection());
});