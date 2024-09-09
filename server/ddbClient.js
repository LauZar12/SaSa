import { ListTablesCommand } from '@aws-sdk/client-dynamodb';
import dynamoose from 'dynamoose'
import dotenv from 'dotenv';

dotenv.config();


const ddb = new dynamoose.aws.ddb.DynamoDB({
    "credentials": {
        "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
        "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY
    },
    "region": process.env.AWS_REGION
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






