import { Entity } from 'dynamodb-toolbox';
import SasaST from './SasaST'; 

const ProductEntity = new Entity({
    name: 'Product',
    table: SasaST,
    attributes: {
        PK: { partitionKey: true, default: (data) => `bussiness#${data.businessId}` },
        SK: { sortKey: true, default: (data) => `bussiness#${data.businessId}product#${data.productId}` },
        Product_Name: { type: 'string', required: true },
        Product_Description: { type: 'string' },
        Price: { type: 'number', required: true },
        Discount: { type: 'number' },
        ExpirationDate: { type: 'string' },
        'GS3-PK': { type: 'string' }  // Clave de partición de GS3
    }
});

export default ProductEntity;
