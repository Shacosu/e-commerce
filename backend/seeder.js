import 'mongoose';
import 'colors';
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/usersModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

// Funcion que ELIMINA todos los datos para importar todos los datos del archivo products.js

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return {...product, user: adminUser }
        })
        await Product.insertMany(sampleProducts);

        console.log('Datos importados!'.green.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1);
    }
}

// Funcion para ElIMINAR todos los datos de la base de datos

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Datos eliminados!'.red.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1);
    }
}

// If por si se utiliza el comando 'npm run data:destroy -d' = true | 'npm run data:import' = false
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}