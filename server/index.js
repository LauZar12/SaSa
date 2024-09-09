import express from 'express';
import dotenv from 'dotenv';

import docClient from './ddbClient.js';
import dynamoose from 'dynamoose';
import SasaSTModel from './models/singleTableModel.js';
import { testConnection } from './ddbClient.js';

dynamoose.aws.ddb.set(docClient);

dotenv.config();
const app = express();

app.get('/businesses', async (req, res) => {
  try {
    const businesses = await SasaSTModel.scan().filter('GS1_PK');
    res.status(200).json(businesses);
    console.log('hehe')
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching businesses' });
  }
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

console.log(testConnection());
