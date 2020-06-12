const express = require('express');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const genres = require('./routes/genres');
const customers = require('./routes/customer');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const config = require('config');
const error = require('./middleware/error');
const app = express();

process.on('uncaughtException', ex => {
	winston.error(ex.message, ex);
	process.exit(1);
});

winston.exceptions.handle(
	new winston.transports.File({ filename: 'uncaughtExceptions.log' })
);

process.on('unhandledRejection', ex => {
	console.log('WE GOT AN UNCAUGHT EXCEPTION...');
	winston.error(ex.message, ex);
	process.exit(1);
});

winston.add(new winston.transports.File({ filename: 'logfile.log' }));
winston.add(
	new winston.transports.MongoDB({
		db: 'mongodb://localhost/movie-rent',
		options: {
			useUnifiedTopology: true,
			poolSize: 2,
			useNewUrlParser: true
		},
		level: 'error'
	})
);
// if (!config.get('jwtPrivateKey')) {
// 	console.error('Fatal error. JWT private key not defined...');
// 	process.exit(1);
// 	//process.exit(0); This is for success.
// }
mongoose
	.connect('mongodb://localhost/movie-rent', {
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
		useCreateIndex: true
	})
	.then(() => console.log('Connected to MongoDB...'))
	.catch(err => console.error(err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
