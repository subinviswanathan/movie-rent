const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const customerSchema = mongoose.Schema({
	isGold: {
		type: Boolean,
		required: true,
		default: false,
	},
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 20,
	},
	phone: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 20,
	},
});

const Customer = new mongoose.model('Customer', customerSchema);

const validateCustomer = (value = { isGold: '', name: '', phone: '' }) => {
	let schema = Joi.object({
		name: Joi.string().min(5).max(20).required(),
		phone: Joi.string().min(5).max(20).required(),
	});

	return schema.validate(value);
};

exports.Customer = Customer;
exports.validate = validateCustomer;
