const express = require('express');
const Joi = require('@hapi/joi');

const app = express();

app.use(express.json());

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

app.get('/', (req, res) => {
	res.send('Hello World!!! ');
});

app.get('/api/genres', (req, res) => {
	res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
	const genre = genres.find((genre) => genre.id === +req.params['id']);

	if (!genre) return res.status(404).send('Genre for given id is not present');

	res.send(genre);
});

app.post('/api/genres', (req, res) => {
	const { error } = validateGenre(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let genre = {
		id: genres.length + 1,
		name: req.body.name,
	};
	genres.push(genre);
	res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
	const { error } = validateGenre(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const genre = genres.find((genre) => genre.id === +req.params['id']);
	if (!genre) return res.status(404).send('Genre for given id is not present');

	res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
	const genre = genres.find((genre) => genre.id === +req.params['id']);

	if (!genre) return res.status(404).send('Genre for given id is not present');

	const index = genres.indexOf(genre);
	genres.splice(index, 1);
	res.send(genre);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
