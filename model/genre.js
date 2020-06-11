const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const genreSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 60
	}
});

const Genre = new mongoose.model('Genre', genreSchema);

const validateGenre = (value = { name: '' }) => {
	let schema = Joi.object({
		name: Joi.string().min(3).required()
	});
	return schema.validate(value);
};

exports.Genre = Genre;
exports.validate = validateGenre;
exports.genreSchema = genreSchema;
