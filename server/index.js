import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import ddb from './ddbClient.js';
import dynamoose from 'dynamoose';
import { testConnection, getAllStuff } from './ddbClient.js';

import businessRoutes from './routes/business.routes.js';
import productRoutes from './routes/product.routes.js';
import userRoutes from './routes/user.routes.js';
import surpriseBoxRoutes from './routes/surprisebox.routes.js';
import uploadRoutes from './routes/upload.routes.js';


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
app.use('/upload', uploadRoutes);
app.use('/admin/businesses', businessRoutes); 
app.use('/businesses', businessRoutes);               // rutas de negocios
app.use('/profile', userRoutes);                      // rutas de perfil de usuario
app.use('/admin/businesses', productRoutes);          // rutas de productos del negocio bajo /admin/businesses
app.use('/users', userRoutes);                        // rutas de usuarios
app.use('/auth', userRoutes);                         // rutas de autenticación
app.use('/admin/businesses', surpriseBoxRoutes);      // rutas de cajas sorpresa bajo /admin/businesses


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  console.log(testConnection());
});
