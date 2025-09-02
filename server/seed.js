// backend/seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
// import Product from './models/Product.js';

dotenv.config();

const products = [
  {
    name: 'iPhone 15 Pro',
    price: 1199,
    description: 'Latest Apple iPhone with advanced camera.',
    image: 'https://via.placeholder.com/300x200'
  },
  {
    name: 'MacBook Pro',
    price: 1999,
    description: 'Powerful laptop for professionals.',
    image: 'https://via.placeholder.com/300x200'
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Seeding done');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
