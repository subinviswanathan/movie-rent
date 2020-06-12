const winston = require('winston');
const mongoose = require('mongoose');

module.exports = () => {
	mongoose
		.connect('mongodb://localhost/movie-rent', {
			useNewUrlParser: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
			useCreateIndex: true
		})
		.then(() => winston.info('Connected to MongoDB...'));
};
