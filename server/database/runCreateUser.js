import { createUser } from './entities/userEntity.js';

(async () => {
    await createUser('1', 'Vale', 'vale@gmail.com', 'admin', 'vale123');
})();
