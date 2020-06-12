const express = require('express');
const mongoose = require('mongoose');
const { Rental, validate } = require('../models/rental');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const Fawn = require('fawn');

const router = express.Router();

Fawn.init(mongoose);

router.get('/', async (req, res) => {
	const rentals = await Rental.find().sort('-dateOut');
	res.send(rentals);
});

router.get('/:id', async (req, res) => {
	const rental = await Rental.findById(req.params.id);

	if (!rental)
		return res.status(404).send('rental for given id is not present');

	res.send(rental);
});

router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const customer = await Customer.findById(req.body.customerId);
	if (!customer) return res.status(400).send('Invalid customer...');

	const movie = await Movie.findById(req.body.movieId);
	if (!movie) return res.status(400).send('Invalid movie...');

	if (movie.numberInStock === 0)
		return res.status(400).send('Movie not stock...');

	let rental = new Rental({
		customer: {
			_id: customer._id,
			name: customer.name,
			phone: customer.phone,
			isGold: customer.isGold
		},
		movie: {
			_id: movie._id,
			title: movie.name,
			dailyRentalRate: movie.dailyRentalRate
		}
	});

	// Transaction or Atomic in 2 phase commit in mongdb. both should occur else both rollback
	// rental = await rental.save();
	// movie.numberInStock--;
	// movie.save();
	try {
		new Fawn.Task()
			.save('rentals', rental)
			.update('movies', { _id: movie._id }, { $inc: { numberInStock: -1 } })
			.run();

		res.send(rental);
	} catch (err) {
		res.status(500).send('Something failed in Server..');
	}
});

router.put('/:id', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const customer = await Customer.findById(req.body.customerId);
	if (!customer) return res.status(400).send('Invalid customer...');

	const movie = await Movie.findById(req.body.movieId);
	if (!movie) return res.status(400).send('Invalid movie...');

	if (movie.numberInStock === 0)
		return res.status(400).send('Movie not stock...');

	const rental = await Rental.findByIdAndUpdate(
		req.params.id,
		{
			customer: {
				_id: customer._id,
				name: customer.name,
				phone: customer.phone
			},
			movie: {
				_id: movie._id,
				title: movie.name,
				dailyRentalRate: movie.dailyRentalRate
			}
		},
		{ new: true }
	);
	if (!rental)
		return res.status(404).send('rental for given id is not present');

	try {
		new Fawn.Task()
			.save('rentals', rental)
			.update('movies', { _id: movie._id }, { $inc: { numberInStock: -1 } })
			.run();

		res.send(rental);
	} catch (err) {
		res.status(500).send('Something failed in Server..');
	}
});

router.delete('/:id', async (req, res) => {
	const rental = await Rental.findByIdAndRemove(req.params.id);

	if (!rental)
		return res.status(404).send('rental for given id is not present');

	res.send(rental);
});

module.exports = router;
