import { Table } from 'dynamodb-toolbox';

const SasaST = new Table({
    name: 'SasaST',
    partitionKey: 'PK',
    sortKey: 'SK',
    indexes: {
        GS1: { partitionKey: 'GS1-PK' },
        GS2: { partitionKey: 'GS2-PK' },
        GS3: { partitionKey: 'GS3-PK' }
    }
});

export default SasaST;
