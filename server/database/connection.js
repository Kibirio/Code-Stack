import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // MongoDB connection string
        const con = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log(`MongoDB connected:${con.connection.host}`);
    } catch (error) {
        console.log(error);
        // process.exit(1);
    }
}
export default connectDB;