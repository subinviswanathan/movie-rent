const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const genreSchema = mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true,
		minlength: 5,
		maxlength: 50
	}
});

const Genre = new mongoose.model('Genre', genreSchema);

const validateGenre = genre => {
	let schema = Joi.object({
		name: Joi.string().min(5).max(50).required()
	});
	return schema.validate(genre);
};

exports.Genre = Genre;
exports.validate = validateGenre;
exports.genreSchema = genreSchema;
