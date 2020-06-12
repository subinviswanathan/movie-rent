const winston = require('winston');

module.exports = (err, req, res, next) => {
	winston.error(err.message, err); // error warn info verbose debug silly

	res.send(500).send('Something Failed..');
};
