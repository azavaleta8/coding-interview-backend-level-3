import dotenv from 'dotenv';
import mongoose from 'mongoose';
import createApp from './config/app';

// ENV
dotenv.config();

// Mongoose config
mongoose.set('strictQuery', false);

// ENV variables configuration
const NODE_ENV: string = process.env.NODE_ENV || 'dev';
const PORT: number = parseInt(process.env.PORT || '3000', 10);
const HOST: string = process.env.RENDER_EXTERNAL_URL || 'localhost';
const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI is not defined.');
  process.exit(1);
}

// Connect to MongoDB
const connectToDatabase = async (test = false): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    if(!test){
      console.log('MongoDB initialized successfully:', mongoose.connection.host);
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

// Start API server
export const startServer = async (): Promise<void> => {
  try {
    await connectToDatabase();

    const app = await createApp();
    app.listen(PORT, HOST, () => {
      console.log(`Server running on http://${HOST}:${PORT} in ${NODE_ENV} mode`);
      console.log(`Swagger docs are available at  http://${HOST}:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
};