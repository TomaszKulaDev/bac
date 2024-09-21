// src/lib/mongodb.ts

import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/myapp";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

let cached: MongooseCache = global.mongoose as MongooseCache;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const opts = {
  bufferCommands: false,
  serverSelectionTimeoutMS: 15000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 30000,
  maxPoolSize: 10,
};

async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = connectWithRetry();
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('Nie udało się połączyć z MongoDB', e);
    throw e;
  }

  return cached.conn;
}

async function disconnectFromDatabase(): Promise<void> {
  if (cached.conn) {
    await cached.conn.disconnect();
    cached.conn = null;
    cached.promise = null;
  }
}

async function connectWithRetry(retries = 5): Promise<typeof mongoose> {
  try {
    return await mongoose.connect(MONGODB_URI, opts);
  } catch (err) {
    if (retries > 0) {
      console.log(`Ponowna próba połączenia z MongoDB. Pozostało prób: ${retries}`);
      await new Promise(resolve => setTimeout(resolve, 5000));
      return connectWithRetry(retries - 1);
    }
    throw err;
  }
}

function isConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

export { connectToDatabase, disconnectFromDatabase, isConnected };
