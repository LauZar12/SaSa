import { DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import dotenv from 'dotenv';

dotenv.config();


const ddbClient = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

const docClient = DynamoDBDocumentClient.from(ddbClient)


export default docClient;


// funcion para testear la conexion con DynamoDB en la nube
export async function testConnection() {
    try {
        const command = new ListTablesCommand({});
        const response = await ddbClient.send(command);
        console.log('Connection to DynamoDB is great!')
        console.log('Your table is:', response.TableNames);
    } catch (error) {
        console.error('Error listing tables:', error);
    }
}






