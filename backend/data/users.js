import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'Admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Andres Hernandez',
        email: 'Andres@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Pablo Espinoza',
        email: 'Pablo@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users;