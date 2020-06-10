const express = require('express');
const Joi = require('@hapi/joi');

const router = express.Router();

let genres = [
	{
		id: 1,
		name: 'horror',
	},
	{
		id: 2,
		name: 'action',
	},
	{
		id: 3,
		name: 'romance',
	},
	{
		id: 4,
		name: 'science',
	},
];

const validateGenre = (value = { name: '' }) => {
	let schema = Joi.object({
		name: Joi.string().min(3).required(),
	});
	return schema.validate(value);
};

router.get('/', (req, res) => {
	res.send(genres);
});

router.get('/:id', (req, res) => {
	const genre = genres.find((genre) => genre.id === +req.params['id']);

	if (!genre) return res.status(404).send('Genre for given id is not present');

	res.send(genre);
});

router.post('/', (req, res) => {
	const { error } = validateGenre(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const genre = {
		id: genres.length + 1,
		name: req.body.name,
	};
	genres.push(genre);
	res.send(genre);
});

router.put('/:id', (req, res) => {
	const { error } = validateGenre(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const genre = genres.find((genre) => genre.id === +req.params['id']);
	if (!genre) return res.status(404).send('Genre for given id is not present');

	genre.name = req.body.name;
	res.send(genre);
});

router.delete('/:id', (req, res) => {
	const genre = genres.find((genre) => genre.id === +req.params['id']);

	if (!genre) return res.status(404).send('Genre for given id is not present');

	const index = genres.indexOf(genre);
	genres.splice(index, 1);
	res.send(genre);
});

module.exports = router;
