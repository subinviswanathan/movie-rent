const express = require('express');
const {Customer, validate} = require('../model/customer');



const router = express.Router();

router.get('/', async (req, res) => {
	const customers = await Customer.find().sort('name');
	res.send(customers);
});

router.get('/:id', (req, res) => {
	const customer = await Customer.findById(req.params.id);
	if (!customer)
		return res.status(404).send('The Given Customer Id cannot be found...');

	res.send(customer);
});

router.post('/', (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let customer = new Customer({
		isGold: req.body.isGold,
		name: req.body.name,
		phone: req.body.phone,
	});
	customer = await customer.save();

	res.send(customer);
});

router.put('/:id', (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const customer = await Customer.findByIdAndUpdate(
		req.params.id,
		{ isGold: req.body.isGold,name: req.body.name, phone: req.body.phone,},
		{ new: true }
	);
	if (!customer)
		return res.status(404).send('The Given Customer Id cannot be found...');

	res.send(customer);
});

router.delete('/:id', (req, res) => {
	const customer = await Customer.findByIdAndRemove(req.params.id);
	if (!customer)
		return res.status(404).send('The Given Customer Id cannot be found...');

	res.send(customer);
});

module.exports = router;
