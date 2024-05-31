import mongoose from 'mongoose';

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  console.log("MOngo uri", process.env.MONGO_URI)
 
  // Check if we have a connection to the database or if it's currently connecting
  

  try {
    // Attempt to connect to the database
    const db = await mongoose.connect(process.env.MONGO_URI|| '', {});

    connection.isConnected = db.connections[0].readyState;

    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);

    // Graceful exit in case of a connection error
    process.exit(1);
  }
}

export default dbConnect;