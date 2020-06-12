const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const rentalSchema = mongoose.Schema({
	customer: {
		type: new mongoose.Schema({
			name: {
				type: String,
				required: true,
				minlength: 0,
				maxlength: 50
			},
			isGold: {
				type: Boolean,
				default: false
			},
			phone: {
				type: String,
				required: true,
				minlength: 0,
				maxlength: 50
			}
		}),
		required: true
	},
	movie: {
		type: new mongoose.Schema({
			title: {
				type: String,
				trim: true,
				required: true,
				minlength: 0,
				maxlength: 50
			},
			dailyRentalRate: {
				type: Number,
				required: true,
				min: 0,
				max: 200
			}
		}),
		required: true
	},
	dateOut: {
		type: Date,
		required: true,
		default: Date.now
	},
	dateReturned: {
		type: Date
	},
	rentalFee: {
		type: Number,
		min: 0
	}
});

const Rental = new mongoose.model('Rental', rentalSchema);

const validateRental = rental => {
	const schema = Joi.object({
		customerId: Joi.objectId().required(),
		movieId: Joi.objectId().required()
	});

	return schema.validate(rental);
};

exports.Rental = Rental;
exports.validate = validateRental;
