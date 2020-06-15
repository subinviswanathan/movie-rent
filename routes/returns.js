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
const moment = require('moment');

const router = express.Router();

router.post('/', auth, async (req, res) => {
	if (!req.body.customerId)
		return res.status(400).send('Customer Id not provided..');

	if (!req.body.movieId) return res.status(400).send('Movie Id not provided..');

	const rental = await Rental.findOne({
		'customer._id': req.body.customerId,
		'movie._id': req.body.movieId
	});

	if (!rental) return res.status(404).send('Rental not found..');

	if (rental.dateReturned)
		return res.status(400).send('Return already processed..');

	rental.dateReturned = new Date();
	rental.rentalFee =
		moment().diff(rental.dateOut, 'days') * rental.movie.dailyRentalRate;
	await rental.save();

	await Movie.update(
		{ _id: rental.movie._id },
		{
			$inc: { numberInStock: 1 }
		}
	);

	return res.status(200).send(rental);
});

module.exports = router;
