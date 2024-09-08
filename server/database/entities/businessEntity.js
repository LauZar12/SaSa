import { Entity } from 'dynamodb-toolbox';
import SasaST from './SasaST'; 

const BusinessEntity = new Entity({
    name: 'Business',
    table: SasaST,
    attributes: {
        PK: { partitionKey: true, default: (data) => `bussiness#${data.businessId}` },
        SK: { sortKey: true, default: (data) => `bussiness#${data.businessId}user#${data.userId}` },
        Business_Name: { type: 'string', required: true },
        Address: { type: 'map', required: true },
        'GS2-PK': { type: 'string' }  // Clave de partición de GS2
    }
});

export default BusinessEntity;
