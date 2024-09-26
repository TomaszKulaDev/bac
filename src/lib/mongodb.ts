// src/lib/mongodb.ts

import mongoose from "mongoose";
import { MongoClient } from 'mongodb';

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

let isConnecting = false;

async function connectWithRetry(retries = 5): Promise<typeof mongoose> {
  console.log(`connectWithRetry: Próba połączenia. Pozostało prób: ${retries}`);
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(MONGODB_URI);
    }
    console.log("connectWithRetry: Połączono z MongoDB");
    return mongoose;
  } catch (err) {
    if (retries > 0) {
      console.log(`Ponowna próba połączenia z MongoDB. Pozostało prób: ${retries}`);
      await new Promise(resolve => setTimeout(resolve, 5000));
      return connectWithRetry(retries - 1);
    }
    console.error("connectWithRetry: Nie udało się połączyć z MongoDB", err);
    throw err;
  }
}

async function connectToDatabase(): Promise<typeof mongoose> {
  console.log("connectToDatabase: Start");
  if (cached.conn) {
    console.log("connectToDatabase: Używanie zapisanego połączenia");
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = connectWithRetry().catch((err) => {
      cached.promise = null;
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
    if (!cached.conn) {
      throw new Error("Połączenie nie zostało ustanowione");
    }
  } catch (e) {
    console.error('Nie udało się połączyć z MongoDB', e);
    throw e;
  }

  console.log("connectToDatabase: Połączenie ustanowione");
  return cached.conn;
}

async function disconnectFromDatabase(): Promise<void> {
  if (cached.conn) {
    await cached.conn.disconnect();
    cached.conn = null;
    cached.promise = null;
  }
}

export { connectToDatabase, disconnectFromDatabase };

const clientPromise: Promise<MongoClient> = new Promise((resolve, reject) => {
  connectToDatabase()
    .then((mongoose) => {
      const client = mongoose.connection.getClient() as unknown as MongoClient;
      resolve(client);
    })
    .catch(reject);
});

export default clientPromise;
