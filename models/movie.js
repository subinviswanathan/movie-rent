const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { genreSchema } = require('./genre');

const movieSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
		minlength: 5,
		maxlength: 50
	},
	genre: {
		type: genreSchema,
		required: true
	},
	numberInStock: {
		type: Number,
		required: true,
		min: 0,
		max: 200
	},
	dailyRentalRate: {
		type: Number,
		required: true,
		min: 0,
		max: 200
	}
});

const Movie = new mongoose.model('Movie', movieSchema);

const validateMovie = movie => {
	const schema = Joi.object({
		title: Joi.string().min(5).max(50).required(),
		genreId: Joi.objectId().required(),
		numberInStock: Joi.number().min(0).required(),
		dailyRentalRate: Joi.number().min(0).required()
	});

	return schema.validate(movie);
};

exports.Movie = Movie;
exports.validate = validateMovie;