const express = require('express');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt'); // salt is random string added before or after so the resulting hash password is different based on salt used.

const router = express.Router();

// @todo joi password complexity package for complex passwords.
router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send('User already registered..');

	user = new User(_.pick(req.body, ['name', 'email', 'password']));
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
	await user.save();

	res.send(_.pick(user, ['email', 'name', '_id']));
});

module.exports = router;