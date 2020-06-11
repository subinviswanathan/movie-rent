const express = require('express');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const app = express();

mongoose
	.connect('mongodb://localhost/movie-rent', {
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Connected to MongoDB...'))
	.catch(err => console.error(err));

app.use(express.json());
app.use('/api/genres', genres);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
