import mongoose from 'mongoose';
import colors from 'colors'

const connectDB=async()=>{

    try {
       const conn= await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongodb is connected at ${conn.connection.host}`.bgGreen.black)
    } catch (error) {
        console.log(`Error while connceting to MongoDB ${error.message}`.bgRed)
        process.exit(1);
    }

}


export default connectDB;