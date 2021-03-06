const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const customerSchema = mongoose.Schema({
	isGold: {
		type: Boolean,
		required: true,
		default: false
	},
	name: {
		type: String,
		trim: true,
		required: true,
		minlength: 5,
		maxlength: 20
	},
	phone: {
		type: String,
		trim: true,
		required: true,
		minlength: 5,
		maxlength: 20
	}
});

const Customer = new mongoose.model('Customer', customerSchema);

const validateCustomer = customer => {
	let schema = Joi.object({
		name: Joi.string().min(5).max(20).required(),
		phone: Joi.string().min(5).max(20).required()
	});

	return schema.validate(customer);
};

exports.Customer = Customer;
exports.validate = validateCustomer;
