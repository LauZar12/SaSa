
import { Entity } from 'dynamodb-toolbox';
import SasaST from '../SasaST'; // Asegúrate de usar el path correcto

const UserEntity = new Entity({
    name: 'User',
    table: SasaST,
    attributes: {
        PK: { partitionKey: true, default: (data) => `user#${data.userId}` },
        SK: { sortKey: true, default: (data) => `user#${data.userId}` },
        User_Name: { type: 'string', required: true },
        Email: { type: 'string', required: true },
        Role: { type: 'string', required: true },
        Password: { type: 'string', required: true },
        'GS1-PK': { type: 'string' }  // Clave de partición de GS1
    }
});

export async function createUser(userId, userName, email, role, password) {
    try {
        const result = await UserEntity.put({
            userId: userId, // Esto se usa para generar PK y SK
            User_Name: userName,
            Email: email,
            Role: role,
            Password: password,
            'GS1-PK': `user#${userId}`  // Opcional: si necesitas indexar por GS1
        });

        console.log('User created successfully:', result);
    } catch (error) {
        console.error('Error creating user:', error);
    }
}
