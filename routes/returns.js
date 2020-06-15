// POST /api/returns {customerId, movieId}

// Return 401 if client is not logged in
// Return 400 if customerId is not provided
// Return 400 if movieId is not provided
// Return 404 if no rental found for this customer/movie
// return 400 if rental already returned
// Return 200 if valid request
// set return date
// calculate the rental fee
// increase the stock
// return summary of rental

const express = require('express');
const { Rental } = require('../models/rental');
const { Movie } = require('../models/movie');
const auth = require('../middleware/auth');
const Joi = require('@hapi/joi');
const validate = require('../middleware/validate');

const router = express.Router();

const validateReturn = req => {
	let schema = Joi.object({
		customerId: Joi.objectId().required(),
		movieId: Joi.objectId().required()
	});
	return schema.validate(req);
};

router.post('/', [auth, validate(validateReturn)], async (req, res) => {
	const rental = await Rental.lookup(req.body.customerId, req.body.movieId);

	if (!rental) return res.status(404).send('Rental not found..');

	if (rental.dateReturned)
		return res.status(400).send('Return already processed..');

	rental.return();
	await rental.save();

	await Movie.update(
		{ _id: rental.movie._id },
		{
			$inc: { numberInStock: 1 }
		}
	);

	return res.send(rental);
});

module.exports = router;
