import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

try {
    mongoose.connect(process.env.CONNECTION_STRING as string)
        .then(() => console.log('Connected to your db'))
} catch (error) {
    console.log(error)
}

export default mongoose