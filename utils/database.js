// database.js

import mongoose from 'mongoose';
require('dotenv').config();

const connectDB = async () => {
  const mongodb_uri = process.env.MONGODB_URI;
  const username = process.env.MONGODB_USERNAME;
  const password = process.env.MONGODB_PASSWORD;
  try {
    await mongoose.connect(
      `mongodb+srv://${username}:${password}@${mongodb_uri}`,
    );
    console.log('Success: Connected to MongoDB');
  } catch (err) {
    console.log('Failure: Unconnected to MongoDB');
    throw new Error();
  }
};

export default connectDB;
