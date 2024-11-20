import { ListTablesCommand } from '@aws-sdk/client-dynamodb';
import SasaModel from './models/singleTableModel.js';
import dynamoose from 'dynamoose'
import dotenv from 'dotenv';

dotenv.config();


const ddb = new dynamoose.aws.ddb.DynamoDB({
    "credentials": {
        "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
        "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY
    },
    "region": process.env.AWS_DEFAULT_REGION
  });

export default ddb;

// funcion para testear la conexion con DynamoDB en la nube
export async function testConnection() {
    try {
        const command = new ListTablesCommand({});
        const response = await ddb.send(command);
        console.log('Connection to DynamoDB is great!')
        console.log('Your table is:', response.TableNames);
    } catch (error) {
        console.error('Error listing tables:', error);
    }
}


export const getAllStuff = async (req, res) => {
    try{
        const result = await SasaModel.scan().exec();
        res.status(200).json(result);
    } catch (error){
        console.error("ola fallo el getAll xd", error);
        res.status(500).json({ message: 'Error fetching data' })
    }
}



