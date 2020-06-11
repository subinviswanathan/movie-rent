const express = require('express');
const mongoose = require('mongoose');
const genres = require('./routes/genres');

//mongoose.connect('mongodb')
const app = express();

app.use(express.json());
app.use('/api/genres', genres);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
