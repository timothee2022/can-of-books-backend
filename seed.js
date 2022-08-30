'use strict';

const { default: mongoose } = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DB_URL);

const Book = require('./book.js');

async function seed() {
  // title: { type: String, required: true },
  // description: { type: String, required: true },
  // status: { type: Boolean, required: true },

  await Book.create({
    title: 'Perfect Smile',
    description: 'Red corver',
    status: true
  });
  console.log('Perfect Smile was added');

  await Book.create({
    title: 'Endless Beauty',
    description: 'Black and white corver',
    status: true
  });
  console.log('Endless Beauty was added');

  await Book.create({
    title: 'Perfect Peace',
    description: 'brown/black/white corver',
    status: false
  });
  console.log('Perfect Peace was added');

  mongoose.disconnect();
}

seed();