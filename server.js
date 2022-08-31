'use strict';
console.log('My serverrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);
const Book = require('./book.js');

const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 3003;


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});


app.get('/books', getBooks);

async function getBooks(request, response, next) {
  try {
    let results = await Book.find();
    response.status(200).send(results);
  } catch (error) {
    next(error);
  }
}


app.post('/books', postBook);

async function postBook(request, response, next) {
  console.log(request.body);
  try {
    const newBook = await Book.create(request.body);
    response.status(201).send(newBook);
  } catch (error) {
    next(error);
  }
}


app.delete('/books/:bookid', deleteBook);

async function deleteBook(request, response, next) {
  // matches the 'variable' after the colon on line 65
  const id = request.params.bookid;
  console.log(id);
  try {
    await Book.findByIdAndDelete(id);
    response.status(204).send('Successfull!');
  } catch (error) {
    next(error);
  }
}



app.put('/books/:bookid', putBooks);

async function putBooks(request, response, next){
  let id = request.params.bookid;
  try {
    // updated cat information coming in on the body
    let data = request.body;

    //findByIdAndUpdate method - 3 arguments
    // 1. id of the thing to update
    // 2. updated data object
    // 3. option objects - { new: true, overwrite: true }

    const updateCat = await Book.findByIdAndUpdate(id, data, { new: true, overwrite: true });
    response.status(201).send(updateCat);

  } catch (error) {
    next(error);
  }
}

app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));