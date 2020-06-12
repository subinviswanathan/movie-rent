const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true,
		minlength: 5,
		maxlength: 60
	},
	email: {
		type: String,
		trim: true,
		required: true,
		minlength: 5,
		maxlength: 255,
		unique: true
	},
	password: {
		type: String,
		trim: true,
		required: true,
		minlength: 5,
		maxlength: 1024
	}
});

const User = new mongoose.model('User', userSchema);

const validateUser = user => {
	let schema = Joi.object({
		name: Joi.string().min(5).max(50).required(),
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255).required()
	});
	return schema.validate(user);
};

exports.User = User;
exports.validate = validateUser;
