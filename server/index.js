import express from 'express';
import dotenv from 'dotenv';


import ddb from './ddbClient.js';
import dynamoose from 'dynamoose'
import { testConnection, getAllStuff } from './ddbClient.js';


import businessRoutes from './routes/business.routes.js'
import productRoutes from './routes/product.routes.js'

dynamoose.aws.ddb.set(ddb);

dotenv.config();

const app = express();

app.get('/all', getAllStuff)
app.get('/businesses', businessRoutes);
app.get('/businesses/:businessId', productRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  console.log(testConnection());
});