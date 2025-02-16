import mongoose, { Mongoose } from "mongoose";

declare global {
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<Mongoose> {
  if (cached.conn) {
    console.log("Используем кэшированное подключение");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("Инициализация подключения к MongoDB...");

    const opts = {
      bufferCommands: false,
      connectTimeoutMS: 10000, // Таймаут на подключение
      serverSelectionTimeoutMS: 5000, // Таймаут на выбор сервера
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      console.log("Подключение к MongoDB успешно установлено");
      cached.conn = mongoose;
      return mongoose;
    });
  }

  try {
    console.log("Ожидаем подключения...");
    cached.conn = await cached.promise;
  } catch (e) {
    console.error("Ошибка при подключении к MongoDB:", e);
    cached.promise = null;
    throw e;
  }

  return cached.promise;
}

export default dbConnect;
