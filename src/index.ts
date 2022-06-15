import mongoose from 'mongoose';

import app from './app';

/*global process*/
const PORT: number = Number(process.env.PORT) || 5000;
const DB_URI = process.env.DATABASE_URL ?? '';

const main = async () => {
  try {
    // const server = app.listen(PORT, () => {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });

    // const db = await mongoose.connect(DB_URI);
    await mongoose.connect(DB_URI);
    console.log('Connected to MongoDB Server');
  } catch (error: any) {
    console.log(error);
  }
};

main();
