import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI: string | undefined = process.env.MONGO_URI;

if (!MONGODB_URI) {
  console.error('Missing MongoDB URI in environment variables');
  process.exit(1);
}

export const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};
