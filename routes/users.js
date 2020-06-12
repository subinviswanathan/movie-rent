const express = require('express');
const _ = require('lodash');
const { User, validate } = require('../models/user');

const router = express.Router();

// @todo joi password complexity package for complex passwords.
router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send('User already registered..');

	user = new User(_.pick(req.body, ['name', 'email', 'password']));
	await user.save();

	res.send(_.pick(user, ['email', 'name', '_id']));
});

module.exports = router;
