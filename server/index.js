import express from 'express';
import dotenv from 'dotenv';

import ddb from './ddbClient.js';
import dynamoose from 'dynamoose'
import SasaModel from './models/singleTableModel.js';
import { testConnection } from './ddbClient.js';


dynamoose.aws.ddb.set(ddb);

dotenv.config();
const app = express();

app.get('/businesses', async (req, res) => {
  try {

    const businesses = await SasaModel.scan().exec();
    // const businesses = await SasaModel.query("PK").eq("business#1").exec();
    res.status(200).json(businesses);
    console.log('esto fue lo q encontre xd')
  } catch (error) {
    console.error('Error fetching businesses:', error);
    res.status(500).json({ message: 'Error fetching businesses' });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(testConnection());
});