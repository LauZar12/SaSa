import AWS from 'aws-sdk';

// Configura AWS SDK
AWS.config.update({
    region: 'us-east-2',
    accessKeyId: '',
    secretAccessKey: ''
});

// Crea una instancia de DynamoDB DocumentClient
const DocumentClient = new AWS.DynamoDB.DocumentClient();

// Exporta el cliente para usarlo en otras partes de tu aplicación
export default DocumentClient;
