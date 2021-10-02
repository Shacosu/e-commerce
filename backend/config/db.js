import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        });
        console.log(`Base de datos MongoDB esta conectada en: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(`Error al conectar a MongoDB: ${error.message}`.red.underline.bold);
        process.exit(1);
    }
}

export default connectDB;