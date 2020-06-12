const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = () => {
	process.on('uncaughtException', ex => {
		winston.error(ex.message, ex);
		process.exit(1);
	});

	winston.exceptions.handle(
		//new winston.transports.Console({ colorize: true, prettyPrint: true }),
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
			level: 'info'
		})
	);
};
